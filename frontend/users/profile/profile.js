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
async function loadMyOrders() {

    // 🔥 current user lo
    let user = JSON.parse(localStorage.getItem("userSession"));

    if (!user) {
        alert("Please login first");
        return;
    }

    // 🔥 DB se orders lo
    const res = await fetch("http://localhost:3000/orders");
    const orders = await res.json();

    // 🔥 sirf current user ke orders filter karo
    let myOrders = orders.filter(o => o.userId == user.id);

    const container = document.getElementById("my-orders");

    container.innerHTML = "";

    if (myOrders.length === 0) {
        container.innerHTML = "<p>No orders yet</p>";
        return;
    }

    // 🔥 display
    myOrders.forEach(order => {

        container.innerHTML += `
        <div class="order-box">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p>Date: ${new Date(order.date).toLocaleString()}</p>
            <p>Items: ${order.items.map(i => `${i.name} (${i.quantity})`).join(", ")}</p>
            <p>Total: ₹${order.total}</p>
            <p>Status: ${order.status}</p>

            ${getUserButtons(order)}
        </div>
        `;
    });
}
function getUserButtons(order) {

    // Cancel button (sirf pending pe)
    if (order.status === "pending") {
        return `<button onclick="cancelOrder('${order.id}')">Cancel</button>`;
    }

    // Received button (sirf OFD pe)
    if (order.status === "out for delivery") {
        return `<button onclick="markReceived('${order.id}')">Received</button>`;
    }

    return "";
}
async function cancelOrder(orderId) {

    const res = await fetch(`http://localhost:3000/orders/${orderId}`);
    const order = await res.json();

    order.status = "cancelled";

    await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });

    alert("Order cancelled ❌");

    loadMyOrders();
}
async function markReceived(orderId) {

    const res = await fetch(`http://localhost:3000/orders/${orderId}`);
    const order = await res.json();

    order.status = "user_received";

    await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });

    alert("Order received ✅");

    loadMyOrders();
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
document.addEventListener("DOMContentLoaded", loadMyOrders);