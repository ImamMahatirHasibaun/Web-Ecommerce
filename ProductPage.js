document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
            }
        });
    }

    // Product cards (declare ONCE here)
    const productCards = document.querySelectorAll('.product-card');

    // Product filtering functionality
    const filterButtons = document.querySelectorAll('.bar-filterproduct a');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterCategory = this.getAttribute('data-category');
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterCategory === 'All' || filterCategory === cardCategory) {
                    card.classList.remove('filtered-out');
                    card.classList.add('filtered-in');
                    card.style.display = "";
                } else {
                    card.classList.remove('filtered-in');
                    card.classList.add('filtered-out');
                    card.style.display = "none";
                }
            });
            const productsSection = document.querySelector('.product-grid');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification();
        });
    });

    // Cart icon click - navigate to cart page
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'CartPage.html';
        });
    }

    // Function to update cart count
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) cartCount.textContent = itemCount;
    }

    // Function to show notification
    function showNotification() {
        const notification = document.getElementById('cart-notification');
        if (notification) {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    }

    // Buy button functionality
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('img').src;
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            const productId = productCard.querySelector('.add-to-cart').getAttribute('data-id');
            const productDetails = {
                id: productId,
                image: productImage,
                title: productTitle,
                price: productPrice,
                description: productDescription
            };
            localStorage.setItem('selectedProduct', JSON.stringify(productDetails));
            window.location.href = 'ProductDetailPage.html';
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    if (searchInput && searchBtn) {
        function searchProducts() {
            const query = searchInput.value.trim().toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                if (title.includes(query) || query === "") {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        }
        searchBtn.addEventListener('click', searchProducts);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === "Enter") {
                searchProducts();
            }
        });
    }
});