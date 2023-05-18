import "../blocks/ModalWithForm.css";
import { useState } from 'react';
import closeButton from "../images/close-button.svg";

const ItemModal = ({ itemData, onClose, onDelete }) => {
  const [DeleteConfirm, setDeleteConfirm] = useState(false);

  const handleOpenConfirmModal = () => {
    setDeleteConfirm(true);
  };

  const handleCloseConfirmModal = () => {
    setDeleteConfirm(false);
  };

  const handleDeleteItem = () => {
    onDelete(itemData._id);
    handleCloseConfirmModal();
  };

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
          {DeleteConfirm && (
            <div className="modal__confirm">
              <div className="modal__confirm-content">Are you sure you want to delete this item? This action is irreversible.
              </div>
              <button
                className="modal__button-close"
                onClick={onClose}
              ></button>
              <div className="modal__buttons-confirm">
                <button
                  className="modal__button-confirm"
                  type="button"
                  onClick={handleDeleteItem}
                >
                  Yes, delete item
                </button>
                <button
                  className="modal__button-cancel"
                  type="button"
                  onClick={handleCloseConfirmModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
