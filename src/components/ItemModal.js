import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";

const ItemModal = ({ itemData, onClose, handleOpenConfirmModal }) => {
  return (
    <div className="modal">
      <div className="modal__content modal__content_preview">
        <button
          type="button"
          id="modal-close-button"
          onClick={onClose}
          className="modal__button-close"
        >
          <img src={closeButton} alt="close-button" />
        </button>
        <img
          src={itemData?.link || itemData?.imageUrl || ""}
          className="modal__image-preview"
          alt="item-image"
        />
        <div className="modal__text-container">
          <div className="modal__text-preview">
            <div>{itemData?.name}</div>
            <div>Weather type: {itemData?.weather}</div>
          </div>
          <button
            className="modal__button-delete"
            onClick={handleOpenConfirmModal}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
