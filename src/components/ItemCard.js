import "../blocks/ItemCard.css";

const ItemCard = ({ name, weather, id, _id, item, onSelectedCard }) => {
  return (
    <div className="card">
      {item && item.link && (
        <img
          src={item.link}
          className="card__image"
          onClick={() => onSelectedCard(item, name, weather, _id, id)}
        />
      )}
      <div className="card__name">{item && item.name}</div>
    </div>
  );
};

export default ItemCard;
