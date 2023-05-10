import "../blocks/ClothesSection.css";

function ClothesSection({ openForm }) {
  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" onClick={openForm}>
        +Add new
      </button>
    </div>
  );
}

export default ClothesSection;
