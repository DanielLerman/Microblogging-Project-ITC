
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const LOCAL_STORAGE_KEY = "tweets";
  const [userName, setUserName] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : " "
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userName));
  }, [userName]);
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Home userName={userName} />} />
          <Route path="profile" element={<UserProfile userName={userName} setUserName={setUserName}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
