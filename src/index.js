// Get weather data
const getWeatherData = async (location) => {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key=c81cf0bc1ec1474684580852233011&q=' + location, { mode: 'cors' });
        const data = await response.json();
        if (data.hasOwnProperty('error')) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        console.log(error.toString().replace('Error: ', ''));
    }
};

// Get forecast data
const getForecastData = async (location) => {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=c81cf0bc1ec1474684580852233011&q=' + location, { mode: 'cors' });
        const data = await response.json();
        if (data.hasOwnProperty('error')) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        console.log(error.toString().replace('Error: ', ''));
    }
};

// Search for a specific location
// Toggle between Fahrenheit or Celsius
// Change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather.

// API Key: c81cf0bc1ec1474684580852233011
// Forecast Days: 3 Day
// Forecast Interval: Daily and Hourly
// Historical Weather: Last 7 days
// Weather Alerts: Yes
// Air Quality(AQI): Yes