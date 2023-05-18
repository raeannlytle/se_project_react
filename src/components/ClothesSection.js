import "../blocks/ClothesSection.css";
import React from 'react';

function ClothesSection({ onCreateModal }) {

  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type='button' onClick={onCreateModal}>+Add new</button>
    </div>
  );
}

export default ClothesSection;
