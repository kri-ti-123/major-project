function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.offer}</p>
                <p>Price: ₹${item.price}</p>
                <p>Rating: ${item.rating}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
        // Assume price from offer, simple parse
        total +=Number( item.price);
       
    });
    
    totalPrice.textContent = total;
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

loadCart();