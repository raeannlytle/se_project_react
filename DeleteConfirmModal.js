import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";

const DeleteConfirmModal = ({
  handleCloseConfirmModal,
  handleDeleteItem,
  selectedCard,
}) => {
  const handleCancel = () => {
    handleCloseConfirmModal();
  };
  return (
    <div className="modal">
      <div className="modal__confirm-content">
        <div>Are you sure you want to delete this item?</div>
        <div>This action is irreversible.</div>
        <button
          className="modal__confirm-close"
          onClick={handleCloseConfirmModal}
        >
          <img src={closeButton} alt="close-button" />
        </button>
        <div className="modal__buttons-confirm">
          <button
            className="modal__button-confirm"
            type="button"
            onClick={() => handleDeleteItem(selectedCard._id)}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button-cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
