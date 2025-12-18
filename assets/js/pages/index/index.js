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
const cartFooter = document.getElementById("cartFooter")
const footerCarrinho = document.getElementById("footerCarrinho")
const imgLogoDisappears = document.getElementById("imgLogoDisappears")
const iconSearch = document.getElementById("iconSearch")
const inputSearch = document.getElementById("inputSearch");

let cart = [];
window.cart = cart;

cartButtons.forEach(button => {
    button.addEventListener("click", function(){
    footerCarrinho.style.display = "block"
        const wasAdded = checkAdded();

        if(!wasAdded){
            Toastify({
                text: "Adicionado ao carrinho",
                duration: 3000,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
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
        
        removeItemCart(name);
    }
})

function removeItemCart(name){
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
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.style.border = "";
        addressWarn.style.display = "none";
}
})

checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.style.display = "block";
        addressInput.style.border = "2px solid red";
        return;
    }

    const cartItems = cart.map((item) => {
    return (
        ` ${item.name} Quatidade: (${item.quantity}) Preço R$${item.price} |`
    )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "41998924551"
    const fullMessage = `${cartItems}\nEndereço: ${addressInput.value}\nTotal: ${cartTotal.textContent}`;
    const encodedMessage = encodeURIComponent(fullMessage);

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

    cart = [];
    updateCartModal();

})

iconSearch.addEventListener("click", function(){
    imgLogoDisappears.style.display = "none"
    inputSearch.style.display = "flex";
});

document.addEventListener("click", function(event){
    const clickedOutside =
    event.target !== inputSearch &&
    event.target !== iconSearch;

    if (clickedOutside) {
    inputSearch.style.display = "none";
    imgLogoDisappears.style.display = "flex"
    }
});

inputSearch.addEventListener("input", () => {
    const filter = inputSearch.value.toLowerCase();
    const produtos = document.querySelectorAll(".container-produtos");

    produtos.forEach(produto => {
        const nome = produto.querySelector("h1").textContent.toLowerCase();

        if (nome.includes(filter)) {
            produto.style.display = "flex";
        } else {
            produto.style.display = "none";
        }
    });
});

