async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const API_KEY = '422bf50a11e0a074c03c7636c540e8d6'; // Replace with your OpenWeatherMap API key
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Update the UI with weather information
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('weatherDesc').textContent = 
            data.weather[0].description.charAt(0).toUpperCase() + 
            data.weather[0].description.slice(1);
        document.getElementById('temperature').textContent = 
            `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').textContent = 
            `Humidity: ${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = 
            `Wind Speed: ${data.wind.speed} m/s`;
        
        // Show the weather info section
        document.getElementById('weatherInfo').classList.add('active');
        
    } catch (error) {
        alert('Error: Unable to fetch weather data. Please check the city name.');
        console.error('Error:', error);
    }
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});