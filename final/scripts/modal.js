const modal = document.querySelector("#teamModal");
const modalContent = document.querySelector("#modalContent");

export function openModal(team) {
  modalContent.innerHTML = `
    <img src="https://flagcdn.com/w160/${team.flagCode}.png" alt="Flag of ${team.name}" loading="lazy">
    <h2>${team.name}</h2>
    <p><strong>Group:</strong> ${team.group}</p>
    <p><strong>Confederation:</strong> ${team.confederation}</p>
    <p><strong>Host nation:</strong> ${team.host ? "Yes" : "No"}</p>
    <p>Follow ${team.name}'s journey through the group stage and beyond, and connect with other fans on United26.</p>
    <button type="button" class="modal-close">Close</button>
  `;

  modal.showModal();

  modalContent.querySelector(".modal-close").addEventListener("click", closeModal);
}

export function closeModal() {
  modal.close();
}

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});