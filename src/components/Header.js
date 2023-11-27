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
import * as api from "../utils/api";

const Header = ({ onCreateModal, setCurrentUser, setIsLoggedIn }) => {
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
    setLoginModalOpen(true);
  };

  const toggleRegisterModal = () => {
    setRegisterModalOpen(!isRegisterModalOpen);
  };

  const handleLogin = () => {
    const userLogin = {
      email: "",
      password: "",
    };

    api
      .loginUser(userLogin)
      .then((res) => {
        console.log("Login response:", res);
        if (res.access) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser({
            id: res.user.id,
            username: res.user.username,
            email: res.user.email,
          });
          setIsLoggedIn(true);
        } else {
          console.error("Login failed. Server did not provide access");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
      });
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
                <LoginModal onClose={toggleLoginModal} onLogin={handleLogin} />
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
                  onClose={() => setRegisterModalOpen(false)}
                  onRegister={() => setRegisterModalOpen(false)}
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
