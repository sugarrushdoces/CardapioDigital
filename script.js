/*
  SUGAR RUSH | CARTÃO DIGITAL
  ----------------------------------
  CONFIGURAÇÃO RÁPIDA
  Altere somente os campos abaixo para atualizar links e contato.
  O WhatsApp foi definido com o número mais recente indicado para atendimento.
*/
const CONFIG = Object.freeze({
  name: 'Sugar Rush Doces',
  phone: '5541998924551', // Brasil + DDD + número, somente dígitos
  instagram: 'https://www.instagram.com/sugar.rushdoces/',
  catalog: 'https://sugarrushdocesma.jarbas.net/pt',
  // Opcional: para um link próprio do cartão digital, informe após publicar:
  publicSiteUrl: '',
});

const GROUPS = [
  { id: 'felicidade', name: 'Copos da Felicidade', icon: '🍓', color: '#ffe1e9', subtitle: 'Camadas que encantam', items: ['Felicidade Chocolatudo', 'Felicidade Brownie Dois Amores', 'Felicidade Ninho Brownie', 'Felicidade Morango Brownie Dois Amores', 'Felicidade Oreo'] },
  { id: 'supreme', name: 'Linha Supreme', icon: '🍫', color: '#dff8fc', subtitle: 'Chocolate em destaque', items: ['Supreme Kinder Bueno', 'Supreme Kit Kat White', 'Supreme Ferrero Rocher', 'Supreme Paçoca', 'Supreme Torta de Limão'] },
  { id: 'moranlovers', name: 'Moranlovers', icon: '🍓', color: '#fff0ca', subtitle: 'Paixão por morango', items: ['Morango Cravejado', 'Ninho Morango e Nutella', 'Morango do Amor', 'Raffaello com Morango'] },
  { id: 'brownies', name: 'Fatias Brownies', icon: '🍪', color: '#f8e5d9', subtitle: 'Brownie do seu jeito', items: ['Brownie de Morango', 'Brownie de Nutella', 'Brownie de Oreo', 'Brownie de Uva', 'Brownie de Ferrero Rocher'] },
  { id: 'salgados', name: 'Salgados', icon: '🥟', color: '#fff0c4', subtitle: 'Aquele croc especial', items: ['Coxinha de Frango', 'Coxinha de Costela', 'Risole de Carne Moída'] },
  { id: 'leve', name: 'Linha Leve', icon: '🥗', color: '#e3f9eb', subtitle: 'Frutas e sanduíches', items: ['Salada de Frutas', 'Salada de Frutas com Mousse', 'Sanduíche Natural'] },
  { id: 'shakes', name: 'Shakes', icon: '🥤', color: '#ebefff', subtitle: 'Cremosos e refrescantes', items: ['Shake de Açaí', 'Shake de Maracujá com Nutella', 'Shake de Geleia de Maracujá', 'Shake Whey Protein'] },
  { id: 'encomendas', name: 'Encomendas', icon: '🎂', color: '#ffe3f5', subtitle: 'Festas e datas especiais', items: ['Bolo de Aniversário', 'Kit Festa', 'Doces para Comemoração'] },
];

