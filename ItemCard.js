import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectedCard, onCardClick }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes && item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `like-button ${isLiked ? "liked" : ""}`;
  const handleLikeClick = () => {
    if (onCardClick && typeof onCardClick === "function") {
      onCardClick(item._id);
    }
  };

  return (
    <div className="card">
      {item && item.link && (
        <div>
          <img
            src={item.link}
            alt={item.name}
            className="card__image"
            onClick={() => onSelectedCard(item)}
          />
          {currentUser && (
            <button
              className={itemLikeButtonClassName}
              onClick={handleLikeClick}
            >
              Like
            </button>
          )}
        </div>
      )}
      <div className="card__name">{item && item.name}</div>
    </div>
  );
};

export default ItemCard;
