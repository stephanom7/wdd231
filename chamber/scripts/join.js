document.getElementById("timestamp").value = new Date().toISOString();

function openModal(id) {
  document.getElementById(id).showModal();
}

function closeModal(id) {
  document.getElementById(id).close();
}

document.getElementById("npInfoBtn").addEventListener("click", () => openModal("npModal"));
document.getElementById("bronzeInfoBtn").addEventListener("click", () => openModal("bronzeModal"));
document.getElementById("silverInfoBtn").addEventListener("click", () => openModal("silverModal"));
document.getElementById("goldInfoBtn").addEventListener("click", () => openModal("goldModal"));

document.getElementById("npCloseBtn").addEventListener("click", () => closeModal("npModal"));
document.getElementById("bronzeCloseBtn").addEventListener("click", () => closeModal("bronzeModal"));
document.getElementById("silverCloseBtn").addEventListener("click", () => closeModal("silverModal"));
document.getElementById("goldCloseBtn").addEventListener("click", () => closeModal("goldModal"));

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;