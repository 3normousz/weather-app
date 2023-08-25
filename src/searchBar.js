import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { dbCityOptions, DB_CITY_URL } from "./dbCityService";
import './App.css';

function SearchBar({ onInputValue, unitValue }) {

  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState("°C");

  const handleChange = (selectedOption) => {
    setLocation(selectedOption);
    onInputValue(selectedOption.value);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    unitValue(newUnit);
  };

  const loadOptions = async (location) => {
    try {
      const response = await fetch(`${DB_CITY_URL}places?limit=5&offset=0&types=CITY&namePrefix=${location}&minPopulation=50000`, dbCityOptions);
      const responseData = await response.json();
      console.log(responseData);
      const options = responseData.data.map((city) => ({
        value: `${city.name}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return { options }; // Wrap the options array in a top-level object

    } catch (err) {
      console.error(err);
      return { options: [] }; // Return an empty options array in case of an error
    }
  };

  return (
    <div className="search-box flex flex-col sm:flex-row justify-center my-6">
      <AsyncPaginate
        className="search-bar w-full sm:w-72 mb-4 sm:mb-0 sm:mr-2"
        value={location}
        onChange={handleChange}
        debounceTimeout={1000}
        loadOptions={loadOptions}
        type="text"
        placeholder="Search City"
      />
      <div className="flex flex-row justify-center">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => handleUnitChange(0)}
        >
          °C
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => handleUnitChange(1)}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default SearchBar;