import React from "react";
import './App.css';

function WeatherForeCast({ weatherForeCastData }) {

    if (!weatherForeCastData || weatherForeCastData.cod === 404) {
        return null;
    }

    const list = [];
    const max_temp = [];
    for (let i = 0; i < 40; i += 10) {
        for (let j = 0; j < 9; j++) {
            const index = i + j;
            //console.log(weatherForeCastData.list[index]);
            list.push(weatherForeCastData.list[index].main.temp);
        }
        max_temp.push(Math.max.apply(Math, list) - 273.1);
    }
    console.log(max_temp);
    console.log(list);

    return (
        <div>
            <div className='flex items-center justify-center mt-36'>
                <h1 className='text-white text-xl font-bold'>{list}</h1>
            </div>
        </div>
    )
}

export default WeatherForeCast;