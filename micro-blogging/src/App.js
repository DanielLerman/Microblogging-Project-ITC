import Home from "./components/Home";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import TweetsContext from "./context/tweets";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute"


function App() {
  const {  getAllTweets, listenForChanges, currentUser,} = useContext(TweetsContext);
 
 //getting the tweets invoking conection onMount
  useEffect(() => {
    listenForChanges()
    getAllTweets();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<PrivateRoute currentUser={currentUser}><Home /></PrivateRoute>} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
