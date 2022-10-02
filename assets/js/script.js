const apiKey = "5ea8f6cd729d38156f2cead0b0bec8d3";

var cities = []
var cityEl = document.querySelector("#city");
var InputSearchEl = document.querySelector("#input-search");
var searchedCityEl = document.querySelector("#searched-city");
var weatherContainerEl = document.querySelector("#weather-container-now");
var historySerchEl = document.querySelector("#history-search-btns");
var fiveDaysEl = document.querySelector("#five-days");
var titleForecastFiveEl = document.querySelector("#forecast");
var displayFiveEl = document.querySelector("#display-fivedays")

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var cityWeather = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data,city);
            });
        } else{
            alert("Error");
        }   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

