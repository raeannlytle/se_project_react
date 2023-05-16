import "../blocks/ItemModal.css";
import closeButton from "../images/close-button.svg";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content modal__content_preview">
        <button
          type="button"
          id="modal-close-button"
          onClick={onClose}
          className="modal__close-"
        >
          <img src={closeButton} alt="close-button" />
        </button>
        <img
          src={selectedCard.link}
          className="modal__image-preview"
          alt="item-image"
        />
        <div className="modal__text-container">
          <div className="modal__preview-text">
            <div>{selectedCard.name}</div>
            <div>Weather type: {selectedCard.weather}</div>
          </div>
          <div className="modal__delete">Delete item</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
