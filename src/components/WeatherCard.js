import "../blocks/WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";

import sunnyDay from "../images/day/day-sunny.svg";
import cloudyDay from "../images/day/day-cloudy.svg";
import rainyDay from "../images/day/day-rain.svg";
import stormyDay from "../images/day/day-storm.svg";
import snowyDay from "../images/day/day-snow.svg";
import foggyDay from "../images/day/day-fog.svg";
import sunnyNight from "../images/night/night-sunny.svg";
import cloudyNight from "../images/night/night-cloudy.svg";
import rainyNight from "../images/night/night-rain.svg";
import stormyNight from "../images/night/night-storm.svg";
import snowyNight from "../images/night/night-snow.svg";
import foggyNight from "../images/night/night-fog.svg";

const weatherOptions = [
  { url: sunnyDay, day: true, type: "sunny" },
  { url: cloudyDay, day: true, type: "cloudy" },
  { url: rainyDay, day: true, type: "rain" },
  { url: stormyDay, day: true, type: "storm" },
  { url: snowyDay, day: true, type: "snow" },
  { url: foggyDay, day: true, type: "fog" },
  { url: sunnyNight, day: false, type: "sunny" },
  { url: cloudyNight, day: false, type: "cloudy" },
  { url: rainyNight, day: false, type: "rain" },
  { url: stormyNight, day: false, type: "storm" },
  { url: snowyNight, day: false, type: "snow" },
  { url: foggyNight, day: false, type: "fog" },
];

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
