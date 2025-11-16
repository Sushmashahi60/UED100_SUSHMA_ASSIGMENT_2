        document.getElementById("menuBtn").addEventListener("click", () => {
            document.getElementById("mobileMenu").classList.toggle("hidden");
        });

        document.getElementById("year").textContent = new Date().getFullYear();
