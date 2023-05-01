import "../blocks/ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="item__modal">
      <div className="item__modal-container">
        <button
          type="button"
          onClick={onClose}
          className="modal__button-close"
        ></button>
        <img src={selectedCard.link} className="item__modal-image" />
        <div className="item__modal-caption">
          <div>{selectedCard.name}</div>
          <div>Weather: {selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
