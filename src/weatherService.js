const ROOT_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'c704e95a7a33d01511028b59f66c0345'

const getWeatherData = (searchParameter) => {
    const url = new URL(ROOT_URL + searchParameter + '&appid=' + API_KEY);
    return fetch(url).then((res) => res.json())
};

export default getWeatherData;
