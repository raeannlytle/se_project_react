import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import React, { useEffect, useState } from "react";


function Main({ handleCardClick, weatherData, ClothingItems }) {
  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={weatherData} />
      <section className="card_section" id="card-section">
        Today is {weatherTemp[currentTempUnit]} / You may want to wear:
        <ul className="cards__list" id="cards-list">
          {clothingItems?.map((card) => (
            <ItemCard
              key={card.id}
              url={card.url}
              name={card.name}
              weather={card.weather}
              id={card.id}
              handleCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
