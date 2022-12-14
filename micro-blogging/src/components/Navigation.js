import { NavLink } from "react-router-dom";
import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig/firebase";
function Navigation() {
  let navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <ul className="nav rounded ">
        <NavLink activeclassname="active" to="/SignUp">
          SignUp
        </NavLink>
        <NavLink activeclassname="active" to="/Login">
            Login
          </NavLink>
      <NavLink activeclassname="active" to="Profile">
          Profile
        </NavLink>
      
       <NavLink activeclassname="active" to="/">
          Home
        </NavLink>
      
       {auth.currentUser&& <NavLink onClick={logout} activeclassname="active" to="/Login">
          Logout 
        </NavLink>}
      </ul>
    </div>
  );
}
export default Navigation;
