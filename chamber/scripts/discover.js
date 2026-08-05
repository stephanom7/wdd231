import discover from "../data/discover.mjs";

// ===== Build the 8 cards =====
const container = document.querySelector("#discover-cards");

discover.forEach((item, index) => {
  const card = document.createElement("section");
  card.classList.add("card", `card${index + 1}`);

  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button type="button" title="Learn more about ${item.name}">Learn More</button>
  `;

  container.appendChild(card);
});

// ===== Visitor message (localStorage) =====
const messageBox = document.querySelector("#visitor-message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysBetween = Math.floor((now - Number(lastVisit)) / msPerDay);

  if (daysBetween < 1) {
    message = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${daysBetween} days ago.`;
  }
}

messageBox.textContent = message;
localStorage.setItem("lastVisit", now);

// ===== Footer year / last modified =====
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;