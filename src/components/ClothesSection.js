import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({ onCreateModal, clothingItems, onCardClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  const userClothingItems = clothingItems.filter(
    (item) => item.owner._id === currentUser._id
  );

  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type="button" onClick={onCreateModal}>
        + Add new
      </button>
      <div className="clothes__items">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectedCard={() => {}}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
