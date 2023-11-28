import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/ItemCard.css";
import inactiveLike from "../images/like-button-inactive.svg";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  const contextValue = useContext(CurrentUserContext);

  const { currentUser } = contextValue || {};

  const isLiked =
    currentUser && item.likes.some((_id) => _id === currentUser._id);

  const itemLikeButtonClassName = `card__likeButton ${
    isLiked ? "card__likeButton-active" : "card__likeButton-inactive"
  }`;

  function handleCardLike(item) {
    onCardLike(item, isLiked, currentUser);
  }

  return (
    <div className="card">
      <img
        src={item.imageUrl}
        className="card__image"
        onClick={() => onSelectedCard(item)}
        alt={item.name}
      />
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={() => {
            handleCardLike(item);
          }}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;
