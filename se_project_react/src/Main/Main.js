import { defaultClothingItems } from "../utils/constants";
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import './Main.css';

function Main({ weatherTemp, onSelectCard }) {
  if (weatherTemp >= 86) {
    return 'hot';
  } else if (weatherTemp >= 66 && weatherTemp <= 85) {
    return 'warm';
  } else if (weatherTemp <= 65) {
    return 'cold';
  }

  return (
  <main className='main'>
    <WeatherCard day={false} type='rain' weatherTemp={weatherTemp} />
      <section className='card_section' id='card-section'>
        Today is {weatherTemp} / You may want to wear:
        <div className='card_items'>
          {defaultClothingItems.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard}/>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
