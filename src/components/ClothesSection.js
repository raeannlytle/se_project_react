import "../blocks/ClothesSection.css";
import ItemCard from "./ItemCard";
import React from 'react';

function ClothesSection({ onClick, onAddItem, cards }) {

  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type='button' onClick={onAddItem}>+Add new</button>
    </div>
  );
}

export default ClothesSection;
