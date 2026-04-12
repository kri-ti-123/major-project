/* ================== SESSION CHECK ================== */
const userSession = JSON.parse(localStorage.getItem('userSession'));
if (!userSession) {
    window.location.href = 'login.html';
}

/* ================== API FUNCTION ================== */
function getData() {
    return fetch("http://localhost:3000/vendors")
        .then(res => res.json());
}

/* ================== CATEGORY FUNCTION ================== */
function openCategory(category) {
    getData().then(vendors => {

        let shops = vendors.filter(v =>
            v.products.some(p => p.category === category)
        );

        console.log("Filtered Shops:", shops);

        // next step me UI me show karenge
    });
}

/* ================== SLIDER ================== */
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');
let index = 0;
let timer = null;

function showSlide(i){
    slides.forEach(s=>s.classList.remove('active'));
    dots.forEach(d=>d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
}

function startTimer(){
    stopTimer();
    timer = setInterval(()=>{
        const next = (index + 1) % slides.length;
        showSlide(next);
    }, 3000);
}

function stopTimer(){
    if(timer) clearInterval(timer);
}

dots.forEach(d=>{
    d.addEventListener('click', ()=>{
        const i = Number(d.getAttribute('data-index'));
        showSlide(i);
        startTimer();
    });
});

startTimer();

/* ================== CART ================== */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.small-circle');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

updateCartCount();

/* ================== ADD TO CART ================== */
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {

        const card = e.target.closest('.card');
        const name = card.querySelector('h4').textContent;
        const offer = card.querySelector('.offer').textContent;
        const img = card.querySelector('img').src;

        const priceText = card.querySelector('.price').textContent;
        const numbers = priceText.replace(/[^\d]/g, " ").trim().split(" ");
        const finalPrice = parseInt(numbers[numbers.length - 1]);

        const item = { name, offer, img, price: finalPrice };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        alert("Added to cart");
    });
});
function openCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "product.html";
}