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

    function getTimeStamp(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);

        var hours = date.getHours();

        var minutes = "0" + date.getMinutes();

        var formattedTime = hours + ':' + minutes;

        return [formattedTime, date.getDate(), date.getMonth() + 1];
    }

    function getCurrentTimeStampIndex(hourlyForeCast) {
        let left = 0;
        let right = 26;
        let mid = 0;

        while (left <= right) {
            mid = Math.floor(left + (right - left) / 2);
            if (hourlyForeCast.current_weather.time == hourlyForeCast.hourly.time[mid]) {
                return mid;
            }
            if (hourlyForeCast.hourly.time[mid] < hourlyForeCast.current_weather.time) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
    };

    function HourlyForeCastComponent(props) {
        let dateElement = null;


        if (getTimeStamp(props.timestamp)[0] === "0:00") {
            dateElement = <div className="font-bold text-l">{getTimeStamp(props.timestamp)[1]}/{getTimeStamp(props.timestamp)[2]}</div>;
        } else {
            dateElement = <div className="font-bold text-l">&nbsp;</div>;
        }


        return (
            <div className="px-6 py-2">
                {dateElement}
                <div className="font-bold text-xl">{getTimeStamp(props.timestamp)[0]}</div>
                <img alt="weather-icon" src={`icons/${props.weatherIconID}.png`} />
                <div className="text-white text-base mt-1">
                    {celsius_to_unit(props.temp, unitValue)} {unitDisplay(unitValue)}
                </div>
            </div>
        );
    };


    function hourlyForeCastComponentCreation() {
        let arr = [];
        for (let i = getCurrentTimeStampIndex(hourlyForeCast); i <= 167; i++) {
            let hourly = hourlyForeCast.hourly;
            arr.push(<HourlyForeCastComponent key={i} timestamp={hourly.time[i]}
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
            <div className='flex items-center justify-center mt-10'>
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
                    {hourlyForeCastComponentCreation()}
                </div>
            </div>
        </div>
    )
}

export default WeatherSummary;