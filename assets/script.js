// selectors

// api key
const apiKey = 'd2486f6655ca72c6811146e45c3ac199';

// api call
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

// current weather display


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