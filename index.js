function showCityWeather(response) {
  let currentTemp = document.querySelector("#temp-value");
  let temp = response.data.temperature.current;
  currentTemp.innerHTML = Math.round(temp);
  let cityElement = document.querySelector("#input-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temp-icon");

  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-icon" />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7e0d4oc64c0e7t1ff280ab9035a47b70";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function submitValue(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input-form");
  searchCity(searchElement.value);
}
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", submitValue);

searchCity("Nairobi");
