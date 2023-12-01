import "../blocks/ItemModal.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, handleDeleteItem }) => {
  console.log("selectedCard in ItemModal:", selectedCard);
  const currentUser = useContext(CurrentUserContext);

  const isOwner = selectedCard && selectedCard.owner === currentUser._id;

  const imageUrl = selectedCard ? selectedCard.imageUrl : "";

  const itemModalDeleteButton = `${
    isOwner ? "modal__delete-button-visible" : "modal__delete-button_hidden"
  }`;

  const onDeleteClick = () => {
    if (selectedCard) {
      handleDeleteItem(selectedCard);
    } else {
      console.error("Selected card is undefined.");
    }
  };

  return (
    <div className={`item__modal`}>
      <div className="item_modal__content">
        <button
          type="button"
          onClick={onClose}
          className="item_modal__close_button"
        ></button>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={selectedCard.name}
            className="item_modal__item_image"
          />
        )}
        <div className="item_modal__caption">
          <div>
            {selectedCard && (
              <>
                <div className="item_modal__caption_name">
                  {selectedCard.name}
                </div>
                <div className="item_modal__caption_weather">
                  Weather type: {selectedCard.weather}
                </div>
              </>
            )}
          </div>
          <button
            className="item_modal__delete_button"
            type="button"
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
