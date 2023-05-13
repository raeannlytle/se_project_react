import { useContext } from "react";
import CurrentTempUnitContext from "../utils/CurrenTempUnitContext";
import "../blocks/ToggleSwitch.css";

function ToggleSwitch({ name }) {
  const { handleToggleSwitchChange } = useContext(CurrentTempUnitContext);
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        name={name}
        onClick={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider-F"
            : "switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" ? "switch_active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" ? "switch_active" : ""
        }`}
      >
        C
      </p>
    </label>
  );
}
export default ToggleSwitch;
