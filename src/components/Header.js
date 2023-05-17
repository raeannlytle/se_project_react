import "../blocks/Header.css";
import headerLogo from "../images/header-logo.svg";
import headerAvatar from "../images/header-avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink } from "react-router-dom";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink exact to="/">
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
          <button className="header__button" type="text" onClick={onCreateModal}>
            + Add clothes
          </button>
        </div>
        <NavLink to="/profile">
          <div className="header__name">Raeann Lytle</div>
        </NavLink>
        <NavLink path="/profile">
          <div className="header__avatar">
            <img
              className="header__avatar-image"
              src={headerAvatar}
              alt="avatar"
            ></img>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
