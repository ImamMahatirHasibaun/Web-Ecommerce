document.addEventListener('DOMContentLoaded', function() {
    // ===== SLIDER GAMBAR =====
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (slides.length > 0) {
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // ===== MENU TOGGLE UNTUK TAMPILAN MOBILE =====
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

    // ===== FUNGSI PENCARIAN =====
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container a');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function(e) {
            if (!searchInput.value.trim()) {
                e.preventDefault();
                alert('Silakan masukkan kata kunci pencarian');
            }
        });
    }

    // ===== ANIMASI SCROLL =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .aturgambarslogan');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});