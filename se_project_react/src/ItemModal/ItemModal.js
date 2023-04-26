const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal__content'>
      <button type='button' onClick={onClose} className="modal__button-close-item"></button>
        <img src={selectedCard.link} className="modal__image-preview"/>
        <div className="modal__preview-text">{selectedCard.name}</div>
        <div>Weather: {selectedCard.weather}</div>
      </div>
    </div>  
  )
}

export default ItemModal;