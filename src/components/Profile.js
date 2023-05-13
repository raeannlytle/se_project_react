import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import ItemCard from "./ItemCard";

function Profile({ handleCardClick, clothingItems, openForm, isModalOpen }) {
  return (
    <div className="profile">
      <div className="profile__section">
        <SideBar />
      </div>
      <div className="profile__clothes">
        <ClothesSection openForm={openForm} />
        <section className="cards">
          <ul className="cards__list">
            {clothingItems.map((card) => (
              <ItemCard
                key={card.id}
                name={card.name}
                url={card.imageUrl}
                id={card.id}
                weather={card.weather}
                handleCardClick={handleCardClick}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Profile;
