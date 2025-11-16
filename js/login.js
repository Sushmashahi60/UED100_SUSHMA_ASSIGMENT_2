 document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('loginForm');
      const formTitle = document.querySelector('h1');
      const formSubtitle = document.querySelector('p.text-gray-600');
      const submitButton = document.querySelector('button[type="submit"]');
      const bottomText = document.querySelector('.mt-6.md\\:mt-8 p');
      const rememberMeContainer = document.querySelector('.flex.items-center.justify-between');

      // Form states
      const formStates = {
        login: {
          title: 'Welcome Back',
          subtitle: 'Sign in to your CommBank account',
          submitText: 'Sign In',
          bottomText: 'Don\'t have an account? <a href="#" class="active-link hover:text-yellow-700 font-medium" data-form="register">Create account</a>',
          showRememberMe: true,
          fields: ['email', 'password']
        },
        register: {
          title: 'Create Account',
          subtitle: 'Join CommBank today',
          submitText: 'Create Account',
          bottomText: 'Already have an account? <a href="#" class="active-link hover:text-yellow-700 font-medium" data-form="login">Sign in</a>',
          showRememberMe: false,
          fields: ['fullName', 'email', 'password', 'confirmPassword']
        },
        forgot: {
          title: 'Reset Password',
          subtitle: 'Enter your email to reset your password',
          submitText: 'Send Reset Link',
          bottomText: 'Remember your password? <a href="#" class="active-link hover:text-yellow-700 font-medium" data-form="login">Sign in</a>',
          showRememberMe: false,
          fields: ['email']
        }
      };

      let currentForm = 'login';

      // Create all form fields
      function createFormFields() {
        const formContainer = loginForm;
        formContainer.innerHTML = '';

        const state = formStates[currentForm];
        
        // Create fields based on current form
        state.fields.forEach(fieldType => {
          const fieldDiv = document.createElement('div');
          
          if (fieldType === 'fullName') {
            fieldDiv.innerHTML = `
              <label for="fullName" class="block text-sm md:text-base font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" id="fullName" name="fullName" required
                class="w-full border border-gray-300 rounded-md px-4 py-3 md:px-5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your full name">
            `;
          } else if (fieldType === 'email') {
            fieldDiv.innerHTML = `
              <label for="email" class="block text-sm md:text-base font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" id="email" name="email" required
                class="w-full border border-gray-300 rounded-md px-4 py-3 md:px-5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your email">
            `;
          } else if (fieldType === 'password') {
            fieldDiv.innerHTML = `
              <label for="password" class="block text-sm md:text-base font-medium text-gray-700 mb-2">Password</label>
              <input type="password" id="password" name="password" required
                class="w-full border border-gray-300 rounded-md px-4 py-3 md:px-5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your password">
            `;
          } else if (fieldType === 'confirmPassword') {
            fieldDiv.innerHTML = `
              <label for="confirmPassword" class="block text-sm md:text-base font-medium text-gray-700 mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required
                class="w-full border border-gray-300 rounded-md px-4 py-3 md:px-5 md:py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Confirm your password">
            `;
          }
          
          fieldDiv.classList.add('mb-6', 'md:mb-8');
          formContainer.appendChild(fieldDiv);
        });

        // Remember me button for login form
        if (state.showRememberMe) {
          const rememberDiv = document.createElement('div');
          rememberDiv.classList.add('flex', 'items-center', 'justify-between', 'mb-6', 'md:mb-8');
          rememberDiv.innerHTML = `
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 active-link focus:ring-yellow-500">
              <span class="ml-2 text-sm md:text-base text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm md:text-base active-link hover:text-yellow-700" data-form="forgot">Forgot password?</a>
          `;
          formContainer.appendChild(rememberDiv);
        }

        // Submit button adder
        const submitDiv = document.createElement('div');
        submitDiv.innerHTML = `
          <button type="submit" 
            class="w-full bg-black text-white py-3 md:py-4 text-base md:text-lg rounded-md hover:opacity-90 transition duration-200">
            ${state.submitText}
          </button>
        `;
        formContainer.appendChild(submitDiv);
      }

      // Form updating
      function updateForm(newForm) {
        currentForm = newForm;
        const state = formStates[currentForm];
        
        // Updating title and subtitle
        formTitle.textContent = state.title;
        formSubtitle.textContent = state.subtitle;
        
        // Updating bottom text
        bottomText.innerHTML = state.bottomText;
        
        // Recreating form fields
        createFormFields();
        
        // Adding event listeners to new links
        addFormSwitchListeners();
      }

      // Adding event listeners for form switching
      function addFormSwitchListeners() {
        document.querySelectorAll('[data-form]').forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-form');
            updateForm(targetForm);
          });
        });
      }

      // Form submission handler
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (currentForm === 'register') {
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          
          if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
          }
        }
        
        // Form submission example
        const formData = new FormData(this);
        console.log(`${currentForm} form submitted:`, Object.fromEntries(formData));
        alert(`${currentForm.charAt(0).toUpperCase() + currentForm.slice(1)} form submitted successfully!`);
      });

      // Init form
      createFormFields();
      addFormSwitchListeners();
    });