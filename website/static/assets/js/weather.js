let city = document.getElementById("city")
let temperature = document.getElementById("temperature")
let windSpeed = document.getElementById("windSpeed")
let humidity = document.getElementById("humidity")
let pressure = document.getElementById("pressure")
let img = document.querySelector('.img-fluid')
let notificationElement = document.querySelector(".notification");

let temperatureData = {"unit":"celsius"}

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let url = `${window.origin}/get_weather/${latitude},${longitude}`
    fetch(url)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            displayWeather(data);
        });
}

function displayWeather(data){
    temperatureData.value = Math.floor(data.temp)
    city.innerHTML = data.city_name
    temperature.innerHTML = `${temperatureData.value}°<span>C</span>`
    windSpeed.innerHTML = data.wind_speed
    pressure.innerHTML = data.pressure
    humidity.innerHTML = data.humidity
    img.src = `../static/assets/icons/${data.icon}.png`;
}

function celsiusToFahrenheits(Celsius){
    return Math.floor((9 / 5) * Celsius + 32)
}

temperature.addEventListener('click', function () {
    if (temperatureData.value === undefined) {
        return
    }

    if (temperatureData.unit === 'celsius') {
        let fahrenheit = celsiusToFahrenheits(temperatureData.value)
        temperature.innerHTML = `${fahrenheit}°<span>F</span>`;
        temperatureData.unit = 'fahrenheit'
    }
    else{
        temperature.innerHTML = `${temperatureData.value}°<span>C</span>`;
        temperatureData.unit = 'celsius'
    }

})