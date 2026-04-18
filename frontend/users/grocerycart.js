
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("groceryCart")) || [];

  let container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.totalPrice;

    container.innerHTML += `
      <div class="cart-card">

        <img src="${item.image}" class="cart-img"/>

        <div class="cart-details">
          <p class="shop-name">${item.shopName || ""}</p>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <button class="remove-btn" onclick="removeFromCart(${index})">
            Remove
          </button>
        </div>

        <div class="cart-actions">
          <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        </div>

      </div>
    `;
  });

  document.getElementById("total-price").innerText = total;
}

// ➕ increase
function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("groceryCart")) || [];

  cart[index].quantity += 1;
  cart[index].totalPrice = cart[index].quantity * cart[index].price;

  localStorage.setItem("groceryCart", JSON.stringify(cart));
  loadCart();
}

// ➖ decrease
function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("groceryCart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    cart[index].totalPrice = cart[index].quantity * cart[index].price;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("groceryCart", JSON.stringify(cart));
  loadCart();
}

// ❌ remove
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("groceryCart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("groceryCart", JSON.stringify(cart));
  loadCart();
}
function goToCheckout(type) {
  localStorage.setItem("checkoutType", type);
  window.location.href = "checkout/checkout.html";
}

loadCart();