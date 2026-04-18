
const query = localStorage.getItem("searchQuery");
document.getElementById("title").innerText = "Results for: " + query;

const resultsDiv = document.getElementById("results");

fetch("http://localhost:3000/vendors")
  .then(res => res.json())
  .then(shops => {

    resultsDiv.innerHTML = ""; // clear

    shops.forEach(shop => {
      shop.products.forEach(product => {

        if (product.name.toLowerCase().includes(query)) {

          const div = document.createElement("div");

          div.innerHTML = `
            <div class="product-card">
              <img src="${product.image || '../asset/images/food/default.png'}" />

              <div class="card-details">
                <h3>${shop.shopName}</h3>
                <p>${product.name}</p>
                <p>₹${product.price || 100}</p>

                <button onclick='addToCart(${JSON.stringify(product)})'>
                  Add to Cart
                </button>
              </div>
            </div>
          `;

          resultsDiv.appendChild(div);
        }

      });
    });

  });