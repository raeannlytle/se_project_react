import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";

const DeleteConfirm = ({ onClick, onDelete, onClose, onCancel }) => {
  const handleDeleteItem = () => {
    onDelete(handleDeleteItem);
  };

  return (
    <div className="modal">
      <div className="modal__confirm-content">
        <div>Are you sure you want to delete this item?</div>
        <div> This action is irreversible.</div>
      </div>
      <button className="modal__confirm-close" onClick={onClose}>
        <img src={closeButton} alt="close-button" />
      </button>
      <div className="modal__buttons-confirm">
        <button
          className="modal__button-confirm"
          type="button"
          onDelete={handleDeleteItem}
        >
          Yes, delete item
        </button>
        <button
          className="modal__button-cancel"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
