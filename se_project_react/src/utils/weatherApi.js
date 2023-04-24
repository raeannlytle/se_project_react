const latitude = 44.34;
const longitude = 10.99;
const APIkey = '7f2ccea786bcf422af97ac05555347aa';

export const getForecastWeather = () => {
  const weatherApi = fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
  .then((res) => {
    if(res.ok) {
      return res.json()
    } else {
        return Promise.reject(`Error: ${res.status}`);
    }
  });
}