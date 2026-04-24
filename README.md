# PRODIGY_WD_05

SkyCast | Real-Time Weather


SkyCast is a sleek, responsive, and lightweight weather application that provides real-time meteorological data for any city in the world. Built with a focus on simplicity and modern UI design, it leverages the Open-Meteo API to deliver accurate forecasts without requiring complex API keys or setup.

🚀 Features


Global Search: Find current weather conditions for any city worldwide using the integrated Geocoding API.

Geolocation Support: One-tap access to local weather data based on your current physical coordinates.

Comprehensive Metrics: Displays temperature, humidity, wind speed (knots), atmospheric pressure, and "Feels Like" temperature.

Dynamic Visuals: Changes weather icons based on the time of day (Day/Night) and provides descriptive weather status (e.g., "Overcast," "Drizzle").

Glassmorphism UI: A modern, frosted-glass interface built with CSS backdrop filters and gradients.

Mobile Responsive: Optimized for all screen sizes, from mobile devices to desktop monitors.

🛠️ Built With


HTML: Semantic structure for the weather dashboard.

CSS: Custom styling using Flexbox, CSS Grid, and Glassmorphism effects.

JavaScript : Asynchronous API handling using fetch and dynamic DOM manipulation.

Open-Meteo API: Used for both Geocoding (converting city names to coordinates) and Weather Forecasting.

Google Fonts: "Poppins" for a clean, modern typographic feel.

📂 Project Structure


├── index.html   # Main structure of the application

├── style.css    # Custom styles and glassmorphism effects

└── script.js    # Logic for API fetching and UI updates

🚥 Getting Started


To run this project locally, follow these simple steps:

Clone the Repository:

git clone https://github.com/your-username/skycast.git

Navigate to the Directory:

cd skycast


Open the Project:


Simply open index.html in your preferred web browser.

📖 How It Works


Geocoding: When a user enters a city name, the app calls the Open-Meteo Geocoding API to retrieve the exact latitude and longitude.

Weather Fetching: These coordinates are then passed to the Forecast API, which returns current atmospheric data.

UI Transformation: The JavaScript logic maps the WMO (World Meteorological Organization) weather codes to human-readable text and updates the dashboard instantly.

🛡️ License


Distributed under the MIT License. See LICENSE for more information.