const $ = (selector) => document.querySelector(selector);
const whatsappUrl = (message = '') => `https://wa.me/${CONFIG.phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
const messageRequest = 'Olá! Conheci a Sugar Rush pelo cartão digital e gostaria de fazer um pedido. Pode me ajudar?';
const messageSpecial = 'Olá! Gostaria de consultar uma encomenda especial (bolo de aniversário ou kit festa) na Sugar Rush.';
const messageDelivery = 'Olá! Quero saber se a rota de delivery da Sugar Rush atende meu bairro hoje. Pode me informar os horários e as condições?';

function setAnchor(id, url) {
  const el = document.getElementById(id);
  if (el) el.href = url;
}
function setupLinks() {
  setAnchor('whatsappMain', whatsappUrl(messageRequest));
  setAnchor('dockWhatsapp', whatsappUrl(messageRequest));
  setAnchor('dockInstagram', CONFIG.instagram);
  setAnchor('specialOrders', whatsappUrl(messageSpecial));
  setAnchor('deliveryWhatsapp', whatsappUrl(messageDelivery));
  setAnchor('instagramMain', CONFIG.instagram);
  setAnchor('catalogMain', CONFIG.catalog);
  setAnchor('allMenuLink', CONFIG.catalog);
}

let toastTimer;
function toast(message) {
  const target = $('#toast');
  target.textContent = message;
  target.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => target.classList.remove('is-visible'), 3200);
}
function openDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog && !dialog.open) dialog.showModal();
}
function setupDialogs() {
  document.querySelectorAll('[data-close]').forEach(button => {
    button.addEventListener('click', () => document.getElementById(button.dataset.close)?.close());
  });
  document.querySelectorAll('.dialog').forEach(dialog => {
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  });
  $('#openQr').addEventListener('click', () => openDialog('qrDialog'));
  $('#qrBottom').addEventListener('click', () => openDialog('qrDialog'));
  $('#openDelivery').addEventListener('click', () => openDialog('deliveryDialog'));
  $('#openOrder').addEventListener('click', () => openOrder());
}

const QR = {
  whatsapp: { file: 'assets/qr-whatsapp.png', label: 'Fale com a Sugar Rush', alt: 'QR Code funcional do WhatsApp da Sugar Rush', url: whatsappUrl(messageRequest) },
  instagram: { file: 'assets/qr-instagram.png', label: '@sugar.rushdoces', alt: 'QR Code funcional do Instagram da Sugar Rush', url: CONFIG.instagram },
  cardapio: { file: 'assets/qr-cardapio.png', label: 'Cardápio digital da Sugar Rush', alt: 'QR Code funcional do cardápio Sugar Rush', url: CONFIG.catalog },
};
function setQr(type) {
  const item = QR[type];
  if (!item) return;
  $('#qrImage').src = item.file;
  $('#qrImage').alt = item.alt;
  $('#qrLabel').textContent = item.label;
  setAnchor('qrDirectLink', item.url);
  document.querySelectorAll('[data-qr]').forEach(button => {
    const active = button.dataset.qr === type;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function setupQr() {
  document.querySelectorAll('[data-qr]').forEach(button => button.addEventListener('click', () => setQr(button.dataset.qr)));
}

function renderCategories() {
  const grid = $('#categoryGrid');
  GROUPS.forEach(group => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category';
    btn.style.setProperty('--cat-bg', group.color);
    btn.setAttribute('aria-label', `Escolher produtos da categoria ${group.name}`);
    btn.innerHTML = `<span class="category-emoji" aria-hidden="true">${group.icon}</span><strong>${group.name}</strong><small>${group.subtitle}</small><span class="category-cue">Escolher <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></span>`;
    btn.addEventListener('click', () => openOrder(group.id));
    grid.append(btn);
  });
}
function setProductOptions(groupId) {
  const group = GROUPS.find(g => g.id === groupId) || GROUPS[0];
  const select = $('#productChoice');
  select.replaceChildren();
  group.items.forEach(name => select.add(new Option(name, name)));
}
function openOrder(categoryId) {
  if (categoryId) $('#productCategory').value = categoryId;
  setProductOptions($('#productCategory').value);
  openDialog('orderDialog');
}
function setupOrder() {
  const category = $('#productCategory');
  GROUPS.forEach(group => category.add(new Option(group.name, group.id)));
  category.value = GROUPS[0].id;
  setProductOptions(GROUPS[0].id);
  category.addEventListener('change', () => setProductOptions(category.value));
  $('#orderForm').addEventListener('submit', event => {
    event.preventDefault();
    const count = Number($('#productQty').value);
    if (!Number.isInteger(count) || count < 1 || count > 50) { toast('Escolha uma quantidade de 1 a 50.'); return; }
    const selectedGroup = GROUPS.find(group => group.id === category.value);
    const customer = $('#customerName').value.trim();
    const product = $('#productChoice').value;
    const delivery = $('#fulfillment').value;
    const notes = $('#orderNotes').value.trim();
    const parts = [
      'Olá! Vim pelo cartão digital da Sugar Rush e gostaria de consultar um pedido:',
      customer ? `Nome: ${customer}` : null,
      `Categoria: ${selectedGroup.name}`,
      `Produto: ${product}`,
      `Quantidade: ${count}`,
      `Preferência: ${delivery}`,
      notes ? `Observações: ${notes}` : null,
      'Podem confirmar disponibilidade, valor e condições de retirada/entrega?'
    ].filter(Boolean);
    window.open(whatsappUrl(parts.join('\n')), '_blank', 'noopener,noreferrer');
  });
}
function shareTarget() {
  if (CONFIG.publicSiteUrl.trim()) return CONFIG.publicSiteUrl.trim();
  if (/^https?:$/.test(location.protocol)) return location.href.split('#')[0];
  return CONFIG.catalog;
}
async function sharePage() {
  const data = {
    title: 'Sugar Rush — Uma explosão de doçura!',
    text: 'Conheça a Sugar Rush! Doces, salgados, cardápio e muito carinho em cada pedido.',
    url: shareTarget(),
  };
  try {
    if (navigator.share) { await navigator.share(data); return; }
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(data.url); toast('Link copiado! Envie para quem merece um doce.'); return; }
    copyFallback(data.url);
  } catch (error) {
    if (error?.name !== 'AbortError') copyFallback(data.url);
  }
}
function copyFallback(text) {
  const temp = document.createElement('textarea');
  temp.value = text;
  temp.style.position = 'fixed';
  temp.style.opacity = '0';
  document.body.append(temp);
  temp.select();
  const ok = document.execCommand('copy');
  temp.remove();
  toast(ok ? 'Link copiado!' : 'Use o link do cardápio para compartilhar.');
}
function saveContact() {
  const vcf = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'FN:Sugar Rush Doces', 'N:;Sugar Rush Doces;;;',
    'ORG:Sugar Rush Doces', `TEL;TYPE=CELL:+${CONFIG.phone}`,
    `URL:${CONFIG.catalog}`,
    `X-SOCIALPROFILE;TYPE=instagram:${CONFIG.instagram}`,
    'NOTE:Doces, salgados, delivery e encomendas.',
    'END:VCARD'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Sugar-Rush-Doces.vcf';
  anchor.style.display = 'none';
  document.body.append(anchor);
  anchor.click(); anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Contato pronto para salvar!');
}
function init() {
  setupLinks();
  setupDialogs();
  setupQr();
  setupOrder();
  renderCategories();
  $('#sharePage').addEventListener('click', sharePage);
  $('#shareBottom').addEventListener('click', sharePage);
  $('#saveContact').addEventListener('click', saveContact);
}
init();
