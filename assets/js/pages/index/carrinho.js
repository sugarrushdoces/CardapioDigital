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
const cartButtons = document.querySelectorAll(".cartMessage");
const footerCarrinho = document.getElementById("footerCarrinho")

// Opções de entrega/retirada
const btnDelivery = document.getElementById("btn-delivery")
const btnPickup = document.getElementById("btn-pickup")
const deliveryInfo = document.getElementById("delivery-info")
const pickupInfo = document.getElementById("pickup-info")
const storeAddress = document.getElementById("store-address")
const deliveryChoiceText = document.getElementById("delivery-choice-text")
const deliveryOptions = document.querySelector('.delivery-options')

let cart = [];
let selectedOption = null;
window.cart = cart;

// Configurar endereço da loja
const STORE_ADDRESS = "Rua Marrocos 109, referência portão de madeira"
storeAddress.textContent = STORE_ADDRESS;

cartButtons.forEach(button => {
    button.addEventListener("click", function(){
    footerCarrinho.style.display = "block"
        const wasAdded = checkAdded();

        if(!wasAdded){
            Toastify({
                text: "Adicionado ao carrinho",
                duration: 2000,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                    offset: {
                 y: 40
                },
                style: {
                    background: "#198f09ff",
                },
            }).showToast();
        }
    });
});

cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

// Event listeners para opções de entrega/retirada
btnDelivery.addEventListener("click", function() {
    if(selectedOption === "delivery" && deliveryInfo.style.display === "block") {
        // Se já estava selecionado, fecha
        deliveryInfo.style.display = "none";
        btnDelivery.classList.remove("active");
        selectedOption = null;
    } else {
        // Abre a opção de entrega
        selectedOption = "delivery";
        btnDelivery.classList.add("active");
        btnPickup.classList.remove("active");
        deliveryInfo.style.display = "block";
        pickupInfo.style.display = "none";
        if(deliveryOptions) deliveryOptions.style.border = "";
    }
});

btnPickup.addEventListener("click", function() {
    if(selectedOption === "pickup" && pickupInfo.style.display === "block") {
        // Se já estava selecionado, fecha
        pickupInfo.style.display = "none";
        btnPickup.classList.remove("active");
        selectedOption = null;
    } else {
        // Abre a opção de retirada
        selectedOption = "pickup";
        btnPickup.classList.add("active");
        btnDelivery.classList.remove("active");
        deliveryInfo.style.display = "none";
        pickupInfo.style.display = "block";
        if(deliveryOptions) deliveryOptions.style.border = "";
    }
});

function checkAdded() {
    return cart.length > 10;
}

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
        <div class="cart-items containermodal">
        <div>
        <p>${item.name}</p>
        </div>
        <div class="quantity-counter pricequantity">
        <p>R$ ${item.price.toFixed(2)}</p>
        <div class="btnshopping">
        <button class="btn-decrease" data-name="${item.name}">-</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="btn-increase" data-name="${item.name}">+</button>
        </div>
        </div>
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
    if(event.target.classList.contains("btn-decrease")){
        const name = event.target.getAttribute("data-name")
        decreaseQuantity(name);
    }
    
    if(event.target.classList.contains("btn-increase")){
        const name = event.target.getAttribute("data-name")
        increaseQuantity(name);
    }
})

function decreaseQuantity(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}

function increaseQuantity(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        cart[index].quantity += 1;
        updateCartModal();
    }
}
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.style.border = "";
        addressWarn.style.display = "none";
}
})

checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return;
    
    // Validação de opção selecionada
    if(!selectedOption) {
        if(deliveryOptions) deliveryOptions.style.border = "1px solid red";
        return;
    }
    
    // Validação apenas para entrega
    if(selectedOption === "delivery" && addressInput.value === ""){
        addressWarn.style.display = "block";
        addressInput.style.border = "2px solid red";
        return;
    }

    const cartItems = cart.map((item) => {
    return (
        ` ${item.name} Quatidade: (${item.quantity}) Preço R$${item.price} |`
    )
    }).join("")

    const phone = "41998924551"
    let fullMessage;
    
    if(selectedOption === "delivery"){
        fullMessage = `${cartItems}\nEndereço de Entrega: ${addressInput.value}\nTotal: ${cartTotal.textContent}`;
    } else {
        fullMessage = `${cartItems}\n**RETIRADA**\nEndereço: ${STORE_ADDRESS}\nTotal: ${cartTotal.textContent}`;
    }
    
    const encodedMessage = encodeURIComponent(fullMessage);

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

    cart = [];
    updateCartModal();

})