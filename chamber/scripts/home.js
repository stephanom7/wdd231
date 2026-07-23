const apiKey = "45ced9a08344551012fe82cbc4ffda8d";
const city = "Quito,EC";
const units = "metric";

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

async function getCurrentWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("API key not active yet");

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    document.getElementById("current-weather").innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p class="temp">${temp}°C</p>
      <p class="description">${description}</p>
    `;
  } catch (error) {
    console.log("Weather not available yet:", error.message);
    document.getElementById("current-weather").innerHTML = "<p>Loading weather...</p>";
  }
}

async function getForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("API key not active yet");

    const days = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    let html = "<h3>3-Day Forecast</h3><div class='forecast-row'>";
    days.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(day.main.temp);
      html += `<div class="forecast-day"><p>${dayName}</p><p>${temp}°C</p></div>`;
    });
    html += "</div>";

    document.getElementById("forecast").innerHTML = html;
  } catch (error) {
    console.log("Forecast not available yet:", error.message);
    document.getElementById("forecast").innerHTML = "";
  }
}

async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  const eligible = members.filter(m => m.membership === 2 || m.membership === 3);
  const shuffled = eligible.sort(() => 0.5 - Math.random());
  const count = Math.random() < 0.5 ? 2 : 3;
  const selected = shuffled.slice(0, count);

  const container = document.getElementById("spotlight-cards");
  container.innerHTML = "";

  selected.forEach(member => {
    const level = member.membership === 3 ? "Gold Member" : "Silver Member";
    container.innerHTML += `
      <div class="spotlight-card">
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership-level">${level}</p>
      </div>
    `;
  });
}

getCurrentWeather();
getForecast();
loadSpotlights();