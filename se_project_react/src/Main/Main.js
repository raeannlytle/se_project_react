import { defaultClothingItems } from "../utils/constants";

function Main() {
    return <main className='main'>
      <WeatherCard day={false} type='rain' weatherTemp={weatherTemp} />
      <section className='card_section' id='card-section'>
        Today is {weatherTemp} / You may want to wear:
        <div className='card_items'>
          {defaultClothingItems.map((item) => (
            <ItemCard item={item} />
          ))}
        </div>
      </section>
    </main>;
  }

export default Main;
