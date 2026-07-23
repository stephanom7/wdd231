const params = new URLSearchParams(window.location.search);

document.getElementById("displayFirstName").textContent = params.get("firstName");
document.getElementById("displayLastName").textContent = params.get("lastName");
document.getElementById("displayEmail").textContent = params.get("email");
document.getElementById("displayMobile").textContent = params.get("mobile");
document.getElementById("displayOrgName").textContent = params.get("orgName");
document.getElementById("displayTimestamp").textContent = params.get("timestamp");

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;