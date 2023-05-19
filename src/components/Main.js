import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import React, { useContext, useMemo } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/weatherApi";

function Main({ weatherTemp, onSelectedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];

  const filteredCards = clothingItems.filter((card) => {
    return card.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        Today is {currentTempString} / You may want to wear:
        <div className="card__items">
          {filteredCards?.map((card) => (
            <ItemCard
              key={card._id}
              item={card}
              onSelectedCard={onSelectedCard}
              name={card.name}
              weather={card.weather}
              id={card.id}
              link={card.link}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
