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