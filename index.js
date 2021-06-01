let apiKey = "&appid=a48984de2e1866778622568cbcb97ff1";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}${apiKey}&units=metric`)
    .then(updateLiveStats);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

function updateLiveStats(respose) {
  let cityTitle = document.querySelector("h1");
  let city = respose.data.name;
  cityTitle.innerHTML = city;
  let liveTemp = document.querySelector("#main-temp");
  liveTemp.innerHTML = Math.round(respose.data.main.temp);
  let high = document.querySelector("#high-temp");
  high.innerHTML = `${Math.round(respose.data.main.temp_max)}ºC`;
  let low = document.querySelector("#low-temp");
  low.innerHTML = `${Math.round(respose.data.main.temp_min)}ºC`;
  // there is something wrong with wind equation
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(respose.data.wind.speed * 10)} km/h`;
  // find the rain % in the response
  let description = document.querySelector(".description");
  description.innerHTML = respose.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = cityInput.value;
  axios.get(`${apiUrl}q=${city}${apiKey}&units=metric`).then(updateLiveStats);
}

function updateCelcius(response) {
  console.log(response);
}

function convertCelcius(event) {
  event.preventDefault();
  axios.get(`${apiUrl}q=${city}${apiKey}&units=metric`).then(updateCelcius);
  let celc = document.querySelector("#celc-click");
  celc.classList.add("unit-clicked");
  let faren = document.querySelector("#faren-click");
  faren.classList.remove("unit-clicked");
}

let celciusLink = document.querySelector(".celcius-link");
celciusLink.addEventListener("click", convertCelcius);

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
  let temp = document.querySelector("#main-temp");
  temp.innerHTML = `63`;
  let celc = document.querySelector("#celc-click");
  celc.classList.remove("unit-clicked");
  let faren = document.querySelector("#faren-click");
  faren.classList.add("unit-clicked");
}

let farenLink = document.querySelector(".faren-link");
farenLink.addEventListener("click", convertFaren);
