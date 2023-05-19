import { useState, useContext, useEffect } from "react";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import "../blocks/ToggleSwitch.css";

const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
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
