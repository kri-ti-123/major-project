// ✅ SESSION CHECK
let vendorSession = JSON.parse(localStorage.getItem("vendorSession"));

if (!vendorSession) {
  alert("Please login again");
  window.location.href = "../../vendor-auth.html";
}

// ✅ FIX ID

let vendorId = vendorSession.id;
// let vendorId = 1; // 🔥 abhi fixed rakho (baad me dynamic karenge)
function handleCategoryChange() {
  let category = document.getElementById("category").value;
  let box = document.getElementById("variantBox");

  box.innerHTML = "";

  if (category === "sabji" || category === "chowmin") {
    box.innerHTML = `
      <input type="number" id="halfPrice" placeholder="Half Price">
      <input type="number" id="fullPrice" placeholder="Full Price">
    `;
  }

  else if (category === "pizza") {
    box.innerHTML = `
      <input type="number" id="smallPrice" placeholder="Small Price">
      <input type="number" id="mediumPrice" placeholder="Medium Price">
      <input type="number" id="largePrice" placeholder="Large Price">
    `;
  }

  else if (category === "sweets") {
    box.innerHTML = `
      <input type="number" id="price250" placeholder="250g Price">
      <input type="number" id="price500" placeholder="500g Price">
      <input type="number" id="price1kg" placeholder="1kg Price">
    `;
  }
   else if (category === "pasta") {
  box.innerHTML = `
    <input type="number" id="halfPrice" placeholder="Half Price">
    <input type="number" id="fullPrice" placeholder="Full Price">
  `;
  } 
    else if (category === "biryani") {
  box.innerHTML = `
    <input type="number" id="halfPrice" placeholder="Half Price">
    <input type="number" id="fullPrice" placeholder="Full Price">
  `;
  } 
   else if (category === "chowmin") {
  box.innerHTML = `
    <input type="number" id="halfPrice" placeholder="Half Price">
    <input type="number" id="fullPrice" placeholder="Full Price">
  `;
  } 
  else if (category=== "vegetable"){
     box.innerHTML = `
     <input type="number" id="onefourthkg" placeholder="250g">
     <input type="number" id="halfkg" placeholder="500g">
     <input type="number" id="onekg" placeholder="1kg">
     <input type="number" id="twokg" placeholder="2kg">
     <input type="number" id="fivekg" placeholder="5kg">
  `;

  }
  else if (category=== "fruit"){
     box.innerHTML = `
     <input type="number" id="onefourthkg" placeholder="250g">
     <input type="number" id="halfkg" placeholder="500g">
     <input type="number" id="onekg" placeholder="1kg">
     <input type="number" id="twokg" placeholder="2kg">
     
  `;
  }
  else if (category=== "flour"){
     box.innerHTML = `
     <input type="number" id="halfkg" placeholder="500g">
     <input type="number" id="onekg" placeholder="1kg">
     <input type="number" id="twokg" placeholder="2kg">
     <input type="number" id="fivekg" placeholder="5kg">
     <input type="number" id="tenkg" placeholder="10kg">
     
  `;
  }
  else {
    box.innerHTML = "";
  }
}

