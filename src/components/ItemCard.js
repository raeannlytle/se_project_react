import "../blocks/ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card__container">
      <img
        src={item.link}
        className="card_image"
        onClick={() => onSelectCard(item)}
      />
      <div className="card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
