// window.addEventListener("DOMContentLoaded", () => {

//     document.getElementById("button").addEventListener("click", () => {
//         document.getElementById("button").className = 'loading';

//         const error = document.querySelector(".container p");

//         // timezone
//         const timeZoneString = () => {

//         }
//         // wind direction
//         function windDirection = () => {

//         }


//         // getting location
//         if ("geolocation" in navigator) {
//             const userLocation = () => {
//                 console.log("fetching results");

//                 navigator.geolocation.getCurrentPosition(function (position) {
//                     const latitude = position.coords.latitude;
//                     const longitude = position.coords.longitude;


//                     document.getElementById("latitude").textContent = `Lat: ${latitude}`;
//                     document.getElementById("longitude").textContent = `Long: ${longitude}`;

//                     // map using iframe
//                     const iframe = document.createElement("iframe");
//                     iframe.style.cssText = "height:100%;width: 100%;border: 0;";
//                     // iframe.frameBorder = "0";
//                     iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;

//                     document.querySelector(".map").appendChild(iframe);

//                     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5b4401f9c5767a1d4a6beb4b8757d980
//                     `)
//                         .then(e => e.json())
//                         .then(data => {



//                             document.getElementById("location").textContent = data.name;
//                             document.getElementById("wind-speed").textContent = (data.wind.speed * 3.6) + "kmph";
//                             document.getElementById("humidity").textContent = data.main.humidity;
//                             document.getElementById("wind-direction").textContent = data.windDirection(data.wind.deg);
//                             document.getElementById("time-zone").textContent = timeZoneString(data.timezone);
//                             document.getElementById("pressure").textContent = data.data.main.pressure;
//                             document.getElementById("uv-index");
//                             document.getElementById("feels-like").textContent = data.main.feels_like;
//                         })
//                         .catch(e => {
//                             error.textContent = e.message;
//                         });
//                 });
//             }
//             userLocation();
//         } else {
//             error.textContent = "Geolocation is not supported by your browser.";
//         }
//     });
// });














const apiKey = "5b4401f9c5767a1d4a6beb4b8757d980";
const fetchButton = document.getElementById("button");
const map = document.getElementById("map");
const homePage = document.getElementById("container-hidden");

const container = document.getElementById("container");
// const currentLocation = document.getElementById("location");
const detail = document.getElementById("weather-details");
const latitudeLongitude = document.getElementById("latitude-longitude");

function initMap(latitude, longitude) {
    map.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=18&output=embed`;
    latitudeLongitude.innerHTML = `<p>Lat: ${latitude}</p>
                                    <p>Long: ${longitude}</p>`;
}

async function currentWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weather = await response.json();

        displayData(weather);
    }
    catch (error) {
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
    if ("Geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition
        (function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            
            initMap(latitude, longitude);
            
            currentWeather(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported in this browser.");
    }
}


fetchButton.addEventListener("click", () => {
    fetchLocation();
    homePage.style.display = "none";
    container.style.display = "contents";
});