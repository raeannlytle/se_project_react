import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

const ClothesSection = ({
  onCreateModal,
  clothingItems,
  onSelectedCard,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const ownedItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="profile__clothes-section">
      <div className="profile__menu-top">
        <h3 className="profile__menu-title">Your Items:</h3>
        <button
          type="button"
          className="profile__addItems-button"
          onClick={onCreateModal}
        >
          +Add Items
        </button>
      </div>
      <div className="profile__item-list">
        {" "}
        {ownedItems.map((item) => (
          <ItemCard
            key={item.id || item._id}
            item={item}
            onSelectedCard={onSelectedCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
