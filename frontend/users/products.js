// URL se category nikaalo
let params = new URLSearchParams(window.location.search);
let category = params.get("category");

// Title set karo
document.getElementById("category-title").innerText = category.toUpperCase();

// Data (tum yaha apne products add kar sakti ho)
let products = {
  fruits: [
    { name: "Apple", image: "../asset/images/grocery/fruits/apple.jpg" },
    { name: "Mango", image: "../asset/images/grocery/fruits/mango.jpg" },
    { name: "Grapes", image: "../asset/images/grocery/fruits/grape.jpg" },
    { name: "Pomegranate", image: "../asset/images/grocery/fruits/pomegrante.jpg" },
    { name: "Guava", image: "../asset/images/grocery/fruits/guava.jpg" },
    { name: "Papaya", image: "../asset/images/grocery/fruits/papaya.jpg" },
    { name: "Kiwi", image: "../asset/images/grocery/fruits/kiwi.jpg"},
    { name: "Orange", image: "../asset/images/grocery/fruits/orange.jpg"},
    { name: "Strawberry", image: "../asset/images/grocery/fruits/strawberry.jpg"},
    { name: "Banana", image: "../asset/images/grocery/fruits/banana.jpeg"},
    { name: "Dragon Fruit", image: "../asset/images/grocery/fruits/dragon fruit.jpg"},
    { name: "Coconut", image: "../asset/images/grocery/fruits/coconut.jpeg"},
  ],

  vegetables: [
    { name: "Tomato", image: "../asset/images/grocery/vegetables/tomato.jpg" },
    { name: "Potato", image: "../asset/images/grocery/vegetables/potato.jpg" },
    { name: "Onion", image: "../asset/images/grocery/vegetables/onion.jpg" },
    { name: "Bottle Gourd", image: "../asset/images/grocery/vegetables/bottle gourd.jpeg" },
    { name: "Mint", image: "../asset/images/grocery/vegetables/mints.jpg" },
    { name: "Chilli", image: "../asset/images/grocery/vegetables/chilli.jpeg" },
    { name: "Coriander", image: "../asset/images/grocery/vegetables/coriander.jpg" },
    { name: "Lemon", image: "../asset/images/grocery/vegetables/lemon.jpg" },
    { name: "Capsicum", image: "../asset/images/grocery/vegetables/capsicum.jpg" },
    { name: "Cauliflower", image: "../asset/images/grocery/vegetables/cauliflower.jpeg" },
    { name: "Cucumber", image: "../asset/images/grocery/vegetables/cucumber.jpeg" },
    { name: "Lady finger", image: "../asset/images/grocery/vegetables/lady finger.jpeg" },
    { name: "Beetroot", image: "../asset/images/grocery/vegetables/Beetroot.jpg" },
    { name: "Carrot", image: "../asset/images/grocery/vegetables/carrot.jpg" },
  ],
  dairy: [
    {name: "Bread", image:"../asset/images/grocery/dairy/bread.jpeg" },
    {name: "Butter", image:"../asset/images/grocery/dairy/butter.jpeg" },
    {name: "Buttermilk", image:"../asset/images/grocery/dairy/buttermilk.jpg" },
    {name: "Cheese", image:"../asset/images/grocery/dairy/cheese.jpg" },
    {name: "Cream", image:"../asset/images/grocery/dairy/cream.jpeg" }, 
    {name: "Bread", image:"../asset/images/grocery/dairy/dahi.jpg" },  
    {name: "Egg", image:"../asset/images/grocery/dairy/eggs.jpg" },
    {name: "Ghee", image:"../asset/images/grocery/dairy/ghee.jpg" },
    {name: "Milk", image:"../asset/images/grocery/dairy/milk.jpg" },
    {name: "Paneer", image:"../asset/images/grocery/dairy/paneer.jpg" },
    {name: "Ice Cream", image:"../asset/images/grocery/dairy/ice cream.jpg!w700wp" }
  ],
  flours:[
    {name: "Wheat Flour", image:"../asset/images/grocery/Flours/wheat.jpg"},
    {name: "Gram Flour(Besan) ", image:"../asset/images/grocery/Flours/besan.jpeg"},
    {name: "Maida ", image:"../asset/images/grocery/Flours/maida.jpg"},
    {name: "Ragi Flour", image:"../asset/images/grocery/Flours/ragi.jpeg"},
    {name: "Sattu ", image:"../asset/images/grocery/Flours/sattu.png"},
    {name: "Suji ", image:"../asset/images/grocery/Flours/suji.jpg"},
  ],
  sauces:[
    {name:"Green Chilli Sauce", image:"../asset/images/grocery/Sauces and Spread/green chilli sauce.jpg"},
    {name:"Myonnaise", image:"../asset/images/grocery/Sauces and Spread/myonnaise.jpg"},
    {name:"Peanut Butter", image:"../asset/images/grocery/Sauces and Spread/peanut butter.jpg"},
    {name:"Pizza Sauce", image:"../asset/images/grocery/Sauces and Spread/pizza sauce.jpeg"},
    {name:"Soya Sauce", image:"../asset/images/grocery/Sauces and Spread/soya sauce.jpg"},
  ],
  drinks:[
    {name:"Soft drinks",image:"../asset/images/grocery/drinks/soft drinks.jpg"},
     {name:"Shakes",image:"../asset/images/grocerydrinks/shakes.jpeg.jpg"}


  ]


};
 

