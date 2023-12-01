import { checkResponse } from "./api";
import { latitude, longitude, apiKey } from "./utils";

export const getForecastWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
    );
    const data = await checkResponse(response);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};

export const parseLocation = (data) => {
  const weatherLocation = data.name;
  return weatherLocation;
};

