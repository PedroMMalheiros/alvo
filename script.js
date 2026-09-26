"use strict";

// A single source of truth for the six products and their destinations.
const products = [
  { name: "Camiseta ALVO Streetwear Jiu-Jitsu", color: "Preta", image: "produto-01-preta", url: "https://www.mercadolivre.com.br/camiseta-alvo-streetwear-jiu-jitsu-preta/up/MLBU5161737891" },
  { name: "Camiseta ALVO Streetwear Jiu-Jitsu", color: "Branca", image: "produto-02-branca", url: "https://www.mercadolivre.com.br/camiseta-alvo-streetwear-jiu-jitsu-branca/up/MLBU5161717263" },
  { name: "Camiseta ALVO Streetwear Jiu-Jitsu", color: "Verde", image: "produto-03-verde", url: "https://www.mercadolivre.com.br/camiseta-alvo-streetwear-jiu-jitsu-verde/up/MLBU5197595836" },
  { name: "Camiseta ALVO Streetwear Kanji", color: "Preta", image: "produto-04-kanji-preta", url: "https://www.mercadolivre.com.br/camiseta-alvo-streetwear-jiu-jitsu-kanji-preto/up/MLBU5161854769" },
  { name: "Camiseta ALVO Streetwear Kanji", color: "Verde", image: "produto-05-kanji-verde", url: "https://www.mercadolivre.com.br/camiseta-alvo-streetwear-jiu-jitsu-kanji-verde/up/MLBU5232283677" },
  { name: "Camiseta ALVO Streetwear Kanji", color: "Branca", image: "produto-06-kanji-branca", url: "https://www.mercadolivre.com.br/up/MLBU5197632590" }
];

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const grid = document.querySelector("#product-grid");
const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  const description = `${product.name} ${product.color.toLowerCase()}`;
  card.innerHTML = `
    <button class="product-image" type="button" aria-label="Mostrar costas: ${description}" aria-pressed="false">
      <img class="product-front" src="alvo-img/${product.image}-frente.jpg" width="490" height="720" alt="${description}, frente" loading="lazy" decoding="async">
      <img class="product-back" src="alvo-img/${product.image}-costas.jpg" width="490" height="720" alt="${description}, costas" loading="lazy" decoding="async" aria-hidden="true">
    </button>
    <div class="product-details">
      <h3 class="product-name">${product.name}<span class="product-color">${product.color}</span></h3>
      <a class="button button-solid" href="${product.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver no Mercado Livre: ${description}">Ver no Mercado Livre ${arrow}</a>
    </div>`;

  const imageButton = card.querySelector(".product-image");
  const front = card.querySelector(".product-front");
  const back = card.querySelector(".product-back");
  let showingBack = false;

  function showBack(value) {
    showingBack = value;
    card.classList.toggle("show-back", value);
    imageButton.setAttribute("aria-pressed", String(value));
    imageButton.setAttribute("aria-label", `Mostrar ${value ? "frente" : "costas"}: ${description}`);
    front.setAttribute("aria-hidden", String(value));
    back.setAttribute("aria-hidden", String(!value));
  }

  card.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse" && hoverCapable.matches) showBack(true);
  });
  card.addEventListener("pointerleave", event => {
    if (event.pointerType === "mouse" && hoverCapable.matches) showBack(false);
  });
  imageButton.addEventListener("click", () => showBack(!showingBack));
  return card;
}

grid.append(...products.map(createProductCard));

const header = document.querySelector(".site-header");
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Native modal dialogs provide focus containment and Escape handling.
const dialogTriggers = new WeakMap();
document.querySelectorAll("[data-dialog]").forEach(trigger => {
  trigger.addEventListener("click", () => {
    const dialog = document.getElementById(trigger.dataset.dialog);
    if (trigger.dataset.legal) dialog.setAttribute("aria-label", trigger.dataset.legal);
    dialogTriggers.set(dialog, trigger);
    dialog.showModal();
    document.body.classList.add("has-dialog");
  });
});

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (isOutside) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("has-dialog");
    dialogTriggers.get(dialog)?.focus({ preventScroll: true });
  });
});