// ✅ ADD PRODUCT
async function addProduct() {

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;
  let type = document.getElementById("type").value; 

  if (!name || !price) {
    alert("Fill all fields");
    return;
  }

  let res = await fetch(`http://localhost:3000/vendors/${vendorId}`);
  let vendor = await res.json();

  let category = document.getElementById("category").value;
  

let newProduct;

if (category === "sabji") {
  newProduct = {
    id: Date.now(),
    vendorId: vendorSession.id,
    name: name,
     image: image,
     type:type,
    category: category,
    variants: [
      {
        type: "Half",
        price: Number(document.getElementById("halfPrice").value)
      },
      {
        type: "Full",
        price: Number(document.getElementById("fullPrice").value)
      }
    ],
    available: true
  };
}

else if (category === "pizza") {
  newProduct = {
    id: Date.now(),
    vendorId: vendorSession.id,
    name: name,
     image: image,
     type:type,
    category: category,
    variants: [
      {
        type: "Small",
        price: Number(document.getElementById("smallPrice").value)
      },
      {
        type: "Medium",
        price: Number(document.getElementById("mediumPrice").value)
      },
      {
        type: "Large",
        price: Number(document.getElementById("largePrice").value)
      }
    ],
    available: true
  };
}
else if (category === "sweets") {
  newProduct = {
    id: Date.now(),
    vendorId: vendorSession.id,
    name: name,
    type:type,
    category: category,
    image: image,
    variants: [
      {
        type: "250g",
        price: Number(document.getElementById("price250").value)
      },
      {
        type: "500g",
        price: Number(document.getElementById("price500").value)
      },
      {
        type: "1kg",
        price: Number(document.getElementById("price1kg").value)
      }
    ],
    available: true
  };
}
else if (category === "pasta") {
  newProduct = {
    id: Date.now(),
    vendorId: vendorSession.id,
    name: name,
    category: category,
    type:type,
    image: image,
    variants: [
      {
        type: "Half",
        price: Number(document.getElementById("halfPrice").value)
      },
      {
        type: "Full",
        price: Number(document.getElementById("fullPrice").value)
      }
    ],
    available: true
  };
}
else if (category === "biryani") {
  newProduct = {
    id: Date.now(),
    name: name,
    category: category,
    vendorId: vendorSession.id,
    type:type,
    image: image,
    variants: [
      {
        type: "Half",
        price: Number(document.getElementById("halfPrice").value)
      },
      {
        type: "Full",
        price: Number(document.getElementById("fullPrice").value)
      }
    ],
    available: true
  };
}
else if (category === "fruit") {
  newProduct = {
    id: Date.now(),
    name: name,
    category: category,
    vendorId: vendorSession.id,
    type:type,
    image: image,
    variants: [
       {
        type: "halfkg",
        price: Number(document.getElementById("halfkgprice").value)
      },
      {
        type: "onekg",
        price: Number(document.getElementById("onekgprice").value)
      },
      {
        type: "twokg",
        price: Number(document.getElementById("twokgprice").value)
      }
    ],
    available: true
  };
}
else {
  newProduct = {
    id: Date.now(),
    vendorId: vendorSession.id,
    name: name,
     image: image,
    category: category,
    type:type,
    price_per_unit: Number(price),
    available: true
  };
}

// ✅ FINAL PUSH (IMPORTANT)
vendor.products.push(newProduct);

  await fetch(`http://localhost:3000/vendors/${vendorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  });

  alert("Product Added ✅");

  showProducts();
}


// ✅ SHOW PRODUCTS
async function showProducts() {

  let res = await fetch(`http://localhost:3000/vendors/${vendorId}`);
  let vendor = await res.json();

  let container = document.getElementById("productList");
  container.innerHTML = "";

  let products = vendor.products || [];

  products.forEach((p, index) => {

    let priceHTML = "";

    // ✅ Variant products
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

    let statusText = p.available ? "Available" : "Out of Stock";

    container.innerHTML += `
      <div class="card">

        <div class="shop-name">${vendor.shopName}</div>

        <div class="card-body">
          <img src="${p.image || '../asset/default.jpeg'}" class="product-img">

          <div class="product-info">
            <h3>${p.name}</h3>
            ${priceHTML}
          </div>
        </div>

        <div class="actions">
          <button onclick="editProduct(${index})">✏️</button>
          <button onclick="deleteProduct(${index})">🗑️</button>
          <button onclick="toggleStatus(${index})">${statusText}</button>
        </div>

      </div>
    `;
  });
}

// ✅ DELETE
async function deleteProduct(index) {
  let res = await fetch(`http://localhost:3000/vendors/${vendorId}`);
  let vendor = await res.json();

  vendor.products.splice(index, 1);

  await fetch(`http://localhost:3000/vendors/${vendorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  });

  showProducts();
}


// ✅ EDIT
async function editProduct(index) {
  let res = await fetch(`http://localhost:3000/vendors/${vendorId}`);
  let vendor = await res.json();

  let newName = prompt("Enter new name:", vendor.products[index].name);
  let newPrice = prompt("Enter new price:", vendor.products[index].price_per_unit);

  if (!newName || !newPrice) return;

  vendor.products[index].name = newName;
  vendor.products[index].price_per_unit = Number(newPrice);

  await fetch(`http://localhost:3000/vendors/${vendorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  });

  showProducts();
}


// ✅ TOGGLE
async function toggleStatus(index) {
  let res = await fetch(`http://localhost:3000/vendors/${vendorId}`);
  let vendor = await res.json();

  vendor.products[index].available = !vendor.products[index].available;

  await fetch(`http://localhost:3000/vendors/${vendorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  });

  showProducts();
}


// ✅ LOAD
showProducts();
function changePrice(select) {
  let price = select.value;

  let priceText = select.parentElement.querySelector(".price");

  priceText.innerText = "₹" + price;
}