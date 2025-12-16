const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemContainer = document.getElementById("cart-items-list")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("card-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-ward")

let cart = [];
window.cart = cart; // expõe para o console

cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"

})

cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {

    let parentButton = event.target.closest(".green-button")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }

})

function addToCart(name, price){
        const existinItem = cart.find(item => item.name === name)
        if(existinItem){
            existinItem.quantity += 1;
        }else{
            cart.push({
            name,
            price,
            quantity: 1,
        })

        }

        updateCartModal()

}

function updateCartModal(){
    const cartItemsList = document.getElementById("cart-items-list");
    cartItemContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.innerHTML = `
        <div class="cart-items">
        <div>
        <p>${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p>R$ ${item.price.toFixed(2)}</p>
        </div>

        <button class="remove-from-cart-btn" data-name="${item.name}">
        remover
        </button>

        </div>
        `
        total += item.price * item.quantity;

        cartItemContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });


cartCounter.innerHTML = cart.length;
    
}

cartItemContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        
        console.log(name);
    }
})