import "../blocks/Header.css";
import headerLogo from "../images/header-logo.svg";
import headerAvatar from "../images/header-avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const avatarPlaceholder = currentUser
    ? currentUser.username.charAt(0).toUpperCase()
    : "";

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
  };

  const toggleRegisterModal = () => {
    setRegisterModalOpen(!isRegisterModalOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink exact="true" to="/">
          <div>
            <img src={headerLogo} alt="logo"></img>
          </div>
        </NavLink>
        <div className="header__date">{currentDate}, Charlotte</div>
      </div>
      <div className="header__avatar">
        <div className="header__slider"></div>
        <ToggleSwitch />
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <NavLink to="/profile">
          {currentUser && (
            <>
              <div className="header__name">{currentUser.username}</div>
              <div className="header__avatar">
                {currentUser.avatar ? (
                  <img
                    className="header__avatar-image"
                    src={currentUser.avatar}
                    alt="avatar"
                  ></img>
                ) : (
                  <div className="avatar-placeholder">{avatarPlaceholder}</div>
                )}
              </div>
            </>
          )}
        </NavLink>
        {!isLoggedIn ? (
          <>
            <div>
              <button
                className="header__button"
                type="text"
                onClick={toggleLoginModal}
              >
                Login
              </button>
              {isLoginModalOpen && (
                <LoginModal
                  onClose={toggleLoginModal}
                  onLogin={setLoginModalOpen}
                />
              )}
              <button
                className="header__button"
                type="text"
                onClick={toggleRegisterModal}
              >
                Register
              </button>
              {isRegisterModalOpen && (
                <RegisterModal
                  onClose={toggleRegisterModal}
                  onRegister={setRegisterModalOpen}
                />
              )}
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