// Product list container
let productList = document.getElementById("product-list");

// Check category exist ya nahi
if (!products[category]) {
  productList.innerHTML = "<p>No products found</p>";
} else {
  products[category].forEach(item => {
    productList.innerHTML += `
      <div class="card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <button onclick="showShops('${item.name}')">View</button>
      </div>
    `;
  });
}
function openProduct(productName) {
  localStorage.setItem("selectedProduct", productName);
  showShops(productName);
}
function showShops(productName) {

  let allProducts = JSON.parse(localStorage.getItem("products")) || [];

  let container = document.getElementById("product-list");

  container.innerHTML = `<h3>${productName} available in:</h3>`;

  let filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(productName.toLowerCase())
    && p.status === "available"
  );

  if (filtered.length === 0) {
    container.innerHTML += "<p>No shops available</p>";
    return;
  }

  filtered.forEach((p, index) => {

    container.innerHTML += `
      <div class="card">

        <div class="shop-name">${p.shopName}</div>

        
        <img src="${p.image}" class="product-img">
      

        <h3>${p.name}</h3>

        <p class="price">₹${p.price}</p>

         <select onchange="updatePrice(this, ${p.price})">
          <option value="1">1 kg</option>
          <option value="0.5">500 g</option>
          <option value="0.25">250 g</option>
        </select>

        <button onclick='addToCart(${JSON.stringify(p)})'>
          Add to Cart
        </button>

      </div>
    `;
  });
}
function updatePrice(selectElement, basePrice) {

  let value = parseFloat(selectElement.value);

  let newPrice = basePrice * value;

  // nearest price element find karo
  let priceTag = selectElement.parentElement.querySelector(".price");

  priceTag.innerText = "₹" + newPrice;
}
/*function loadProducts() {

  let products = JSON.parse(localStorage.getItem("products")) || [];

  let container = document.getElementById("userProductList");
  container.innerHTML = "";

  products.forEach((p, index) => {

    if (p.status !== "available") return; // sirf available dikhao

    container.innerHTML += `
      <div class="card">

        <!-- Shop Name -->
        <div class="shop-name">${p.shopName}</div>

        <div class="card-body">

          <img src="${p.image}" class="product-img">

          <div class="product-info">
            <h3>${p.name}</h3>

            <p id="price-${index}">₹${p.price}</p>

            <!-- Weight select -->
            <select onchange="updatePrice(event, ${index}, ${p.price})">
              <option value="1">1 kg</option>
              <option value="0.5">500 g</option>
              <option value="0.25">250 g</option>
            </select>

            <!-- 🔥 Add to Cart -->
            <button onclick="addToCart(${index})">Add to Cart</button>

          </div>

        </div>

      </div>
    `;
  });
}


// price update
function updatePrice(event, index, basePrice) {
  let value = parseFloat(event.target.value);
  let newPrice = basePrice * value;
  document.getElementById(`price-${index}`).innerText = "₹" + newPrice;
}


// cart (abhi basic)
function addToCart(index) {

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(products[index]);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart");
}


loadProducts();*/