document.addEventListener('DOMContentLoaded', () => {
    const imgLogoDisappears = document.getElementById("imgLogoDisappears");
    const iconSearch = document.getElementById("iconSearch");
    const inputSearch = document.getElementById("inputSearch");
    const arrowLeft = document.getElementById("arrowLeft");
    const moreBar = document.getElementById("moreBar");

    if (iconSearch) {
        iconSearch.addEventListener("click", function () {
            if (moreBar) moreBar.style.display = "none";
            if (imgLogoDisappears) imgLogoDisappears.style.display = "none";
            if (inputSearch) inputSearch.style.display = "grid";
            if (arrowLeft) arrowLeft.style.display = "grid";
            if (inputSearch) inputSearch.focus();
        });
    }

    if (arrowLeft) {
        arrowLeft.addEventListener("click", function () {
            // Fecha a barra
            arrowLeft.style.display = "none";
            if (inputSearch) inputSearch.style.display = "none";
            if (imgLogoDisappears) imgLogoDisappears.style.display = "grid";
            if (moreBar) moreBar.style.display = "grid";

            // Limpa o texto
            if (inputSearch) inputSearch.value = "";

            // Mostra todos os produtos novamente
            const produtos = document.querySelectorAll(".container-produtos, .container-produtos-1");
            produtos.forEach(produto => {
                produto.style.display = "grid";
            });
        });
    }

    if (inputSearch) {
        inputSearch.addEventListener("input", () => {
            const filter = inputSearch.value.toLowerCase();
            const produtos = document.querySelectorAll(".container-produtos, .container-produtos-1");

            produtos.forEach(produto => {
                const nomeEl = produto.querySelector("h1");
                const nome = nomeEl ? nomeEl.textContent.toLowerCase() : "";

                if (nome.includes(filter)) {
                    produto.style.display = "grid";
                } else {
                    produto.style.display = "none";
                }
            });
        });
    }
});