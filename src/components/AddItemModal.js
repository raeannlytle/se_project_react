import "../blocks/AddItemModal.css";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import React, { useEffect, useState } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

function AddItemModal({ onClose, isModalOpen, handleOverlayClick, onAddItem }) {
  const [nameInputValue, setNameInputValue] = useState("");
  const [linkInputValue, setLinkInputValue] = useState("");
  const [weatherType, setWeatherType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(nameInputValue, linkInputValue, weatherType);
  }

  useEffect(() => {
    function clearInputs() {
      setNameInputValue("");
      setLinkInputValue("");
      setWeatherType("");
    }
    if (isModalOpen) {
      clearInputs();
    }
  }, [isModalOpen]);

  return (
    <ModalWithForm
      name="add-item-form"
      title="New Items:"
      buttonText="Add Garment"
      onClose={onClose}
      isModalOpen={isModalOpen}
      handleSubmit={handleSubmit}
      handleOverlayClick={handleOverlayClick}
      onAddItem={onAddItem}
    >
      <fieldset className="form__fieldset" id="input-fieldset">
        <p className="form__caption">Name</p>
        <input
          type="text"
          className="form__input"
          placeholder="name"
          minLenth="1"
          maxLength="50"
          required
          id="name-input"
          value={nameInputValue}
          onChange={(e) => {
            setNameInputValue(e.target.value);
          }}
        ></input>
        <p className="form__caption">Image</p>
        <input
          type="url"
          className="form__input"
          placeholder="Image URL"
          minLength="1"
          maxLength="100"
          required
          id="link-input"
          value={linkInputValue}
          onChange={(e) => {
            setLinkINputValue(e.target.value);
          }}
        ></input>
      </fieldset>
      <h3 className="form__title" id="weather-type-title">
        Select the weather type:
      </h3>
      <fieldset className="form__fieldset" id="radio-button-fieldset">
        <label className="form__label">
          <input
            type="radio"
            className="form__input"
            name="temperature"
            value="Hot"
            onChange={(e) => setWeatherType(e.target.value)}
          >
            Hot
          </input>
        </label>
        <label className="form__label">
          <input
            type="radio"
            className="form__input"
            name="temperature"
            value="Cold"
            onChange={(e) => setWeatherType(e.target.value)}
          >
            Cold
          </input>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;