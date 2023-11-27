import "../blocks/ModalWithForm.css";
import "../blocks/ItemModal.css";
import closeButton from "../images/close-button.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt");
  const isOwn = selectedCard.owner === currentUser._id;
  const itemDeleteButtonClassName = `${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  function handleDeleteItem() {
    onDeleteItem(selectedCard._id, token);
  }

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
          src={selectedCard.imageUrl}
          className="modal__image-preview"
          alt={selectedCard.name}
        />
        <div className="modal__text-container">
          <div className="modal__text-preview">
            <div>{selectedCard.name}</div>
            <div>Weather type: {selectedCard.weather}</div>
          </div>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDeleteItem}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
