import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({ itemData, onClose, handleOpenConfirmModal }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = itemData && itemData.owner && itemData.owner._id === currentUser?._id;

  const itemDeleteButtonClassName = `modal__button-delete ${
    isOwn ? "modal__button-delete_visible" : "modal__button-delete_hidden"
  }`;

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
            className={itemDeleteButtonClassName}
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
