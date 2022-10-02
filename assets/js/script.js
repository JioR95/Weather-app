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

var displayWeather = function(weather, city) { weatherContainerEl.textContent = "";
    searchedCityEl.textContent = city;
    
    var date = document.createElement("span"); date.textContent = "(" + moment(weather.dt.value).add(0.1, "days").calendar() + ")";
    searchedCityEl.appendChild(date);

    var icon = document.createElement("img"); icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
    searchedCityEl.appendChild(icon);

    var wind = document.createElement("span"); wind.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    wind.classList = "list-group-item border-0";
    searchedCityEl.appendChild(wind);

    var temp = document.createElement("span"); temp.textContent = "Temperature: " + weather.main.temp + "ºF";
    temp.classList = "list-group-item border-0";
    searchedCityEl.appendChild(temp);

    var humidity = document.createElement("span"); humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-group-item border-0";
    searchedCityEl.appendChild(humidity);

    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    getUv(lon,lat)
};

var getFiveDays = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayFiveDays(data,city);
            });
        }else{
            alert("Error");
        }; 
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};

var displayFiveDays = function(forecast){
    displayFiveEl.textContent = "";
    titleForecastFiveEl.textContent = "5-Days Forecast:";

    var listDays = forecast.list;
     for ( var i = 5; i < listDays.length; i = i +8){
        var daily = listDays[i];
        
        var cardContainer = document.createElement("div"); cardContainer.classList = "card bg-info text-light m-2 border-0cd .";

        var cardDate = document.createElement("h5")
        cardDate.classList = "card-header text-center border-0 w-100"; cardDate.textContent = moment.unix(daily.dt).format("MMM D, YYYY");
        cardContainer.appendChild(cardDate);

        var cardIcon = document.createElement("img")
        cardIcon.classList = "card-body text-center"; cardIcon.setAttribute("src", `https://openweathermap.org/img/wn/${daily.weather[0].icon}.png`);
        cardContainer.appendChild(cardIcon);

        var cardTemp = document.createElement("span"); cardTemp.classList = "card-body text-center border-0 w-100";
        cardTemp.textContent = "Temp: " + daily.main.temp + "ºF";
        cardContainer.appendChild(cardTemp);

        var cardWind = document.createElement("span"); cardWind.classList = "card-body text-center border-0 w-100";
        cardWind.textContent = "Wind " + daily.wind.speed + "MPH";
        cardContainer.appendChild(cardWind);

        var cardHumidity = document.createElement("span"); cardHumidity.classList = "card-body text-center border-0 w-100";
        cardHumidity.textContent = "Humidity: " + daily.main.humidity + "%";
        cardContainer.appendChild(cardHumidity);

        displayFiveEl.appendChild(cardContainer);
        
    };
};

var displayUv = function (data){
    var uvIndex = document.createElement("div");
    uvIndex.textContent = "UV Index: ";
    uvIndex.classList = "list-group-item border-0"

    uvValue = document.createElement("span");
    uvValue.textContent = data.value;

    if(data.value > 8){
        uvValue.classList = "severe alert alert-danger";
    } else if (data.value > 2){
        uvValue.classList = "moderate alert alert-warning"
    } else{
        uvValue.classList = "favorable alert alert-primary";
    };

    uvIndex.appendChild(uvValue);
    searchedCityEl.appendChild(uvIndex);
};

var getFiveDays = function(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayFiveDays(data,city);
            });
        }else{
            alert("Error");
        };   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};
