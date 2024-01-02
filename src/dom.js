import processData from './api';

// Render data to HTML
const renderData = async (searchBarValue) => {
    loader.show();
    const data = await processData(searchBarValue);
    if (typeof data === 'string') {
        error.show(data);
        return;
    }
    setTimeout(() => {
        loader.hide();
        console.log(data); // Need to remove after testing
        document.querySelector('.location').textContent = data.location;
        document.querySelector('.condition').textContent = data.condition;
        document.querySelector('.chance-rain').textContent = data.chanceRain;
        document.querySelector('.humidity').textContent = data.humidity;
        if (units.getSystem() === 'SI') {
            document.querySelector('.local-time').textContent = data.militaryLocalTime;
            document.querySelector('.temp').textContent = data.tempC;
            document.querySelector('.feels-like').textContent = data.feelsLikeC;
            document.querySelector('.wind-speed').textContent = data.windSpeedKPH;
        } else if (units.getSystem() === 'US') {
            document.querySelector('.local-time').textContent = data.StandardLocalTime;
            document.querySelector('.temp').textContent = data.tempF;
            document.querySelector('.feels-like').textContent = data.feelsLikeF;
            document.querySelector('.wind-speed').textContent = data.windSpeedMPH;
        }
        weatherIcon.setIcon(data.isDay, data.condition);
        previousSearch.setValue(searchBarValue);
    }, 500);
};

