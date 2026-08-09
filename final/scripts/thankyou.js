const params = new URLSearchParams(window.location.search);

document.querySelector("#displayFirstName").textContent = params.get("firstName") || "—";
document.querySelector("#displayEmail").textContent = params.get("email") || "—";
document.querySelector("#displayFavoriteTeam").textContent = params.get("favoriteTeam") || "—";
document.querySelector("#displayUpdates").textContent = params.get("updates") || "—";

const rawTimestamp = params.get("timestamp");
document.querySelector("#displayTimestamp").textContent = rawTimestamp
  ? new Date(Number(rawTimestamp)).toLocaleString()
  : "—";