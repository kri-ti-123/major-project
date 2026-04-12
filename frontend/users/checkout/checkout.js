document.addEventListener('DOMContentLoaded', function() {
    showStep('address-step');
    loadOrderSummary();
});

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
    document.getElementById(stepId).style.display = 'block';
}

function nextStep(nextStepId) {
    // Validate current step
    if (nextStepId === 'payment-step') {
        const form = document.getElementById('address-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    }
    showStep(nextStepId);
}

function prevStep(prevStepId) {
    showStep(prevStepId);
}

function loadOrderSummary() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let summary = document.getElementById("order-summary");

  let total = 0; // 🔥 important

  summary.innerHTML = '<h4>Order Summary</h4>';

  cart.forEach(item => {

    let itemTotal = item.price * item.quantity;

    total += itemTotal; // 🔥 YE MISSING HAI

    summary.innerHTML += `
      <div class="summary-item">
        <span class="item-name">${item.name}</span>
        <span class="item-middle">₹${item.price} x ${item.quantity}</span>
        <span class="item-total">₹${itemTotal}</span>
      </div>
    `;
  });

  summary.innerHTML += `
    <hr>
    <div class="summary-total">
      <span>Total</span>
      <span>₹${total}</span>
    </div>
  `;
}
async function placeOrder() {

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let user = JSON.parse(localStorage.getItem("userSession"));

    if (cart.length === 0) {
        alert("Cart empty");
        return;
    }

    const order = {
        id: Date.now().toString(),
        userId: user.id,
        vendorId: cart[0].vendorId,   // 🔥🔥 MOST IMPORTANT LINE
        name,
        phone,
        address,
        payment,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: "pending",
        date: new Date().toISOString()
    };

    console.log("ORDER:", order); // 🔥 check

    // ✅ DB me save
    await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    localStorage.removeItem("cart");

    // ✅ SUCCESS UI
    document.body.innerHTML = `
      <div class="success-box">
        <h2>🎉 Order Placed!</h2>
        <p>Your order has been placed successfully</p>
        <button onclick="window.location.href='../food.html'">Go Home</button>
      </div>
    `;
}
function nextStep(nextStepId) {

  if (nextStepId === 'confirm-step') {

    document.getElementById("c-name").innerText = document.getElementById("name").value;
    document.getElementById("c-phone").innerText = document.getElementById("phone").value;
    document.getElementById("c-address").innerText = document.getElementById("address").value;
    document.getElementById("c-payment").innerText =
      document.querySelector('input[name="payment"]:checked').value;
  }

  showStep(nextStepId);
}