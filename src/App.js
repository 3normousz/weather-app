import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './searchBar';
import getWeatherData from './weatherService';
import getAirQuality from './airQualityService';
import WeatherSummary from './weatherSummary';


function App() {
  const [city, setCity] = useState(null);
  const [unit, setUnit] = useState("0");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData(city);
      console.log(data);
      //const airquality_data = await getAirQuality(data);
      //console.log(airquality_data);
      //console.log(airquality_data.data.current.pollution.aqius);
      setWeatherData(data);
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
      <WeatherSummary weatherData={weatherData} unitValue={unit} />
    </div>
  );
}

export default App;
