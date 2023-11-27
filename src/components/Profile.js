import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import ItemCard from "./ItemCard";
import "../blocks/ItemCards.css";
import EditProfileModal from "./EditProfileModal";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useContext } from "react";

function Profile({
  items,
  onSelectedCard,
  onCreateModal,
  onSignOut,
  onCardClick,
}) {
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const handleEditProfile = () => {
    setEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <div className="profile">
      <div className="profile__section">
        <SideBar />
      </div>
      <div className="profile__clothes">
        <ClothesSection
          cards={items}
          onCreateModal={onCreateModal}
          onCardClick={onCardClick}
        />
        <section className="cards">
          <ul className="cards__list">
            {items.map((card) => (
              <ItemCard
                key={card._id}
                item={card}
                name={card.name}
                onSelectedCard={onSelectedCard}
                id={card.id}
                weather={card.weather}
                link={card.link}
                onCardClick={onCardClick}
              />
            ))}
          </ul>
        </section>
      </div>
      <button className="profile__edit-button" onClick={handleEditProfile}>
        Edit Profile
      </button>
      <button className="profile__sign-out-button" onClick={handleSignOut}>
        Sign out
      </button>
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={handleCloseEditProfileModal} />
      )}
    </div>
  );
}

export default Profile;
