// Seleciona todas as imagens de produto
const imagens = document.querySelectorAll('.img-produto');

imagens.forEach(img => {
  img.addEventListener('click', () => {
    // pega o container do produto clicado
    const container = img.closest('.container-produtos');
    const descricao = container.querySelector('.descricao-produto');
    const text = container.querySelector('.disappear-text');

    // alterna visibilidade
    descricao.style.display = 
      descricao.style.display === 'none' ? 'block' : 'none';
    text.style.display = 
     text.style.display === 'none' ? 'block' : 'none';
  });
});

// Oculta títulos de categoria enquanto o usuário pesquisa
const searchInput = document.getElementById('inputSearch');
const categoryTitles = document.querySelectorAll('.container-produtoh1');

function toggleCategoryTitles() {
  if (!searchInput || !categoryTitles) return;
  const shouldHide = searchInput.value.trim().length > 0;
  categoryTitles.forEach(el => {
    el.style.display = shouldHide ? 'none' : '';
  });
}

if (searchInput) {
  searchInput.addEventListener('input', toggleCategoryTitles);
  document.addEventListener('DOMContentLoaded', toggleCategoryTitles);
  // Chamada imediata para cobrir casos em que o script roda após o DOM
  toggleCategoryTitles();
}