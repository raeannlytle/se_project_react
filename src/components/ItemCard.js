import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/ItemCard.css";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__likeButton ${
    isLiked ? "card__likeButton-active" : "card__likeButton-inactive"
  }`;

  const handleCardLike = (item) => {
    onCardLike(item, isLiked, currentUser);
  };

  return (
    <div className="card">
      <div className="card_name">{item.name}</div>
      <img
        src={item?.imageUrl || item?.link}
        alt={item.name}
        className="card_image"
        onClick={() => onSelectedCard(item)}
      />
      <div className="card__title">
        <h2 className="card__element">{item.name}</h2>
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
