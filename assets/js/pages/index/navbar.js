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

    function toggleCategoryTitles(hide) {
        categoryTitles.forEach(el => {
            el.style.display = hide ? "none" : el.dataset.originalDisplay;
        });
    }

    let searchOpen = false; // 🔑 controla estado da busca

    function openSearch() {
        inputSearch.style.display = "grid";
        if (arrowLeft) arrowLeft.style.display = "grid";
        toggleCategoryTitles(true); // esconde títulos

        inputSearch.focus(); // 👉 abre teclado
        searchOpen = true;
    }

    function applySearchAndCloseKeyboard() {
        // aplica filtro
        const filter = inputSearch.value.toLowerCase();
        produtos.forEach(produto => {
            const nomeEl = produto.querySelector("h1");
            const nome = nomeEl ? nomeEl.textContent.toLowerCase() : "";
            produto.style.display = nome.includes(filter) ? produto.dataset.originalDisplay : "none";
        });

        // fecha teclado
        inputSearch.blur();
        searchOpen = false;
    }

    if (iconSearch) {
        iconSearch.addEventListener("click", () => {
            if (!searchOpen) {
                openSearch(); // primeiro clique → abre e foca
            } else {
                applySearchAndCloseKeyboard(); // segundo clique → aplica filtro e fecha teclado
            }
        });
    }

    if (arrowLeft) {
        arrowLeft.addEventListener("click", () => {
            inputSearch.style.display = "none";
            inputSearch.value = "";
            if (arrowLeft) arrowLeft.style.display = "none";

            produtos.forEach(produto => {
                produto.style.display = produto.dataset.originalDisplay;
            });
            toggleCategoryTitles(false); // mostra títulos novamente
            searchOpen = false;
        });
    }
});