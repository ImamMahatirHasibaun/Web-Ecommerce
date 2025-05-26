document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');

    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navbarNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

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
        if (!cartCount) return;
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
    }

    // Function to show notification
    function showNotification() {
        const notification = document.getElementById('cart-notification');
        if (!notification) return;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // Product Detail Page Specific Script
    // Get product details from localStorage
    const productDetails = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productDetails) {
        // Populate the product details
        document.getElementById('product-main-image').src = productDetails.image;
        document.getElementById('product-detail-title').textContent = productDetails.title;
        document.getElementById('product-detail-price').textContent = productDetails.price;
        document.getElementById('product-detail-description').textContent = productDetails.description;

        // Set the page title
        document.title = productDetails.title + " - Christian Wijaya";
    } else {
        // Redirect back to products page if no product is selected
        window.location.href = 'ProductPage.html';
    }

    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });

    // Quantity selector
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const quantityInput = document.querySelector('.quantity-input');

    minusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Add to cart button
    const addToCartButton = document.querySelector('.add-to-cart-detail');
    addToCartButton.addEventListener('click', function() {
        // Get selected size
        const selectedSize = document.querySelector('.size-option.selected');
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const size = selectedSize.getAttribute('data-size');
        const quantity = parseInt(quantityInput.value);

        // Create a unique ID for the product with size
        const productWithSizeId = productDetails.id + '-' + size;

        // Check if product already in cart
        const existingItemIndex = cart.findIndex(item => item.id === productWithSizeId);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: productWithSizeId,
                name: productDetails.title,
                price: parseFloat(productDetails.price.replace(/[^\d]/g, '')),
                image: productDetails.image,
                size: size,
                quantity: quantity
            });
        }

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        updateCartCount();

        // Show notification
        showNotification();
    });

    // Buy now button
    const buyNowButton = document.querySelector('.buy-now-detail');
    buyNowButton.addEventListener('click', function() {
        // Get selected size
        const selectedSize = document.querySelector('.size-option.selected');
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const size = selectedSize.getAttribute('data-size');
        const quantity = parseInt(quantityInput.value);

        // Create a temporary order object
        const order = {
            product: productDetails,
            size: size,
            quantity: quantity
        };

        // Save the order to localStorage
        localStorage.setItem('currentOrder', JSON.stringify(order));

        // Redirect to checkout page (you would need to create this)
        window.location.href = 'Checkout.html';
    });
});