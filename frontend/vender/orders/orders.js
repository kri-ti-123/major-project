// Page load hone par orders load karo
document.addEventListener("DOMContentLoaded", loadOrders);

async function loadOrders() {

    const res = await fetch("http://localhost:3000/orders");
    const orders = await res.json();

    const container = document.querySelector(".card");

    // purane hatao
    document.querySelectorAll(".order-card").forEach(el => el.remove());

    if (orders.length === 0) {
        container.innerHTML += "<p>No orders found</p>";
        return;
    }

    orders.forEach(order => {
        container.innerHTML += createOrderCard(order);
    });
}
// Order card banane ka function
function createOrderCard(order) {

    let time = new Date(order.date).toLocaleString();

    return `
    <div class="order-card">

        <div class="order-top">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2">

            <div>
                <strong>#${order.id} - ${order.name}</strong><br>
                📞 ${order.phone}<br>
                🕒 ${time}
            </div>

           <div class="status-badge">${order.status.toUpperCase()}</div>
        </div>

        <div class="order-details">
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Payment:</strong> ${order.payment}</p>
        </div>

        <div class="order-items">
            ${order.items.map(i => `
              <p>${i.name} (${i.quantity}) - ₹${i.price}</p>
            `).join("")}
        </div>

        <div class="order-total">
            <strong>Total: ₹${order.total}</strong>
        </div>

        <button class="btn" onclick="updateStatus('${order.id}','accepted')">Accept</button>
        <button class="btn" onclick="updateStatus('${order.id}','rejected')">Reject</button>
        <button class="btn" onclick="updateStatus('${order.id}','preparing')">Preparing</button>
        <button class="btn" onclick="updateStatus('${order.id}','out for delivery')">OFD</button>
        <button class="btn" onclick="updateStatus('${order.id}','delivered')">Delivered</button>
        ${order.status === "user_received" 
            ? `<button class="btn" onclick="updateStatus('${order.id}','delivered')">Delivered</button>`
              : ""
       }

    </div>
    `;
}
// Status update function
async function updateStatus(orderId, newStatus) {

    const res = await fetch(`http://localhost:3000/orders/${orderId}`);
    const order = await res.json();

    order.status = newStatus;

    await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    loadOrders();
}
let allOrders = [];

async function loadOrders() {
    const res = await fetch("http://localhost:3000/orders");
    allOrders = await res.json();

    displayOrders(allOrders);
}

function displayOrders(orders) {
    const container = document.querySelector(".card");

    document.querySelectorAll(".order-card").forEach(el => el.remove());

    if (orders.length === 0) {
        container.innerHTML += "<p>No orders found</p>";
        return;
    }

    orders.forEach(order => {
        container.innerHTML += createOrderCard(order);
    });
}
function filterOrders(status) {

    if (status === "all") {
        displayOrders(allOrders);
        return;
    }

    const filtered = allOrders.filter(o => o.status === status);

    displayOrders(filtered);
}