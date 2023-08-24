import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './searchBar';
import { getWeatherData, getDailyTemp, getHourlyForeCast } from './weatherService';
import WeatherSummary from './weatherSummary';


function App() {
  const [city, setCity] = useState(null);
  const [unit, setUnit] = useState("0");

  const [weatherData, setWeatherData] = useState(null);
  const [dailyTempData, setDailyTempData] = useState(null);
  const [hourlyForeCast, setHourlyForeCast] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData(city);
      console.log(data);
      setWeatherData(data);
      const daily_temp = await getDailyTemp(data.coord.lat, data.coord.lon);
      console.log(daily_temp);
      setDailyTempData(daily_temp);
      const hourly_forecast = await getHourlyForeCast(data.coord.lat, data.coord.lon);
      console.log(hourly_forecast);
      setHourlyForeCast(hourly_forecast);
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);


  const handleInputValue = (value) => {
    setCity(value)
  };

  const handleUnitValue = (value) => {
    setUnit(value);
  }


  return (
    <div className="App mx-auto max-w-screen-md mt-4 py-5 px-32">
      <SearchBar onInputValue={handleInputValue} unitValue={handleUnitValue} />
      <WeatherSummary weatherData={weatherData} dailyTempData={dailyTempData} hourlyForeCast={hourlyForeCast} unitValue={unit} />
    </div>
  );
}

export default App;
