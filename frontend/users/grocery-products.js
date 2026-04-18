
let allProducts = [];

async function loadProducts() {
  let res = await fetch("http://localhost:3000/vendors");
  let vendors = await res.json();

  let products = [];

  vendors.forEach(vendor => {
    vendor.products.forEach(p => {
      if (p.type === "grocery") {
        products.push({
          ...p,
          shopName: vendor.shopName
        });
      }
    });
  });

  allProducts = products;
  allProducts = products;

let selectedCategory = localStorage.getItem("selectedCategory");

if (selectedCategory) {
  let filtered = allProducts.filter(p =>
    p.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  showProducts(filtered);
} else {
  showProducts(allProducts);
}
}

function showProducts(products) {
  let container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" class="product-img"/>

        <div class="details">
          <h3>${p.shopName}</h3>
          <p>${p.name}</p>
          <p class="price">₹${p.price_per_unit}</p>

          <select>
            <option value="1">1 kg</option>
            <option value="2">2 kg</option>
            <option value="3">3 kg</option>
          </select>

          <button onclick="addToCart('${p.id}', '${p.name}', ${p.price_per_unit},'${p.image}','${p.shopName}',this)">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

function addToCart(id, name, price, image, shopName, btn) {
  //console.log("BTN",btn);


  let card = btn.closest(".card");
  let quantity = parseInt(card.querySelector("select").value);
  let totalPrice = quantity * price;

  let cart = JSON.parse(localStorage.getItem("groceryCart")) || [];

  console.log("Current cart:", cart);
  console.log("New shop:", shopName);

  // 🔥 CHECK
  if (cart.length > 0 && cart[0].shopName !== shopName) {

    alert("Different shop detected ❌");

    let confirmClear = confirm("Cart clear karna hai?");

    if (!confirmClear) return;

    cart = [];
  }

  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += quantity;
    existing.totalPrice += totalPrice;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      shopName,
      quantity,
      totalPrice
    });
  }

  localStorage.setItem("groceryCart", JSON.stringify(cart));

  alert("Added ✅");
}
loadProducts();