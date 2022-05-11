// global variables
const date = new Date();
const apiKey = 'd2486f6655ca72c6811146e45c3ac199';
let counter = 6;
let key = 0;

// api call
function citySearch(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial')
        .then(function (response) {
            if (!response.ok) {
                alert('Please enter a valid city');
            } else {
                response.json()
                .then(function (data) {
                console.log(data);
                currentWeather(data);
                });
            }
            
        });
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=imperial')
        .then(function (response) {
                response.json()
                .then(function (data) {
                console.log(data);
                forecast(data);
                });
        });

};

// current weather display
function currentWeather(data) {
    document.querySelector('#city-name').innerHTML = 
        data.name + ' ' + date.toLocaleDateString('en-US') +
        '<img src=\"http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png\">';
    document.querySelector('#city-temp').innerHTML = 
        'Temperature: ' + data.main.temp + '&deg F';
    document.querySelector('#city-wind').innerHTML = 
        'Wind Speed: ' + data.wind.speed + ' MPH';
    document.querySelector('#city-humidity').innerHTML = 
        'Humidity: ' + data.main.humidity + '%';  
};

// 5 day forecast display
function forecast(data) {
    for (let i = 0; i < 5; i++) {

        let icon = data.list[counter].weather[0].icon;

        let forecastEl = document.createElement('div');
        forecastEl.classList.add('card', 'col-3', 'm-1');

        let forecastDateEl = document.createElement('p');
        forecastDateEl.classList.add('card-text');
        forecastDateEl.innerHTML = data.list[counter].dt_txt + '<br />' + '<img src=\"http://openweathermap.org/img/wn/' + icon + '@2x.png\">';
        forecastEl.appendChild(forecastDateEl);

        let forecastTempEl = document.createElement('p');
        forecastTempEl.classList.add('card-text');
        forecastTempEl.innerHTML = 'Temp: ' + data.list[counter].main.temp + '&deg F';
        forecastEl.appendChild(forecastTempEl);

        let forecastWindEl = document.createElement('p');
        forecastWindEl.classList.add('card-text');
        forecastWindEl.innerHTML = 'Wind: ' + data.list[counter].wind.speed + ' MPH';
        forecastEl.appendChild(forecastWindEl);

        let forecastHumidityEl = document.createElement('p');
        forecastHumidityEl.classList.add('card-text');
        forecastHumidityEl.innerHTML = 'Humidity: ' + data.list[counter].main.humidity + '%';
        forecastEl.appendChild(forecastHumidityEl);

        document.querySelector('#forecast-container').appendChild(forecastEl);
        counter += 8;
    }
};

// save to local storage
function saveCity(city) {
    localStorage.setItem(key, city);
};

// load local storage
function loadStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let storedCityEl = document.createElement('button');
        storedCityEl.classList.add('btn', 'btn-secondary', 'col-12', 'm-1');

        let city = localStorage.getItem(i);
        storedCityEl.innerHTML = city;

        document.querySelector('#search-container').appendChild(storedCityEl);
    }
}

// form submit handler
function submitHandler (event) {
    event.preventDefault();
    let city = document.querySelector('#search-box').value.trim();
    citySearch(city);
    saveCity(city);
    key++;
}

loadStorage();

// form event listener
document.querySelector('#search-container')
    .addEventListener('submit', submitHandler);