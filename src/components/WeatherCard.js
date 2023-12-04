import "../blocks/WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";
import { weatherOptions } from "../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <>
      <section className="weather" id="weather">
        <div className="weather__temp">
          {weatherTemp}° {currentTemperatureUnit}
        </div>
        <div>
          <img src={imageSrcUrl} alt={type} className="weather__image" />
        </div>
      </section>
      <section id="weather__cards"></section>
    </>
  );
};

export default WeatherCard;
