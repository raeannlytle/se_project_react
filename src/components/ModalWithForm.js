import React from "react";
import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  modalName,
  onSubmit,
}) => {

  return (
    <div className={`modal modal-type-${modalName}`}>
      <div className={`modal__content modal-content-${modalName}`}>
        <button
          type="button"
          onClick={onClose}
          className="modal__button-close"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__button-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
