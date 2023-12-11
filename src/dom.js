import processData from './api';

// Render data to HTML
const renderData = async (searchBarValue) => {
    const data = await processData(searchBarValue);
    document.querySelector('.location').textContent = data.location;
    document.querySelector('.local-time').textContent = data.localTime;
    document.querySelector('.temp').textContent = data.tempC;
    document.querySelector('.condition').textContent = data.condition;
    document.querySelector('.feels-like').textContent = data.feelsLikeC;
    document.querySelector('.chance-rain').textContent = data.chanceRain;
    document.querySelector('.humidity').textContent = data.humidity;
    document.querySelector('.wind-speed').textContent = data.windSpeedKPH;
};

export default renderData;
