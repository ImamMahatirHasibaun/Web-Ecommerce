document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navbarNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // animasi X
        });
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
                menuToggle.classList.remove('active'); // reset animasi X
            }
        });
    }
});