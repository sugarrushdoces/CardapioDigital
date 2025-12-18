const imgLogoDisappears = document.getElementById("imgLogoDisappears")
const iconSearch = document.getElementById("iconSearch")
const inputSearch = document.getElementById("inputSearch");
const arrowLeft = document.getElementById("arrowLeft")
const moreBar = document.getElementById("moreBar")

iconSearch.addEventListener("click", function () {
    moreBar.style.display = "none";
    imgLogoDisappears.style.display = "none";
    inputSearch.style.display = "flex";
    arrowLeft.style.display = "flex";
    inputSearch.focus();
});

arrowLeft.addEventListener("click", function () {
    // Fecha a barra
    arrowLeft.style.display = "none";
    inputSearch.style.display = "none";
    imgLogoDisappears.style.display = "flex";
    moreBar.style.display = "flex";

    // Limpa o texto
    inputSearch.value = "";

    // Mostra todos os produtos novamente
    const produtos = document.querySelectorAll(".container-produtos");
    produtos.forEach(produto => {
        produto.style.display = "flex";
    });
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