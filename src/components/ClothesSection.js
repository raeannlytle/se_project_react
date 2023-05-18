import "../blocks/ClothesSection.css";

function ClothesSection({ onClick }) {
  const handleAddItem = () => {
    onAdd(handleAddItem);
  }
  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type='text' onClick={handleAddItem}>+Add new</button>
    </div>
  );
}

export default ClothesSection;
