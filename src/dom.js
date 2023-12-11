import processData from './api';

// Render data to HTML
const renderData = async (searchBarValue) => {
    const data = await processData(searchBarValue);
    console.log(data);

    document.querySelector('.location').textContent = data.location;
    document.querySelector('.local-time').textContent = data.localTime;
    document.querySelector('.temp').textContent = data.tempC;
    document.querySelector('.condition').textContent = data.condition;
    document.querySelector('.feels-like').textContent = data.feelsLikeC;
    document.querySelector('.chance-rain').textContent = data.chanceRain;
    document.querySelector('.humidity').textContent = data.humidity;
    document.querySelector('.wind-speed').textContent = data.windSpeedKPH;
};

// Search bar handler
const searchBarHandler = (() => {
    const searchBar = document.querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && searchBar.value.trim()) {
            renderData(searchBar.value);
        }
    });
})();

export default renderData;
