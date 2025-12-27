document.addEventListener('DOMContentLoaded', () => {
    const iconSearch = document.getElementById("iconSearch");
    const inputSearch = document.getElementById("inputSearch");
    const arrowLeft = document.getElementById("arrowLeft");

    const produtos = document.querySelectorAll(".container-produtos, .container-produtos-1");
    const categoryTitles = document.querySelectorAll(".container-produtoh1");

    // Salva display original
    produtos.forEach(produto => {
        produto.dataset.originalDisplay = getComputedStyle(produto).display;
    });
    categoryTitles.forEach(title => {
        title.dataset.originalDisplay = getComputedStyle(title).display;
    });

    // Função para mostrar/ocultar títulos
    function toggleCategoryTitles(hide) {
        categoryTitles.forEach(el => {
            el.style.display = hide ? "none" : el.dataset.originalDisplay;
        });
    }

    // Abre campo de busca
    function openSearch() {
        inputSearch.style.display = "grid";
        inputSearch.focus();
        if (arrowLeft) arrowLeft.style.display = "grid";
        toggleCategoryTitles(false); // esconde títulos ao abrir busca
    }

    // Fecha campo de busca e restaura
    function closeSearch() {
        inputSearch.style.display = "none";
        inputSearch.value = "";
        if (arrowLeft) arrowLeft.style.display = "none";

        // Restaura produtos e títulos
        produtos.forEach(produto => {
            produto.style.display = produto.dataset.originalDisplay;
        });
        toggleCategoryTitles(false); // mostra títulos novamente
    }

    if (iconSearch) iconSearch.addEventListener("click", openSearch);
    if (arrowLeft) arrowLeft.addEventListener("click", closeSearch);

    if (inputSearch) {
        inputSearch.addEventListener("input", () => {
            const filter = inputSearch.value.toLowerCase();

            produtos.forEach(produto => {
                const nomeEl = produto.querySelector("h1");
                const nome = nomeEl ? nomeEl.textContent.toLowerCase() : "";

                if (nome.includes(filter)) {
                    produto.style.display = produto.dataset.originalDisplay;
                } else {
                    produto.style.display = "none";
                }
            });
        });
    }
});