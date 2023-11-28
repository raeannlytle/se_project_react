import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/SideBar.css";

function SideBar({ onEditProfileModal, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="profile__sidebar">
      <div className="profile__sidebar-avatar-name">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt={currentUser.username}
        ></img>
        <div className="profile__name">{currentUser.username}</div>
      </div>
      <div className="profile__sidebar-button-container">
        <button
          type="button"
          className="profile__sidebar-button"
          onClick={onEditProfileModal}
        >
          Edit Profile
        </button>
        <button
          className="profile__sidebar-button"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
