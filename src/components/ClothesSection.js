import "../blocks/ClothesSection.css";

function ClothesSection({ onCreateModal }) {
  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type='text' onClick={onCreateModal}>+Add new</button>
    </div>
  );
}

export default ClothesSection;
