import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/AddItemModal.css";

export default function AddItemModal({ handleCloseModal, onAddItem, isOpen }) {
  const token = localStorage.getItem("jwt");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImageUrl(e.target.value);
  }

  function handleWeatherType(e) {
    setWeatherType(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weatherType, token });
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <div className="modal__labels">
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="3000"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input"
            type="url"
            name="link"
            minLength="1"
            placeholder="Image Url"
            onChange={handleImageChange}
            value={imageUrl}
          />
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
            onChange={handleWeatherType}
          />
          <label>Hot</label>
        </div>
        <div className="modal__radio">
          <input
            className="modal__input-radio"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleWeatherType}
          />
          <label>Warm</label>
        </div>
        <div className="modal__radio">
          <input
            className="modal__input-radio"
            type="radio"
            id="cold"
            value="cold"
            onChange={handleWeatherType}
          />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
}
