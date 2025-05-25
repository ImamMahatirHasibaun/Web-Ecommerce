document.addEventListener('DOMContentLoaded', function() {
    // ===== SLIDER GAMBAR =====
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Fungsi untuk menampilkan slide tertentu
    function showSlide(index) {
        // Sembunyikan semua slide dengan menghapus kelas active
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Tampilkan slide yang dipilih dengan menambahkan kelas active
        slides[index].classList.add('active');
    }
    
    // Event listener untuk tombol next
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }
    
    // Event listener untuk tombol previous
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        });
    }
    
    // Auto slide setiap 5 detik jika ada slides
    if (slides.length > 0) {
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // ===== MENU TOGGLE UNTUK TAMPILAN MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
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
            // Jika ada nilai, form akan melakukan submit secara normal
        });
    }
    
    // ===== ANIMASI SCROLL =====
    // Menambahkan animasi saat scroll ke elemen tertentu
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
    
    // Jalankan animasi saat halaman di-scroll
    window.addEventListener('scroll', animateOnScroll);
    // Jalankan sekali saat halaman dimuat
    animateOnScroll();
});