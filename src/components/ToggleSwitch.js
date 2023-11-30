import React, { useState, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/ToggleSwitch.css";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        onClick={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
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
};

export default ToggleSwitch;
