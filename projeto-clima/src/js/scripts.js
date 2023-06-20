// Variables and element selection
const apiKey = "d7f72756a32583401131c102e6fbcf83";
let currentCountryFlag = "BR";
let apiCountryURL = `https://flagsapi.com/${currentCountryFlag}/flat/64.png`;
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const DegreeType = document.querySelector("#temperature strong");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const temperatureContainer = document.querySelector("#temperature");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Functions
function toggleLoader() {
  loader.classList.toggle("hide");
}

async function getWeatherData(city) {
  // showing the loader
  toggleLoader();
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const response = await fetch(apiWeatherURL);
  const data = await response.json();

  // hiding the loader
  console.log(data);
  toggleLoader();
  return data;
}

async function showWeatherData(city) {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  // Weather
  tempElement.innerText = Math.floor(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
  weatherContainer.classList.remove("hide");

  // Country flag:
  currentCountryFlag = data.sys.country;
  apiCountryURL = `https://flagsapi.com/${currentCountryFlag}/flat/64.png`;
  countryElement.setAttribute("src", apiCountryURL);

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
}

// Tratamento de erro
function showErrorMessage() {
  errorMessageContainer.classList.remove("hide");
}

function hideInformation() {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
}

// Events
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    const city = event.target.value;
    showWeatherData(city);
  }
});

// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});
