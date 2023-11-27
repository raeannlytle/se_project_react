import React from "react";
import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  onClose,
  onSubmit,
  buttonText,
  isOpen,
}) => {
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
        <form onSubmit={onSubmit}>
          <button className="modal__button-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
