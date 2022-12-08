import Home from "./components/Home";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="profile"
            element={
              <UserProfile/>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
