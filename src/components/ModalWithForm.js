import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  name,
  title,
  buttonText,
  isModalOpen,
  handleSubmit,
  handleOverlayClick,
  onClose,
}) => {
  return (
    <div
      className={`modal modal_type_${name} ${
        isModalOpen ? "modal_opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <form className="modal__form" onSubmit={handleSubmit}>
        <button
          className="modal__button-close"
          id="modal-close-button"
          type="button"
          onClick={onClose}
        >
        </button>
        <h2 className="modal__title">{title}</h2>
        <button type="submit" className="modal__button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ModalWithForm;
