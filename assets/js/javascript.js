// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city 
// and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, 
// the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, 
// an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// Linking city, weather, date and history to the DOM
let cityNameEl = $(".cityName");
let currentDateEl = $(".currentDate");
let weatherIconEl = $(".weatherIcon");
let searchHistoryEl = $(".historyItems");

// Weather variables 
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".uvIndex");
let cardRow = $(".card-row");

// Date varible 
var today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;

// APIs
let apiKey = "3ac0d8db34de82819d13a9167239acc1";
let searchBtn = $(".searchBtn");
let searchInput = $(".searchInput");

// Adding new items for previously searched cities
function renderSearchHistory(cityName) {
  searchHistoryEl.empty();
  let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < searchHistoryArr.length; i++) {
      let newListItem = $("<li>").attr("class", "historyEntry");
      newListItem.text(searchHistoryArr[i]);
      searchHistoryEl.prepend(newListItem);
  }
}

// Fetching API data for the desired city
function getWeather(desiredCity) {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
  $.ajax({
      url: queryUrl,
      method: "GET"
  })
  .then(function(weatherData) {
      let cityObj = {
          cityName: weatherData.name,
          cityTemp: weatherData.main.temp,
          cityHumidity: weatherData.main.humidity,
          cityWindSpeed: weatherData.wind.speed,
          cityUVIndex: weatherData.coord,
          cityWeatherIconName: weatherData.weather[0].icon
  )}}