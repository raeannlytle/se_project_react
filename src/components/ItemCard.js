import "../blocks/ItemCard.css";

const ItemCard = ({ item, onSelectedCard }) => {
  return (
    <div className="card">
      {item && item.link && (
        <img
          src={item.link}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectedCard(item)}
        />
      )}
      <div className="card__name">{item && item.name}</div>
    </div>
  );
};

export default ItemCard;
