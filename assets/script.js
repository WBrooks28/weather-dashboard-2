// global variables
const date = new Date();

// api key
const apiKey = 'd2486f6655ca72c6811146e45c3ac199';

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
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)
        .then(function (response) {
                response.json()
                .then(function (data) {
                console.log(data);
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
}

// 5 day forecast display


// local storage


// form submit handler
function submitHandler (event) {
    event.preventDefault();
    let city = document.querySelector('#search-box').value.trim();
    citySearch(city);
}

// form event listener
document.querySelector('#search-container')
    .addEventListener('submit', submitHandler);