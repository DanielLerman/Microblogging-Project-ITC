import React from "react";
import { Navigate } from "react-router-dom";
import {auth} from "../firebaseConfig/firebase"

const PrivateRoute=({children, currentUser})=>{
    console.log(auth.currentUser)
    return auth.currentUser ? children : <Navigate to="/login"></Navigate>
}
export default PrivateRoute;