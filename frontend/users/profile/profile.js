document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadOrders();
    updateCartCount();
});

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
    document.getElementById('name').value = profile.name || '';
    document.getElementById('email').value = profile.email || '';
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('address').value = profile.address || '';
}

function saveProfile() {
    const profile = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('orders-list');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="color: #999; font-style: italic;">No orders yet</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map((order, index) => `
        <div class="order-item">
            <p><strong>Order #${index + 1}</strong></p>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Items:</strong> ${order.items.map(item => item.name).join(', ')}</p>
            <p><strong>Total:</strong> ₹${order.total}</p>
            <p><strong>Status:</strong> Delivered</p>
        </div>
    `).join('');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userSession');
        localStorage.removeItem('cart');
        window.location.href = '../index.html';
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const smallCircle = document.querySelector('.small-circle');
    if (smallCircle) {
        smallCircle.textContent = cart.length;
    }
}