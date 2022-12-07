// import { BrowserRouter , Route } from "react-router-dom";
// import App from "../App"
// import UserProfile from "./UserProfile"
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
