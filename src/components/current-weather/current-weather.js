import React from "react";
import "./current-weather.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CurrentWeather = ({ data, fetchLocalStorageData }) => {
  const handleOnClickFavourite = (weather) => {
    weather.isFavourite = !weather.isFavourite
    let storedData = localStorage.getItem('weathers') || null
    storedData = storedData ? JSON.parse(storedData) : {}
    storedData[weather.city] = weather
    localStorage.setItem('weathers', JSON.stringify(storedData));
    fetchLocalStorageData()
  };
  return (
    <div className="weather">
      <span onClick={() => handleOnClickFavourite(data)} >
        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
      </span>
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
