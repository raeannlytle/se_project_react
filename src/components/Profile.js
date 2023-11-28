import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import React, { useState, useContext } from "react";

const Profile = ({
  onCreateModal,
  clothingItems,
  onSelectedCard,
  onEditProfileModal,
  onLogout,
  onCardLike,
}) => {
  return (
    <section className="profile">
      <div className="profile__section">
        <SideBar onEditProfileModal={onEditProfileModal} onLogout={onLogout} />
      </div>
      <ClothesSection
        onSelectedCard={onSelectedCard}
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        onCardLike={onCardLike}
      />
    </section>
  );
};

export default Profile;
