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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summary = document.getElementById('order-summary');
    let total = 0;
    summary.innerHTML = '<h4>Order Summary</h4>';
    cart.forEach(item => {
        summary.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
        total += item.price;
    });
    summary.innerHTML += `<p><strong>Total: ₹${total}</strong></p>`;
}

function placeOrder() {
    // Get address and payment
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    
    // Create order object
    const order = {
        name,
        phone,
        address,
        payment,
        items: JSON.parse(localStorage.getItem('cart')) || [],
        total: document.querySelector('#order-summary strong').textContent.replace('Total: ₹', ''),
        date: new Date().toISOString()
    };
    
    // Save order (for demo, just log or store in localStorage)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Alert and redirect
    alert('Order placed successfully!');
    window.location.href = '../food.html'; // Redirect to food page
}