// Search bar handler
const searchBarHandler = (() => {
    const searchBar = document.querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && searchBar.value.trim()) {
            renderData(searchBar.value);
        }
    });
    const searchBarIcon = document.querySelector('svg.search-icon');
    searchBarIcon.addEventListener('click', () => {
        if (searchBar.value.trim()) {
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
    const siButton = document.querySelector('button.SI');
    const usButton = document.querySelector('button.US');
    siButton.addEventListener('click', () => {
        siButton.classList.add('active');
        usButton.classList.remove('active');
        setSystemSI();
        renderData(previousSearch.getValue());
    });
    usButton.addEventListener('click', () => {
        usButton.classList.add('active');
        siButton.classList.remove('active');
        setSystemUS();
        renderData(previousSearch.getValue());
    });
    return { getSystem };
};

// Weather icon handler
const weatherIconHandler = () => {
    const weatherPath = document.querySelector('svg.weather-icon > path');
    const setIcon = (isDay, condition) => {
        if (isDay === true && condition.includes('rain')) {
            weatherPath.setAttribute('d', 'M12.75,4.47C15.1,5.5 16.35,8.03 15.92,10.46C17.19,11.56 18,13.19 18,15V15.17C18.31,15.06 18.65,15 19,15A3,3 0 0,1 22,18A3,3 0 0,1 19,21H17C17,21 16,21 16,20C16,19 17,19 17,19H19A1,1 0 0,0 20,18A1,1 0 0,0 19,17H16V15A4,4 0 0,0 12,11A4,4 0 0,0 8,15H6A2,2 0 0,0 4,17A2,2 0 0,0 6,19H7C7,19 8,19 8,20C8,21 7,21 7,21H6A4,4 0 0,1 2,17A4,4 0 0,1 6,13H6.27C5,11.45 4.6,9.24 5.5,7.25C6.72,4.5 9.97,3.24 12.75,4.47M11.93,6.3C10.16,5.5 8.09,6.31 7.31,8.07C6.85,9.09 6.93,10.22 7.41,11.13C8.5,9.83 10.16,9 12,9C12.7,9 13.38,9.12 14,9.34C13.94,8.06 13.18,6.86 11.93,6.3M13.55,2.63C13,2.4 12.45,2.23 11.88,2.12L14.37,0.82L15.27,3.71C14.76,3.29 14.19,2.93 13.55,2.63M6.09,3.44C5.6,3.79 5.17,4.19 4.8,4.63L4.91,1.82L7.87,2.5C7.25,2.71 6.65,3.03 6.09,3.44M18,8.71C17.91,8.12 17.78,7.55 17.59,7L19.97,8.5L17.92,10.73C18.03,10.08 18.05,9.4 18,8.71M3.04,10.3C3.11,10.9 3.25,11.47 3.43,12L1.06,10.5L3.1,8.28C3,8.93 2.97,9.61 3.04,10.3M12,18.91C12.59,19.82 13,20.63 13,21A1,1 0 0,1 12,22A1,1 0 0,1 11,21C11,20.63 11.41,19.82 12,18.91M12,15.62C12,15.62 9,19 9,21A3,3 0 0,0 12,24A3,3 0 0,0 15,21C15,19 12,15.62 12,15.62Z');
        } else if (isDay === false && condition.includes('rain')) {
            weatherPath.setAttribute('d', 'M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z');
        } else if (isDay === true && !condition.includes('rain')) {
            weatherPath.setAttribute('d', 'M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z');
        } else if (isDay === false && !condition.includes('rain')) {
            weatherPath.setAttribute('d', 'M22,10.28C21.74,10.3 21.5,10.31 21.26,10.31C19.32,10.31 17.39,9.57 15.91,8.09C14.25,6.44 13.5,4.19 13.72,2C13.77,1.53 13.22,1 12.71,1C12.57,1 12.44,1.04 12.32,1.12C12,1.36 11.66,1.64 11.36,1.94C9.05,4.24 8.55,7.66 9.84,10.46C8.31,11.11 7.13,12.43 6.69,14.06L6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22H19A3,3 0 0,0 22,19A3,3 0 0,0 19,16C18.42,16 17.88,16.16 17.42,16.45L17.5,15.5C17.5,15.28 17.5,15.05 17.46,14.83C19.14,14.67 20.77,13.94 22.06,12.64C22.38,12.34 22.64,12 22.88,11.68C23.27,11.13 22.65,10.28 22.04,10.28M19,18A1,1 0 0,1 20,19A1,1 0 0,1 19,20H6A2,2 0 0,1 4,18A2,2 0 0,1 6,16H8.5V15.5C8.5,13.94 9.53,12.64 10.94,12.18C11.1,12.13 11.26,12.09 11.43,12.06C11.61,12.03 11.8,12 12,12C12.23,12 12.45,12.03 12.66,12.07C12.73,12.08 12.8,12.1 12.87,12.13C13,12.16 13.15,12.2 13.28,12.25C13.36,12.28 13.44,12.32 13.5,12.36C13.63,12.41 13.74,12.47 13.84,12.54C13.92,12.59 14,12.64 14.07,12.7C14.17,12.77 14.25,12.84 14.34,12.92C14.41,13 14.5,13.05 14.55,13.12C14.63,13.2 14.69,13.29 14.76,13.37C14.82,13.45 14.89,13.53 14.94,13.62C15,13.71 15.04,13.8 15.09,13.9C15.14,14 15.2,14.08 15.24,14.18C15.41,14.59 15.5,15.03 15.5,15.5V18M16.83,12.86C15.9,11.16 14.08,10 12,10H11.87C11.41,9.19 11.14,8.26 11.14,7.29C11.14,6.31 11.39,5.37 11.86,4.55C12.21,6.41 13.12,8.14 14.5,9.5C15.86,10.88 17.58,11.79 19.45,12.14C18.66,12.6 17.76,12.84 16.83,12.86Z');
        } else if (isDay === true) {
            weatherPath.setAttribute('d', 'M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z');
        } else if (isDay === false) {
            weatherPath.setAttribute('d', 'M22,10.28C21.74,10.3 21.5,10.31 21.26,10.31C19.32,10.31 17.39,9.57 15.91,8.09C14.25,6.44 13.5,4.19 13.72,2C13.77,1.53 13.22,1 12.71,1C12.57,1 12.44,1.04 12.32,1.12C12,1.36 11.66,1.64 11.36,1.94C9.05,4.24 8.55,7.66 9.84,10.46C8.31,11.11 7.13,12.43 6.69,14.06L6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22H19A3,3 0 0,0 22,19A3,3 0 0,0 19,16C18.42,16 17.88,16.16 17.42,16.45L17.5,15.5C17.5,15.28 17.5,15.05 17.46,14.83C19.14,14.67 20.77,13.94 22.06,12.64C22.38,12.34 22.64,12 22.88,11.68C23.27,11.13 22.65,10.28 22.04,10.28M19,18A1,1 0 0,1 20,19A1,1 0 0,1 19,20H6A2,2 0 0,1 4,18A2,2 0 0,1 6,16H8.5V15.5C8.5,13.94 9.53,12.64 10.94,12.18C11.1,12.13 11.26,12.09 11.43,12.06C11.61,12.03 11.8,12 12,12C12.23,12 12.45,12.03 12.66,12.07C12.73,12.08 12.8,12.1 12.87,12.13C13,12.16 13.15,12.2 13.28,12.25C13.36,12.28 13.44,12.32 13.5,12.36C13.63,12.41 13.74,12.47 13.84,12.54C13.92,12.59 14,12.64 14.07,12.7C14.17,12.77 14.25,12.84 14.34,12.92C14.41,13 14.5,13.05 14.55,13.12C14.63,13.2 14.69,13.29 14.76,13.37C14.82,13.45 14.89,13.53 14.94,13.62C15,13.71 15.04,13.8 15.09,13.9C15.14,14 15.2,14.08 15.24,14.18C15.41,14.59 15.5,15.03 15.5,15.5V18M16.83,12.86C15.9,11.16 14.08,10 12,10H11.87C11.41,9.19 11.14,8.26 11.14,7.29C11.14,6.31 11.39,5.37 11.86,4.55C12.21,6.41 13.12,8.14 14.5,9.5C15.86,10.88 17.58,11.79 19.45,12.14C18.66,12.6 17.76,12.84 16.83,12.86Z');
        }
    };
    return { setIcon };
};

// Loader handler
const loaderHandler = () => {
    const show = () => {
        document.querySelector('.content').style.display = 'none';
        document.querySelector('.loader').hidden = false;
        document.querySelector('.error').hidden = true;
    };
    const hide = () => {
        document.querySelector('.content').removeAttribute('style');
        document.querySelector('.loader').hidden = true;
    };
    return { show, hide };
};

// Error handler
const errorHandler = () => {
    const show = (error) => {
        document.querySelector('.loader').hidden = true;
        document.querySelector('.error').hidden = false;
        document.querySelector('.error').textContent = error;
    };
    return { show };
};

// Initialization
const previousSearch = previousSearchHandler();
const units = unitsHandler();
const weatherIcon = weatherIconHandler();
const loader = loaderHandler();
const error = errorHandler();

export default renderData;
