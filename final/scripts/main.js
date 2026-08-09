const toggle = document.querySelector("#navToggle");
const links = document.querySelector("#navLinks");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
}

const yearSpan = document.querySelector("#year");
const modifiedSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (modifiedSpan) modifiedSpan.textContent = document.lastModified;

// ===== Countdown / tournament status (home page only) =====
const countdownBox = document.querySelector("#countdown");

if (countdownBox) {
  const kickoff = new Date("2026-06-11T00:00:00");
  const now = new Date();

  if (now < kickoff) {
    const msLeft = kickoff - now;
    const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    countdownBox.innerHTML = `<span class="countdown-number">${days}</span> days until kickoff`;
  } else {
    countdownBox.innerHTML = `Tournament complete &mdash; relive the highlights below.`;
  }
}

// ===== Newsletter form timestamp (newsletter page only) =====
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", () => {
    document.querySelector("#timestamp").value = Date.now();
  });
}