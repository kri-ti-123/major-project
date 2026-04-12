function loadCart() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');

  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 😢</p>";
    totalPrice.textContent = 0;
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">

      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
       

        <button onclick="removeFromCart(${index})">Remove</button>
        <div class="qty-box">
            <button onclick="decreaseQty(${index})">-</button>
             <span>${item.quantity}</span>
            <button onclick="increaseQty(${index})">+</button>
            
        </div>

      </div>
    `;

    cartItems.appendChild(itemDiv);

    total += item.price * item.quantity;
  });

  totalPrice.textContent = total;
}
function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity += 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove if 0
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

loadCart();