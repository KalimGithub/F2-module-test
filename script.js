const apiKey = "3f68635044b9d3f6f30d0b1a5ddf2aa9";
const fetchButton = document.getElementById("button");
const map = document.getElementById("map");
const homePage = document.getElementById("container-hidden");

const container = document.getElementById("container");
const detail = document.getElementById("weather-details");
const latitudeLongitude = document.getElementById("latitude-longitude");

document.addEventListener('DOMContentLoaded', function() {
    container.style.display = 'none';
})

function initMap(latitude, longitude) {
    map.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=18&output=embed`;
    latitudeLongitude.innerHTML = `<p>Lat: ${latitude}</p>
                                    <p>Long: ${longitude}</p>`;
}

async function currentWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const result = await fetch(url);
        const weather = await result.json();
        displayData(weather);
    } catch (error) {
        console.log(error);
    }
}


function degreeToDirection(degree) {
    if (degree >= 337.5 || degree < 22.5) {
        return "North";
    } else if (degree >= 22.5 && degree < 67.5) {
        return "North East";
    } else if (degree >= 67.5 && degree < 112.5) {
        return "East";
    } else if (degree >= 112.5 && degree < 157.5) {
        return "South East";
    } else if (degree >= 157.5 && degree < 202.5) {
        return "South";
    } else if (degree >= 202.5 && degree < 247.5) {
        return "South West";
    } else if (degree >= 247.5 && degree < 292.5) {
        return "West";
    } else {
        return "North West";
    }
}


function secondsToTimeZoneString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const sign = hours >= 0 ? "+" : "-";
    return { sign, hours: Math.abs(hours), minutes, seconds: remainingSeconds };
}

function displayData(weather) {
    const location = weather.name;
    const speed = Math.round(weather.wind.speed * 3.6);
    const humidity = weather.main.humidity;
    const time = secondsToTimeZoneString(weather.timezone);
    const pressure = math.round(weather.main.pressure / 1013.25);
    const direction = degreeToDirection(weather.wind.deg);
    const temp = Math.round(weather.main.temp - 273.15);

    detail.innerHTML = `<div>Location: ${locationName}</div>
    <div>Wind Speed: ${speed}kmph</div>
    <div>Humidity: ${humidity} %</div>
    <div>Time Zone: GMT ${time.sign}${time.hours}:${time.minutes}</div>
    <div>Pressure: ${pressure}atm</div>
    <div>Wind Direction: ${direction}</div>
    <div></div>
    <div>Feels like: ${temp}° C</div>
   `;
}

function fetchLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition
        (function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            
            initMap(latitude, longitude);
            
            currentWeather(latitude, longitude);
        });
    }
     else {
        alert("Geolocation is not supported in this browser.");
    }
}


fetchButton.addEventListener("click", () => {
    fetchLocation();
    homePage.style.display = "none";
    container.style.display = "contents";
});