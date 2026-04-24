const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMsg = document.getElementById('error-message');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getCoordinates(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getCoordinates(city);
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude, "Your Location");
        }, () => {
            alert("Location access denied. Please search by city.");
        });
    }
});

// Step 1: Convert City Name to Lat/Lon (Using Open-Meteo Geocoding - No Key Needed)
async function getCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    
    try {
        const response = await fetch(geoUrl);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            showError();
            return;
        }

        const { latitude, longitude, name, country } = data.results[0];
        fetchWeather(latitude, longitude, `${name}, ${country}`);
    } catch (error) {
        showError();
    }
}

// Step 2: Fetch Weather Data using Coordinates
async function fetchWeather(lat, lon, locationName) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m&wind_speed_unit=kn&timezone=auto`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        updateUI(data.current, locationName);
    } catch (error) {
        showError();
    }
}

// Step 3: Map Weather Codes to Readable Text (WMO Standard)
function getWeatherDesc(code) {
    const mapping = {
        0: "Clear Sky",
        1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing Rime Fog",
        51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Dense Drizzle",
        61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
        71: "Slight Snow", 73: "Moderate Snow", 75: "Heavy Snow",
        80: "Rain Showers", 81: "Violent Rain Showers",
        95: "Thunderstorm"
    };
    return mapping[code] || "Weather Update Available";
}

function updateUI(current, locationName) {
    errorMsg.classList.add('hidden');
    weatherDisplay.classList.remove('hidden');

    document.getElementById('city-name').innerText = locationName;
    document.getElementById('temp').innerText = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById('description').innerText = getWeatherDesc(current.weather_code);
    document.getElementById('humidity').innerText = `${current.relative_humidity_2m}%`;
    document.getElementById('wind').innerText = `${current.wind_speed_10m} kn`;
    document.getElementById('feels-like').innerText = `${Math.round(current.apparent_temperature)}°C`;
    document.getElementById('pressure').innerText = `${Math.round(current.surface_pressure)} hPa`;
    
    // Simple logic for Day/Night icons without external assets
    const icon = document.getElementById('weather-icon');
    icon.src = current.is_day ? "https://img.icons8.com/fluency/96/sun.png" : "https://img.icons8.com/fluency/96/full-moon.png";
}

function showError() {
    weatherDisplay.classList.add('hidden');
    errorMsg.classList.remove('hidden');
}