import React from "react";
import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  onSubmit,
  onRegister,
  onLogin,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__button-close"
        ></button>
        <h3 className="modal__title">{title}</h3>
        {children}
        <form onSubmit={handleSubmit}>
          <button className="modal__button-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
