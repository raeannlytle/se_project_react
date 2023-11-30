import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import React from "react";

function Profile({
  onSelectedCard,
  handleCreateModal,
  clothingItems,
  onEditProfileModal,
  isLoggedIn,
  onLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfileModal={onEditProfileModal} onLogout={onLogout} />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        handleCreateModal={handleCreateModal}
        clothingItems={clothingItems}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </div>
  );
}
export default Profile;
