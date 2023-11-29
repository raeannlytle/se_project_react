import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/ItemCard.css";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((_id) => _id === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button-active" : "card__like-button-inactive"
  }`;

  const handleCardLike = (item) => {
    onCardLike(item, isLiked, currentUser);
  };

  return (
    <div className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onSelectedCard(item)}
      />
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={() => handleCardLike(item)}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;
