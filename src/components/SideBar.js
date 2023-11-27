import avatar from "../images/header-avatar.svg";
import "../blocks/SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} className="sidebar__avatar" alt={avatar} />
      <div className="sidebar__name">Raeann Lytle</div>
    </div>
  );
}

export default SideBar;
