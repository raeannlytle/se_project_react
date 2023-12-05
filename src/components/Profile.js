import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import React from "react";

function Profile({
  currentUser,
  onSelectedCard,
  handleCreateModal,
  clothingItems,
  onEditProfileModal,
  isLoggedIn,
  onLogout,
  handleLikeClick
}) {
  return (
    <div className="profile">
      <SideBar
        onEditProfileModal={onEditProfileModal}
        onLogout={onLogout}
        currentUser={currentUser}
      />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        handleCreateModal={handleCreateModal}
        clothingItems={clothingItems}
        isLoggedIn={isLoggedIn}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
}
export default Profile;
