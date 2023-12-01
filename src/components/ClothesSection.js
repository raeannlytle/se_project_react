import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({
  onSelectedCard,
  handleCreateModal,
  isLoggedIn,
  onCardLike,
  clothingItems,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentItems = clothingItems.filter((item) => {
    return item.owner === currentUser.data?._id;
  });

  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button
        className="clothes__button"
        type="submit"
        onClick={handleCreateModal}
      >
        + Add new
      </button>
      <div className="clothes__items">
        {currentItems.map((item) => {
          return (
            <ItemCard
              key={item?._id ?? item?.id}
              item={item}
              onSelectedCard={onSelectedCard}
              isLoggedIn={isLoggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ClothesSection;
