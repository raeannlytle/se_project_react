const ItemModal = ({ selectedCard }) => {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <img src={selectedCard.link}/>
        <div>
          Text for the item name 
        </div>
        <div>
          Weather type
        </div>
      </div>
    </div>  
  )
}

export default ItemModal;