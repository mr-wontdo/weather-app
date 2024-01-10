import { getDayStatus, formatMilitaryLocalTime, formatStandardLocalTime } from './utils';

// Process data
const processData = async (searchParameter) => {
    const [weatherData, forecastData] = await Promise.all([getWeatherData(searchParameter), getForecastData(searchParameter)]);
    if (typeof weatherData === 'string') {
        const error = weatherData;
        return error;
    }
    const processedData = {
        location: `${weatherData.location.name}, ${weatherData.location.country}`,
        militaryLocalTime: formatMilitaryLocalTime(weatherData.location.localtime),
        StandardLocalTime: formatStandardLocalTime(weatherData.location.localtime),
        condition: weatherData.current.condition.text,
        tempC: weatherData.current.temp_c + ' °C',
        tempF: weatherData.current.temp_f + ' °F',
        feelsLikeC: `Feels like ${weatherData.current.feelslike_c} °C`,
        feelsLikeF: `Feels like ${weatherData.current.feelslike_f} °F`,
        humidity: `${weatherData.current.humidity}%`,
        windSpeedKPH: `${weatherData.current.wind_kph} km/h`,
        windSpeedMPH: `${weatherData.current.wind_mph} mph`,
        chanceRain: `${forecastData.forecast.forecastday[0].day.daily_chance_of_rain}%`,
        isDay: getDayStatus(weatherData.location.localtime),
    };
    return processedData;
};

// Get weather data
const getWeatherData = async (location) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c81cf0bc1ec1474684580852233011&q=${location}`, { mode: 'cors' });
        const data = await response.json();
        if (data.hasOwnProperty('error')) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        return (error.toString().replace('Error: ', ''));
    }
};

// Get forecast data
const getForecastData = async (location) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c81cf0bc1ec1474684580852233011&q=${location}`, { mode: 'cors' });
        const data = await response.json();
        if (data.hasOwnProperty('error')) {
            throw new Error(data.error.message);
        }
        return data;
    } catch (error) {
        return (error.toString().replace('Error: ', ''));
    }
};

export default processData;
