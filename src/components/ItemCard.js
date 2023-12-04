import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/ItemCard.css";
import "../blocks/ItemCards.css";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      setIsLiked(item.likes.some((id) => id === currentUser._id));
    }
  }, [item.likes, currentUser]);

  const itemLikeButtonClassName = `card__likeButton ${
    isLiked ? "card__likeButton-active" : "card__likeButton-inactive"
  }`;

  const handleCardLike = () => {
    if (currentUser && currentUser._id) {
      setIsLiked(!isLiked);
      onCardLike(item);
    }
  };

  return (
    <div className="card">
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
          onClick={handleCardLike}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;

