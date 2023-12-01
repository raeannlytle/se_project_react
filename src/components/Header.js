// Header.js
import React from "react";
import "../blocks/Header.css";
import headerLogo from "../images/header-logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({
  handleCreateModal,
  weatherLocation,
  onLoginModal,
  onRegisterModal,
  isLoggedIn,
  onEditProfileModal,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  const avatarImage = currentUser.avatar !== "" ? true : false;
  console.log(avatarImage);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={headerLogo} alt="logo"></img>
        </Link>
        <p className="header__date">
          {currentDate}, {weatherLocation}
        </p>
      </div>
      <Link to="/profile" className="header__profile-link">
        <div className="header__profile">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <div>
                <button
                  className="header__add-button"
                  type="text"
                  onClick={handleCreateModal}
                >
                  + Add clothes
                </button>
              </div>
              <div className="header__name">{currentUser.name}</div>
              {avatarImage ? (
                <div>
                  <img
                    className="header__avatar"
                    src={currentUser.avatar}
                    alt="avatar"
                  ></img>
                </div>
              ) : (
                <p className="header__avatar-default">
                  {currentUser.name[0].toUpperCase()}
                </p>
              )}
            </>
          ) : (
            <>
              <button
                className="header__register-button"
                type="button"
                onClick={onRegisterModal}
              >
                Sign up
              </button>
              <button
                className="header__login-button"
                type="button"
                onClick={onLoginModal}
              >
                Login
              </button>
            </>
          )}
        </div>
      </Link>
    </header>
  );
};

export default Header;
