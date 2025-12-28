let cart = [];

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('translate-x-full');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    if(document.getElementById('cart-sidebar').classList.contains('translate-x-full')) {
        toggleCart();
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-400 text-center py-10">Your cart is empty.</p>';
        cartTotal.innerText = '$0';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div>
                <p class="font-medium text-sm">${item.name}</p>
                <p class="text-indigo-600 font-bold">$${item.price}</p>
            </div>
            <button onclick="removeItem(${index})" class="text-red-400 hover:text-red-600"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.innerText = `$${total}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Search functionality
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const category = product.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(query) || category.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Mobile search toggle
document.getElementById('search-btn').addEventListener('click', function() {
    const input = document.getElementById('search-input');
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
        input.focus();
    } else {
        input.classList.add('hidden');
    }
});

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        alert('Thank you for subscribing! We\'ll keep you updated with our latest collections.');
        document.getElementById('newsletter-email').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.remove('opacity-0');
        backToTop.classList.add('opacity-100');
    } else {
        backToTop.classList.remove('opacity-100');
        backToTop.classList.add('opacity-0');
    }
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});