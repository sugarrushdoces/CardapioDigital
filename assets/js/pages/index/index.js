
// Edite os endereços abaixo para atualizar os canais do site.
// WhatsApp: código do país 55 + DDD 41 + número.
const LINKS = {
  pedir: 'https://catalogo.stone.com.br/sugarrushdoces',
  whatsapp: 'https://wa.me/5541998924551',
  agendamento: 'https://docs.google.com/forms/d/e/1FAIpQLSc1Pa4NMKLnMzniKCIpYbViEhre2JguQuZ0SU31faYggRK1vg/viewform?usp=publish-editor',
  instagram: 'https://www.instagram.com/sugar.rushdoces/',
  youtube: 'https://www.youtube.com/@SugarRushDoces'
};
const aviso=document.querySelector('#aviso');
document.querySelectorAll('[data-link]').forEach(a=>{let url;try{const u=new URL(LINKS[a.dataset.link]);if(['https:','http:'].includes(u.protocol))url=u.href}catch{}if(url){a.href=url;a.target='_blank';a.rel='noopener noreferrer'}else{a.addEventListener('click',e=>{e.preventDefault();aviso.showModal()})}});
