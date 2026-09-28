"use strict";

const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");

document.querySelectorAll(".product-card").forEach(card => {
  const imageButton = card.querySelector(".product-image");
  const front = card.querySelector(".product-front");
  const back = card.querySelector(".product-back");
  const description = imageButton.getAttribute("aria-label").replace(/^Mostrar [^:]+: /, "");
  const secondView = imageButton.dataset.secondView || "costas";
  let showingBack = false;

  function showBack(value) {
    showingBack = value;
    card.classList.toggle("show-back", value);
    imageButton.setAttribute("aria-pressed", String(value));
    imageButton.setAttribute("aria-label", `Mostrar ${value ? "frente" : secondView}: ${description}`);
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
});

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

document.querySelectorAll("[data-story-carousel]").forEach(carousel => {
  const stage = carousel.querySelector(".story-stage");
  const track = carousel.querySelector(".story-track");
  const slides = Array.from(track.querySelectorAll(".story-slide"));
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  const pagination = carousel.querySelector(".carousel-pagination");
  const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const counter = carousel.querySelector(".carousel-counter");
  let active = 0;
  let touchStart = null;
  let suppressClickUntil = 0;
  let resizeFrame = 0;

  function centerActiveSlide() {
    const slide = slides[active];
    const offset = stage.clientWidth / 2 - slide.offsetLeft - slide.offsetWidth / 2;
    track.style.transform = `translateX(${offset}px)`;
  }

  function showSlide(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target !== active && slides[active].contains(document.activeElement)) {
      track.focus({ preventScroll: true });
    }
    active = target;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === active);
      slide.classList.toggle("is-neighbour", Math.abs(i - active) === 1);
      slide.setAttribute("aria-hidden", String(i !== active));
      dots[i].setAttribute("aria-current", String(i === active));
    });
    previous.disabled = active === 0;
    next.disabled = active === slides.length - 1;
    counter.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    centerActiveSlide();
  }

  carousel.classList.add("is-enhanced");
  previous.hidden = false;
  next.hidden = false;
  pagination.hidden = false;
  showSlide(0);

  slides.forEach((slide, index) => {
    const button = slide.querySelector(".story-slide-button");
    button.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse") event.preventDefault();
    });
    button.addEventListener("click", () => {
      if (Date.now() < suppressClickUntil || index === active) return;
      if (Math.abs(index - active) === 1) showSlide(index);
    });
  });
  previous.addEventListener("click", () => showSlide(active - 1));
  next.addEventListener("click", () => showSlide(active + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

  track.addEventListener("keydown", event => {
    const destinations = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: slides.length - 1
    };
    if (!Object.prototype.hasOwnProperty.call(destinations, event.key)) return;
    event.preventDefault();
    showSlide(destinations[event.key]);
  });

  stage.addEventListener("pointerdown", event => {
    if (event.pointerType !== "touch" || !event.isPrimary) return;
    touchStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }, { passive: true });
  window.addEventListener("pointerup", event => {
    if (!touchStart || event.pointerId !== touchStart.id) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
    suppressClickUntil = Date.now() + 400;
    showSlide(active + (dx < 0 ? 1 : -1));
  }, { passive: true });
  window.addEventListener("pointercancel", () => { touchStart = null; }, { passive: true });

  function schedulePositionUpdate() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(centerActiveSlide);
  }
  window.addEventListener("resize", schedulePositionUpdate, { passive: true });
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(schedulePositionUpdate);
    observer.observe(stage);
    observer.observe(slides[0]);
  }
});
