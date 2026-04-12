async function loadProducts() {

  let category = localStorage.getItem("selectedCategory");

  let res = await fetch("http://localhost:3000/vendors");
  let vendors = await res.json();
  console.log("vendors",vendors);
  console.log("category",category);
  let container = document.getElementById("productList");
  container.innerHTML = "";

  vendors.forEach(vendor => {

    (vendor.products || []).forEach(p => {

      if (p.category === category) {

        let priceHTML = "";

        // ✅ Variant product
        if (p.variants) {

          let defaultPrice = p.variants[0].price;

          priceHTML = `
            <select onchange="changePrice(this)">
              ${p.variants.map(v => `
                <option value="${v.price}">
                  ${v.type} - ₹${v.price}
                </option>
              `).join("")}
            </select>

            <p class="price">₹${defaultPrice}</p>
          `;
        } 
        
        // ✅ Simple product
        else {
          priceHTML = `<p class="price">₹${p.price_per_unit}</p>`;
        }

        container.innerHTML += `
           <div class="card">

              <div class="card-body">

                  <!-- LEFT IMAGE -->
                  <img src="${p.image}" class="product-img">

                 <!-- RIGHT CONTENT -->
                 <div class="info">

                    <p class="shop">${vendor.shopName}</p>

                    <h3>${p.name}</h3>

                     ${priceHTML}

                    <button onclick='addToCart({
                     name: "${p.name}",
                     price: ${p.variants ? p.variants[0].price : p.price_per_unit},
                     image: "${p.image}",
                     vendorId: "${vendor.id}"   // 🔥 FIX YAHI HAI
                      })'>
                       Add to Cart
                    </button>
                </div>

            </div>

        </div>
        `;
      }
    });

  });
}
// 🔥 Price change
function changePrice(select) {
  let price = select.value;
  let priceText = select.parentElement.querySelector(".price");
  priceText.innerText = "₹" + price;
}
function addToCart(product) {
  console.log(product);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🔥 SAME PRODUCT + SAME VENDOR check
  let existing = cart.find(item => 
    item.name === product.name && item.vendorId === product.vendorId
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      vendorId: product.vendorId // ✅ already correct
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
}
loadProducts();