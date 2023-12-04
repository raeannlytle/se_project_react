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

export const weatherOptions = [
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
