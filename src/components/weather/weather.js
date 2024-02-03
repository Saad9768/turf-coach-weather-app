import React, { useEffect, useState } from "react";
import CurrentWeather from "../current-weather/current-weather";
import ListFavourite from "../list-favourite/list-favourite";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../api";
import Search from "../search/search";

const Weather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weathers, setWeathers] = useState({});

    const fetchWeatherData = async (searchData) => {
        try {
            const [lat, lon] = searchData && searchData.value.split(" ");
            const response = await fetch(
                `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            const weatherResponse = await response.json();
            setCurrentWeather({ city: searchData.label, ...weatherResponse });
        }
        catch (err) {
            console.error(err)
        }
    }

    const fetchLocalStorageData = () => {
        const storedData = localStorage.getItem('weathers');
        setWeathers(JSON.parse(storedData))
    }

    useEffect(() => {
        fetchLocalStorageData()
    }, []);

    const handleOnSearchChange = (searchData) => {
        searchData && fetchWeatherData(searchData)
    };

    return (

        <div>
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather}
                fetchLocalStorageData={fetchLocalStorageData} />}
            {weathers && <ListFavourite weathers={Object.values(weathers)}
                fetchLocalStorageData={fetchLocalStorageData} />}
        </div>
    );
};

export default Weather;