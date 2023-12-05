import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/ItemCard.css";
import "../blocks/ItemCards.css";

const ItemCard = ({ item, onSelectedCard, handleLikeClick, isLoggedIn}) => {
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

  const handleCardClick = () => {
    onSelectedCard(item);
  };
  const onLikeClick = () => {
    setIsLiked(!isLiked);
    handleLikeClick({ id: item._id, isLiked: isLiked });
  };

  return (
    <div className="card">
      <img
        src={item?.imageUrl || item?.link}
        alt={item.name}
        className="card_image"
        onClick={handleCardClick}
      />
      <div className="card__title">
        <h2 className="card__element">{item.name}</h2>
        {isLoggedIn ? (
          <button
            className={itemLikeButtonClassName}
            onClick={onLikeClick}
          ></button>
        ) : null}
      </div>
    </div>
  );
};

export default ItemCard;
