import React from "react";
import './App.css';

function WeatherSummary({ weatherData, unitValue }) {


    if (!weatherData) {
        return null;
    }

    const { name, sys, main, weather } = weatherData;
    weather[0].description = weather[0].description[0].toUpperCase() + weather[0].description.substr(1);

    function kelvin_to_unit(temp, unitValue) {
        switch (unitValue) {
            case "0":
                return Math.floor(temp - 273.15);
            case "1":
                return Math.floor((temp - 273.15) * 9 / 5 + 32)
            default:
                return Math.floor(temp - 273.15);
        }
    }
    return (
        <div>

            <div className='flex items-center justify-center mt-16'>
                <img alt="weather-icon" src="" />
            </div>

            <div className='flex items-center justify-center'>
                <h1 className='text-white text-xl font-bold'>{name}, {sys.country}</h1>
            </div>
            <div className='flex items-center justify-center'>
                <p className='text-white text-4xl font-bold'>{kelvin_to_unit(main.temp, unitValue)}</p>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <p className='text-white text-lg'>{weather[0].description}</p>
            </div>
        </div>
        /*
        <div>
            <div class="px-6 py-4">
                <img className="object-cover" src='PartlyCloudy-night_2.jpg' />
                <div class="font-bold text-xl mb-2 text-white">The Coldest Sunset</div>
                <p class="text-white text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
        </div >*/
    )
}

export default WeatherSummary;