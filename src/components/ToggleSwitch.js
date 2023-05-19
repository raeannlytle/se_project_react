import { useState, useContext, useEffect } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/ToggleSwitch.css";

const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTempUnit === "C");
  useEffect(() => setIsChecked(currentTempUnit === "C"), [currentTempUnit]);

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        onClick={handleToggleSwitchChange}
      />
      <span
        className={
          currentTempUnit === "F" ? "switch__slider-F" : "switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" ? "switch_active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" ? "switch_active" : ""
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
