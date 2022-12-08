import { NavLink } from "react-router-dom";
import React from "react";
function Navigation() {
  return (
    <div>
      <ul className="nav rounded ">
        <NavLink activeclassname="active" to="/">Home</NavLink>
        <NavLink activeclassname="active" to="/Profile">Profile</NavLink>
      </ul>
    </div>
  );
}
export default Navigation;
