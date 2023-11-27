import "../blocks/Header.css";
import headerLogo from "../images/header-logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";

const Header = ({
  onCreateModal,
  weatherLocation,
  onLoginModal,
  onRegisterModal,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : undefined;
  const showAvatar = avatar !== "" ? true : false;
  const username = currentUser.username;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // ... (previous code)

  return (
    <header className="header">
      <div className="header__menu-left">
        <div className="header__logo">
          <Link to="/">
            <div>
              <img src={headerLogo} alt="logo"></img>
            </div>
          </Link>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="header__menu-right">
          <ToggleSwitch />
          <div className="header__menu-buttons">
            <button
              className="header__add-button"
              onClick={onCreateModal}
              type="text"
            >
              + Add Clothes
            </button>
          </div>
          <Link className="header__name" to="/profile">
            {currentUser.username}
          </Link>
          <div>
            {showAvatar ? (
              <img className="header__avatar" src={avatar} alt="avatar" />
            ) : (
              <p className="header__avatar-placeholder">
                {username[0]?.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="header__menu-right">
          <ToggleSwitch />
          <div className="header__menu-buttons">
            <button
              className="header__add-button"
              onClick={onRegisterModal}
              type="text"
            >
              Register
            </button>
            <button
              className="header__add-button"
              onClick={onLoginModal}
              type="text"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
