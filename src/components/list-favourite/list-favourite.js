import React from "react";
import "./list-favourite.css";
import CurrentWeather from "../current-weather/current-weather";

const ListFavourite = ({ weathers, fetchLocalStorageData }) => {
    return (
        <ul class="gridContainer">
            {weathers.filter(({ isFavourite }) => isFavourite).map((weather) => (
                <li>
                    <CurrentWeather data={weather} fetchLocalStorageData={fetchLocalStorageData} />
                </li>
            ))}
        </ul>
    );
};

export default ListFavourite;
