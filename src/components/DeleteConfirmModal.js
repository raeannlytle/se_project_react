import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";

const DeleteConfirmModal = ({
  handleCloseConfirmModal,
  handleDelete,
  selectedCard,
}) => {
  const handleCancel = () => {
    console.log("Cancel button clicked");
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
            onClick={() => {
              console.log("Yes, delete item clicked");
              handleDelete(selectedCard);
              handleCloseConfirmModal();
            }}
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
