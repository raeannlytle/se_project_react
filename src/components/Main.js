import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { useMemo, useContext } from "react";
import CurrentTempUnitContext from "../utils/CurrenTempUnitContext";
import { temperature } from "../utils/weatherApi";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
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
  const currentTempString = currentTemp[currentTempUnit];

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={weatherTemp} />
      <section className="card_section" id="card-section">
        Today is {currentTempString} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              name={item.name}
              weather={item.weather}
              id={item.id}
              link={item.link}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
