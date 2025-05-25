
        // JavaScript untuk toggle menu di mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const navbarNav = document.querySelector('.navbar-nav');
        
        menuToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
        });
        
        // Menutup menu saat mengklik di luar menu
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
            }
        });
