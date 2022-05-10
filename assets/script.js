// selectors
const searchBoxEl = document.querySelector('#search-box');
const searchBtnEl = document.querySelector('#search-btn');
const searchFormEl = document.querySelector('#search-container');

// api key
const apiKey = 'd2486f6655ca72c6811146e45c3ac199';

function citySearch(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
        .then(function (response) {
            if (!response.ok) {
                alert('Please enter a valid city');
            } else {
                response.json()
                .then(function (data) {
                console.log(data);
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

function submitHandler (event) {
    event.preventDefault();
    console.log('search submitted.');
    console.log(searchBoxEl.value);
    let city = searchBoxEl.value.trim();
    citySearch(city);
}

searchFormEl.addEventListener('submit', submitHandler);