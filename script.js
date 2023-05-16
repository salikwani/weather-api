
var header = document.getElementById("header");
var weather = document.getElementById("weather-data");
var fetchData = document.getElementById("fetch-data");
var location = document.getElementById("location");
var lat = document.getElementById("lat");
var long = document.getElementById("long");
var details = document.getElementById("details");

fetchData.addEventListener("click", (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        var p = document.createElement("p");
        p.innerHTML = "Geolocation is not supported by this browser.";
        header.appendChild(p);
    }
});

function showPosition(position) {
    fetchData.style.display = "none";
    location.style.display = "flex";

    lat.innerHTML = "Latitude: " + position.coords.latitude;
    long.innerHTML = "Longitude: " + position.coords.longitude;

    var myiframe = document.createElement("iframe");
    myiframe.setAttribute("src",`https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&hl=es;z=14&output=embed`);
    myiframe.style.width = "70vw";
    myiframe.style.height = "70vh";
    location.appendChild(myiframe);

    weatherData(position.coords.latitude,position.coords.longitude);
}

async function weatherData(lat, long) {
    weather.style.display = "block";
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ef98be4e19c6c8cc43752d15216e0e64`;
    fetch(url).then((response) => {
        return response.json();
    }).then((response)=> {
        console.log(response);
        details.innerHTML += `   <p>Location: ${response.name}</p>
                                <p>Lat: ${response.coord.lat}</p>
                                <p>Long: ${response.coord.lon}</p>
                                <p>TimeZone: ${response.timezone}</p>
                                <p>Wind Speed: ${response.wind.speed}</p>
                                <p>Pressure: ${response.main.pressure}</p>
                                <p>Humidity: ${response.main.humidity}</p>
                                <p>Wind Direction: ${response.wind.deg}</p>
                                <p>Feels Like: ${response.main.feels_like}</p>`
    }).catch((err) => {
            console.log(err);
    });
}

