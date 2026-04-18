
/* Session Check - Redirect to Login if not authenticated */
const userSession = JSON.parse(localStorage.getItem('userSession'));
if (!userSession) {
    window.location.href = 'login.html';
}

/* Slider: dot click + auto-advance every 3s */
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

/* Update Cart Count */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('grocerycart')) || [];
    const cartCountElement = document.querySelector('.small-circle');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

/* Initialize Cart Count on Page Load */
updateCartCount();

/* Add to Cart */
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const name = card.querySelector('h4').textContent;
        const offer = card.querySelector('.offer').textContent;
        const rating = card.querySelector('.rating').textContent.split(' ')[1];
        const img = card.querySelector('img').src;
        
        const item = { name, offer, rating, img };
        const cart = JSON.parse(localStorage.getItem('grocerycart')) || [];
        cart.push(item);
        localStorage.setItem('grocerycart', JSON.stringify(cart));
        
        updateCartCount();
        alert('Added to cart!');
    });
});
function filterCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "grocery-products.html";
}