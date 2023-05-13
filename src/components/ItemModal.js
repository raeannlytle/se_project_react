import "../blocks/ItemModal.css";

const ItemModal = ({
  itemData,
  handleOverlayClick,
  isItemModalOpen,
  isConfirmModalOpen,
  onClose,
  handleDeleteItem,
  openConfirmModal,
  handleConfirmModalClose,
}) => {
  return (
    <div
      className={`modal ${isItemModalOpen ? "modal_opened" : ""}`}
      id="item-modal"
      onClick={handleOverlayClick}
    >
      <div className="item__modal-container">
        <button
          type="button"
          id="modal-close-button"
          onClick={onClose}
          className="modal__button-close"
        ></button>
        <img
          src={itemData?.url}
          className="item__modal-image"
          alt="item-image"
        />
        <p className="modal__caption">{itemData?.name}</p>
        <p className="modal__caption">Weather: {itemData?.weather}</p>
        <button className="modal__button-delete" onClick={openConfirmModal}>
          Delete Item
        </button>
      </div>
      <div
        className={`modal__confirm ${isConfirmModalOpen ? "modal_opened" : ""}`}
        onClick={handleOverlayClick}
      >
        <div className="modal__confirm-container">
          <button
            className="modal__button-close"
            id="modal-confirm-close"
            type="button"
            onClick={handleConfirmModalClose}
          ></button>
          <p className="modal__caption-confirm">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <button
            className="modal__button-confirm"
            onClick={() => {
              handleDeleteItem(itemData.id);
            }}
          >
            Delete Item
          </button>
          <button
            className="modal__button-cancel"
            onClick={handleConfirmModalClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
