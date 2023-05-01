import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__button-close"
        />
        <h3 className="modal__title">{title}</h3>
        <form>{children}</form>
        <button type="submit" className="modal__button-submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
