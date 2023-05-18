import "../blocks/ClothesSection.css";
import ItemCard from "./ItemCard";
import React from 'react';

function ClothesSection({ onClick, onCreateModal, cards }) {

  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type='button' onClick={onCreateModal}>+Add new</button>
    </div>
  );
}

export default ClothesSection;
