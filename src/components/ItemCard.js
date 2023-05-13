import "../blocks/ItemCard.css";

const ItemCard = ({ handleCardClick, name, url, weather, id }) => {
  return (
    <li
      className="cards"
      onClick={() => handleCardClick(name, url, weather, id)}
    >
      <p className="cards__caption">{name}</p>
      <img className="cards__image" src={url} alt={name}></img>
    </li>
  );
};

export default ItemCard;
