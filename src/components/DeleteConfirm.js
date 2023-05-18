import '../blocks/ModalWithForm.css';

const DeleteConfirm = ({ onClick, OnDelete, itemData, onClose, onCancel }) => {
  const handleDeleteItem = () => {
    OnDelete(itemData._id);
  };

  return (
    <div className="modal modal__confirm">
      <div className="modal__confirm-content">
        Are you sure you want to delete this item? This action is irreversible.
      </div>
      <button className="modal__button-close" onClick={onClose}></button>
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
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;