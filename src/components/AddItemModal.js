import React, { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/AddItemModal.css";

export default AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const token = localStorage.getItem("jwt");

  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleImageChange(e) {
    setImageUrl(e.target.value);
  }

  function handleWeatherTypeChange(e) {
    setWeatherType(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ username, imageUrl, weatherType, token });
  }

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Add Garment"
    >
      <div className="modal__labels">
        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            className="modal__input"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <label className="modal__label">
          Image URL
          <input
            type="url"
            name="link"
            placeholder="Image URL"
            minLength="1"
            maxLength="30"
            className="modal__input"
            value={imageUrl}
            onChange={handleImageChange}
          ></input>
        </label>
      </div>
      <p className="modal__paragraph">Select the weather type:</p>
      <div className="modal__radios">
        <div className="modal__radio">
          <input
            className="modal__input-radio"
            type="radio"
            id="hot"
            value="hot"
            onChange={handleWeatherTypeChange}
          ></input>
          <label>Hot</label>
        </div>
        <div className="modal__radio">
          <input
            className="modal__input-radio"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleWeatherTypeChange}
          ></input>
          <label>Warm</label>
        </div>
      </div>
      <div className="modal__radio">
        <input
          className="modal__input-radio"
          type="radio"
          id="cold"
          value="cold"
          onChange={handleWeatherTypeChange}
        ></input>
        <label>Cold</label>
      </div>
    </ModalWithForm>
  );
};
