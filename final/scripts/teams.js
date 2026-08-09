import { openModal } from "./modal.js";

const grid = document.querySelector("#teamGrid");
const controls = document.querySelector("#teamControls");

const FAVORITES_KEY = "united26-favorites";

function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function toggleFavorite(teamName) {
  const favorites = getFavorites();
  const index = favorites.indexOf(teamName);

  if (index === -1) {
    favorites.push(teamName);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
}

function buildCard(team, favorites) {
  const isFavorite = favorites.includes(team.name);

  return `
    <article class="team-card" data-name="${team.name}" data-group="${team.group}">
      <img src="https://flagcdn.com/w160/${team.flagCode}.png" alt="Flag of ${team.name}" loading="lazy" width="160" height="107">
      ${team.host ? `<span class="host-badge">Host Nation</span>` : ""}
      <h3>${team.name}</h3>
      <p class="team-meta">Group ${team.group} &middot; ${team.confederation}</p>
      <div class="card-actions">
        <button type="button" class="learn-more-btn">Learn More</button>
        <button type="button" class="favorite-btn ${isFavorite ? "is-favorite" : ""}" title="Toggle favorite" aria-pressed="${isFavorite}">★</button>
      </div>
    </article>
  `;
}

function renderTeams(teams) {
  const favorites = getFavorites();

  grid.innerHTML = teams.map((team) => buildCard(team, favorites)).join("");

  grid.querySelectorAll(".learn-more-btn").forEach((button, index) => {
    button.addEventListener("click", () => openModal(teams[index]));
  });

  grid.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".team-card");
      const teamName = card.dataset.name;
      toggleFavorite(teamName);
      button.classList.toggle("is-favorite");
      button.setAttribute("aria-pressed", button.classList.contains("is-favorite"));
    });
  });
}

async function loadTeams() {
  try {
    const response = await fetch("data/teams.json");

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const teams = await response.json();
    renderTeams(teams);
    setupControls(teams);
  } catch (error) {
    grid.innerHTML = `<p>Sorry, the team list could not be loaded right now. Please try again later.</p>`;
    console.error("Error loading teams:", error);
  }
}

function setupControls(teams) {
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;

    controls.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    if (filter === "all") {
      renderTeams(teams);
    } else if (filter === "favorites") {
      const favorites = getFavorites();
      const favoriteTeams = teams.filter((team) => favorites.includes(team.name));
      renderTeams(favoriteTeams);
    } else if (filter === "host") {
      const hostTeams = teams.filter((team) => team.host);
      renderTeams(hostTeams);
    }
  });
}

loadTeams();