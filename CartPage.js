document.addEventListener('DOMContentLoaded', function() {
    // Ambil data keranjang dari localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Fungsi untuk menampilkan item di keranjang
    function displayCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSummaryContainer = document.querySelector('.cart-summary');
        
        // Jika keranjang kosong
        if (cart.length === 0) {
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = '<div class="cart-empty">Keranjang belanja Anda kosong.</div>';
            }
            if (cartSummaryContainer) {
                cartSummaryContainer.style.display = 'none';
            }
            return;
        }
        
        // Tampilkan ringkasan keranjang jika ada item
        if (cartSummaryContainer) {
            cartSummaryContainer.style.display = 'block';
        }
        
        // Buat HTML untuk setiap item di keranjang
        let cartItemsHTML = '';
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            // Format harga dalam Rupiah
            const formattedPrice = formatRupiah(item.price);
            const formattedTotal = formatRupiah(itemTotal);
            
            cartItemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">${formattedPrice}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            `;
        });
        
        // Tampilkan item di keranjang
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cartItemsHTML;
        }
        
        // Update ringkasan keranjang
        updateCartSummary(subtotal);
        
        // Tambahkan event listener untuk tombol quantity dan remove
        addCartItemEventListeners();
    }
    
    // Fungsi untuk memperbarui ringkasan keranjang
    function updateCartSummary(subtotal) {
        const cartSummaryContainer = document.querySelector('.cart-summary');
        if (!cartSummaryContainer) return;
        
        // Hitung pajak (10% dari subtotal)
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        // Buat HTML untuk ringkasan keranjang
        const summaryHTML = `
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>${formatRupiah(subtotal)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Pajak (10%):</span>
                <span>${formatRupiah(tax)}</span>
            </div>
            <div class="cart-summary-row cart-total">
                <span>Total:</span>
                <span>${formatRupiah(total)}</span>
            </div>
            <button class="checkout-btn">Checkout</button>
            <a href="ProductPage.html" class="continue-shopping">Lanjutkan Belanja</a>
        `;
        
        cartSummaryContainer.innerHTML = summaryHTML;
        
        // Tambahkan event listener untuk tombol checkout
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                checkout();
            });
        }
    }
    
    // Fungsi untuk menambahkan event listener ke tombol di keranjang
    function addCartItemEventListeners() {
        // Tombol kurangi quantity
        const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, -1);
            });
        });
        
        // Tombol tambah quantity
        const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, 1);
            });
        });
        
        // Input quantity
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const newQuantity = parseInt(this.value);
                
                if (newQuantity < 1) {
                    this.value = 1;
                    cart[index].quantity = 1;
                } else {
                    cart[index].quantity = newQuantity;
                }
                
                // Simpan perubahan ke localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Perbarui tampilan keranjang
                displayCartItems();
                updateCartCount();
            });
        });
        
        // Tombol hapus item
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeItem(index);
            });
        });
    }
    
    // Fungsi untuk memperbarui quantity item
    function updateQuantity(index, change) {
        cart[index].quantity += change;
        
        // Hapus item jika quantity 0 atau kurang
        if (cart[index].quantity <= 0) {
            removeItem(index);
            return;
        }
        
        // Simpan perubahan ke localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Perbarui tampilan keranjang
        displayCartItems();
        updateCartCount();
        
        // Tampilkan notifikasi
        showNotification('Jumlah item diperbarui');
    }
    
    // Fungsi untuk menghapus item dari keranjang
    function removeItem(index) {
        // Hapus item dari array
        cart.splice(index, 1);
        
        // Simpan perubahan ke localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Perbarui tampilan keranjang
        displayCartItems();
        updateCartCount();
        
        // Tampilkan notifikasi
        showNotification('Item dihapus dari keranjang');
    }
    
    // Fungsi untuk checkout
    function checkout() {
        if (cart.length === 0) {
            alert('Keranjang belanja Anda kosong.');
            return;
        }
        
        // Di sini Anda bisa menambahkan logika untuk proses checkout
        alert('Terima kasih atas pesanan Anda!');
        
        // Kosongkan keranjang setelah checkout
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Perbarui tampilan
        displayCartItems();
        updateCartCount();
    }
    
    // Fungsi untuk memperbarui jumlah item di ikon keranjang
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = itemCount;
        }
    }
    
    // Fungsi untuk format harga dalam Rupiah
    function formatRupiah(amount) {
        return 'Rp ' + amount.toLocaleString('id-ID');
    }
    
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        // Cek apakah sudah ada notifikasi
        let notification = document.querySelector('.cart-notification');
        
        if (!notification) {
            // Buat elemen notifikasi baru
            notification = document.createElement('div');
            notification.className = 'cart-notification';
            document.body.appendChild(notification);
        }
        
        // Set pesan dan tampilkan notifikasi
        notification.textContent = message;
        notification.classList.add('show');
        
        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Menu toggle untuk tampilan mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
        });
    }
    
    // Search in cart functionality
    const cartSearchInput = document.getElementById('cart-search-input');
    const cartSearchBtn = document.getElementById('cart-search-btn');
    const cartItemsContainer = document.querySelector('.cart-items');

    function searchCartItems() {
        const query = cartSearchInput.value.trim().toLowerCase();
        const cartItemCards = cartItemsContainer.querySelectorAll('.cart-item');
        cartItemCards.forEach(card => {
            // Ganti .cart-item-title menjadi .cart-item-name
            const title = card.querySelector('.cart-item-name').textContent.toLowerCase();
            if (title.includes(query) || query === "") {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (cartSearchInput && cartSearchBtn) {
        cartSearchBtn.addEventListener('click', searchCartItems);
        cartSearchInput.addEventListener('keyup', function(e) {
            if (e.key === "Enter") {
                searchCartItems();
            }
        });
    }

    // Inisialisasi tampilan keranjang
    displayCartItems();
    updateCartCount();
});