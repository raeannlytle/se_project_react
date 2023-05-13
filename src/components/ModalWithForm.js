import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  name,
  title,
  buttonText,
  isModalOpen,
  handleSubmit,
  handleOverlayClick,
  onClose,
  children,
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
          <img src={closeButton} alt="close button"></img>
        </button>
        <h2 className="modal__title">{title}</h2>
        {children}
        <button type="submit" className="modal__button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ModalWithForm;
