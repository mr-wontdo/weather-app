import processData from './api';

// Render data to HTML
const renderData = async (searchBarValue) => {
    const data = await processData(searchBarValue);
    console.log(data); // Need to remove after testing
    document.querySelector('.location').textContent = data.location;
    document.querySelector('.local-time').textContent = data.localTime;
    document.querySelector('.condition').textContent = data.condition;
    document.querySelector('.chance-rain').textContent = data.chanceRain;
    document.querySelector('.humidity').textContent = data.humidity;
    if (units.getSystem() === 'SI') {
        document.querySelector('.temp').textContent = data.tempC;
        document.querySelector('.feels-like').textContent = data.feelsLikeC;
        document.querySelector('.wind-speed').textContent = data.windSpeedKPH;
    } else if (units.getSystem() === 'US') {
        document.querySelector('.temp').textContent = data.tempF;
        document.querySelector('.feels-like').textContent = data.feelsLikeF;
        document.querySelector('.wind-speed').textContent = data.windSpeedMPH;
    }
    previousSearch.setValue(searchBarValue);
    document.querySelector('input').value = '';
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

// Previous search handler
const previousSearchHandler = () => {
    let previousSearchValue = null;
    const getValue = () => previousSearchValue;
    const setValue = (searchBarValue) => {
        previousSearchValue = searchBarValue;
    };
    return { getValue, setValue };
};

// Units handler
const unitsHandler = () => {
    let system = 'SI';
    const getSystem = () => system;
    const setSystemSI = () => {
        system = 'SI';
    };
    const setSystemUS = () => {
        system = 'US';
    };
    document.querySelector('button.SI').addEventListener('click', () => {
        setSystemSI();
        renderData(previousSearch.getValue());
    });
    document.querySelector('button.US').addEventListener('click', () => {
        setSystemUS();
        renderData(previousSearch.getValue());
    });
    return { getSystem };
};

// Initialization
const previousSearch = previousSearchHandler();
const units = unitsHandler();

export default renderData;
