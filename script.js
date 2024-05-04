document.getElementById("geoLocation").addEventListener("click", function () {
    getLocationWeather();
});

document.getElementById("manualLocation").addEventListener("click", function () {
    document.getElementById("city").style.display = "block";
    document.getElementById("search").style.display = "block";
});

document.getElementById("search").addEventListener("click", function () {
    const city = document.getElementById("city").value;
    if (city) {
        // Clear previous results and show loading indicator
        clearResults();
        showLoading();
        fetchWeather(city);
    }
});

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const api_url=process.env.api_u;
            const api_key=process.env.api_k;
            const apiKey = api_url;
            const apiUrl = api_key;

            // Clear previous results and show loading indicator
            clearResults();
            showLoading();

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    displayWeatherResults(data);
                })
                .catch((error) => {
                    console.error("Error: " + error);
                    displayError("Failed to fetch weather data");
                })
                .finally(() => {
                    hideLoading();
                });
        });
    }
}

function fetchWeather(city) {
    const apiKey = 'a7d7ac280533bccf5abf54b2b8470507';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeatherResults(data);
        })
        .catch((error) => {
            console.error("Error: " + error);
            displayError("Failed to fetch weather data");
        })
        .finally(() => {
            hideLoading();
        });
}

function displayWeatherResults(data) {
    const location = data.name;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;

    document.getElementById("location").textContent = `Location: ${location}`;
    document.getElementById("weather").textContent = `Weather: ${weather}`;
    document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
}

function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

function clearResults() {
    document.getElementById("location").textContent = "";
    document.getElementById("weather").textContent = "";
    document.getElementById("temperature").textContent = "";
    document.getElementById("error").textContent = "";
}

function displayError(message) {
    document.getElementById("error").textContent = `Error: ${message}`;
}
