/* Update Cart Count */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
        const img = card.querySelector('img').src;

        const priceText = card.querySelector('.price').textContent;

        const numbers = priceText.replace(/[^\d]/g, " ").trim().split(" ");
        const finalPrice = parseInt(numbers[numbers.length - 1]);

        const item = { name, img, price: finalPrice };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert("Added to cart");
    });
});
