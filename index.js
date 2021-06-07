let apiKey = "&appid=a48984de2e1866778622568cbcb97ff1";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let city = document.getElementById("city");

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}${apiKey}&units=metric`)
    .then(updateLiveStats);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function updateLiveStats(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(
    "#country"
  ).innerHTML = ` , ${response.data.sys.country}`;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}ºC`;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}ºC`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = cityInput.value;
  axios.get(`${apiUrl}q=${city}${apiKey}&units=metric`).then(updateLiveStats);
}

function updateCelcius(response) {
  let liveTemp = document.querySelector("#main-temp");
  liveTemp.innerHTML = Math.round(response.data.main.temp);
}

function convertCelcius(event) {
  event.preventDefault();
  axios
    .get(`${apiUrl}q=${city.textContent}${apiKey}&units=metric`)
    .then(updateCelcius);
  document.querySelector("#celc-click").classList.add("unit-clicked");
  document.querySelector("#faren-click").classList.remove("unit-clicked");
}

let now = new Date();
let date = now.getDate();
if (date < 10) date = "0" + now.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

let h2 = document.querySelector("h2");
h2.innerHTML = `${date}/${month}/${year}`;

let hour = now.getHours();
if (hour < 10) hour = "0" + now.getHours();

let minute = now.getMinutes();
if (minute < 10) minute = "0" + now.getMinutes();

let h3 = document.querySelector("h3");
h3.innerHTML = `${hour}:${minute}`;

let changeCity = document.querySelector("#search-bar");
changeCity.addEventListener("submit", searchCity);

function convertFaren(event) {
  event.preventDefault();
  document.querySelector("#main-temp").innerHTML = `63`;
  document.querySelector("#celc-click").classList.remove("unit-clicked");
  document.querySelector("#faren-click").classList.add("unit-clicked");
}

let farenLink = document.querySelector(".faren-link");
farenLink.addEventListener("click", convertFaren);

let celciusLink = document.querySelector(".celcius-link");
celciusLink.addEventListener("click", convertCelcius);
