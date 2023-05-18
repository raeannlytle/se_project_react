import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import ItemCard from "./ItemCard";
import "../blocks/ItemCard.css";

function Profile({ items, onSelectedCard, handleCreateModal }) {
  const handleCardClick = () => {
    onSelectedCard();
  };

  return (
    <div className="profile">
      <div className="profile__section">
        <SideBar />
      </div>
      <div className="profile__clothes">
        <ClothesSection
          cards={items}
          onCardClick={handleCardClick}
          onCreateModal={handleCreateModal}
        />
        <section className="cards">
          <ul className="cards__list">
            {items.map((card) => (
              <ItemCard
                key={card.id}
                item={card}
                name={card.name}
                onSelectedCard={onSelectedCard}
                id={card.id}
                weather={card.weather}
                link={card.link}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Profile;
