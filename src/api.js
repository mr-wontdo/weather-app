// Get weather data
const getWeatherData = async (location) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c81cf0bc1ec1474684580852233011&q=${location}`, { mode: 'cors' });
        const data = await response.json();
        if (data.hasOwnProperty('error')) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        alert(error.toString().replace('Error: ', ''));
    }
};

// Get forecast data
const getForecastData = async (location) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c81cf0bc1ec1474684580852233011&q=${location}`, { mode: 'cors' });
        const data = await response.json();
        if (data.hasOwnProperty('error')) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        alert(error.toString().replace('Error: ', ''));
    }
};
