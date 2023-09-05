const ROOT_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const ROOT_DAILY_TEMP_URL = 'https://api.open-meteo.com/v1/forecast?latitude='
const ROOT_HOURLY_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast?latitude='
const API_KEY = 'c704e95a7a33d01511028b59f66c0345'

export const getWeatherData = (searchParameter) => {
    const url = new URL(ROOT_URL + searchParameter + '&appid=' + API_KEY);
    return fetch(url).then((res) => res.json())
};

export const getDailyTemp = (lat, lon) => {
    const url = new URL(ROOT_DAILY_TEMP_URL + lat + '&longitude=' + lon +
        '&daily=temperature_2m_max,temperature_2m_min&timeformat=unixtime&timezone=auto');
    return fetch(url).then((res) => res.json())
};

export const getHourlyForeCast = (lat, lon) => {
    const url = new URL(ROOT_DAILY_TEMP_URL + lat + '&longitude=' + lon +
        '&hourly=temperature_2m,weathercode&current_weather=true&timeformat=unixtime&timezone=auto');
    return fetch(url).then((res) => res.json())
};

