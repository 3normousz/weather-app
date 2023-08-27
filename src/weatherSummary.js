import React from "react";
import './App.css';

function WeatherSummary({ weatherData, dailyTempData, hourlyForeCast, unitValue }) {


    if (!weatherData || !dailyTempData || !hourlyForeCast) {
        return null;
    }

    const { name, sys, main, weather } = weatherData;
    weather[0].description = weather[0].description[0].toUpperCase() + weather[0].description.substr(1);

    function kelvin_to_unit(temp, unitValue) {
        switch (unitValue) {
            case 0:
                return Math.floor(temp - 273.15);
            case 1:
                return Math.floor((temp - 273.15) * 9 / 5 + 32)
            default:
                return Math.floor(temp - 273.15);
        }
    }
    function celsius_to_unit(temp, unitValue) {
        switch (unitValue) {
            case 0:
                return Math.floor(temp);
            case 1:
                return Math.floor(temp * 9 / 5 + 32);
            default:
                return Math.floor(temp);
        }
    }
    function unitDisplay(unitValue) {
        switch (unitValue) {
            case 0:
                return "°C";
            case 1:
                return "°F";
            default:
                return "°C";
        }
    }
    function getCurrentTimeStampIndex(hourlyForeCast) {
        let cnt = 0;
        while (hourlyForeCast.current_weather.time != hourlyForeCast.hourly.time[cnt]) {
            cnt++;
        }
        return cnt;
    };

    function ForeCastComponent(props) {
        let dateElement = null;

        if (props.timestamp.substring(11, 17) === "00:00") {
            dateElement = <div className="font-bold text-l mb-2">{props.timestamp.substring(6, 10)}</div>;
        } else {
            dateElement = <div className="font-bold text-l mb-2">&nbsp;</div>;
        }

        return (
            <div className="px-6 py-6">
                {dateElement}
                <div className="font-bold text-xl">{props.timestamp.substring(11, 17)}</div>
                <img alt="weather-icon" src={`icons/${props.weatherIconID}.png`} />
                <div className="text-white text-base mt-1">
                    {celsius_to_unit(props.temp, unitValue)} {unitDisplay(unitValue)}
                </div>
            </div>
        );
    };


    function componentsArray() {
        let arr = [];
        for (let i = getCurrentTimeStampIndex(hourlyForeCast); i <= 167; i++) {
            let hourly = hourlyForeCast.hourly;
            arr.push(<ForeCastComponent key={i} timestamp={hourly.time[i]}
                temp={hourly.temperature_2m[i]}
                weatherIconID={convertWeatherIcon(hourly.weathercode[i])}
            />);
        }
        return arr;
    };

    function convertWeatherIcon(api1Code) {
        const api1ToApi2Mapping = {
            "0": "01d",  // Clear sky
            "1": "02d", // Few clouds
            "2": "02d",
            "3": "02d",
            "45": "50d", // Fog
            "48": "50d",
            "51": "09d", // Shower rain
            "53": "09d",
            "55": "09d",
            "61": "10d", // Rain
            "63": "10d",
            "65": "10d",
            "80": "09d", // Shower rain
            "81": "09d",
            "82": "09d",
            "95": "11d", // Thunderstorm
            "96": "11d",
            "99": "11d",
        };
        return api1ToApi2Mapping[api1Code];
    };

    return (
        <div>
            <div className='flex items-center justify-center mt-16'>
                <img alt="weather-icon" src={`icons/${weather[0].icon}.png`} />
            </div>

            <div className='flex items-center justify-center'>
                <h1 className='text-white text-xl font-bold'>{name}, {sys.country}</h1>
            </div>
            <div className='flex items-center justify-center'>
                <p className='text-white text-4xl font-bold'>{kelvin_to_unit(main.temp, unitValue)} {unitDisplay(unitValue)}</p>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <p className='text-white text-lg'>{weather[0].description}</p>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <p className='text-white text-lg'>
                    High: {Math.floor(dailyTempData.daily.temperature_2m_max[0])} {unitDisplay(unitValue)} |
                    Low: {Math.floor(dailyTempData.daily.temperature_2m_min[0])} {unitDisplay(unitValue)}
                </p>
            </div>
            <div className="overflow-hidden">
                <div className="flex flex-row rounded overflow-x-auto text-white shadow-lg mt-6 bg-gray-500">
                    {componentsArray()}
                </div>
            </div>
        </div>
    )
}

export default WeatherSummary;