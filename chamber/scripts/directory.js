async function loadMembers(view = "grid") {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members, view);
}

function displayMembers(members, view) {
  const container = document.getElementById("members");
  container.innerHTML = "";
  container.className = view;

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    if (view === "grid") {
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membership}</p>
      `;
    } else {
      card.innerHTML = `
        <h2>${member.name}</h2>
        <p>${member.address} | ${member.phone}</p>
        <a href="${member.website}" target="_blank">Website</a>
        <p>Level: ${member.membership}</p>
      `;
    }

    container.appendChild(card);
  });
}

document.getElementById("gridBtn").addEventListener("click", () => loadMembers("grid"));
document.getElementById("listBtn").addEventListener("click", () => loadMembers("list"));

// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Initial load
loadMembers();
