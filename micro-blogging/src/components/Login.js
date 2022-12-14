import { auth, provider, db } from "../firebaseConfig/firebase";
import {
  signInWithEmailAndPassword,signOut
} from "firebase/auth";
import { useState, useContext } from "react";
import TweetsContext from "../context/tweets";
import { useNavigate } from "react-router-dom";
import {  getDoc, doc } from "firebase/firestore";

function Login() {
  const { setCurrentUser, setUserInfo} = useContext(TweetsContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    //dclair a ref to the collection with the signed user
      const docRef = doc(db, "users", userCredential.user.uid);
      //getting the doc
      const userInfoVal = await getDoc(docRef);
      //update the state with the data from doc
      setUserInfo(userInfoVal.data());
      //allow access
      setCurrentUser(true)
      navigate("/");
    } catch (err) {
      console.log(err);
      //if not signed in 
      navigate("/signUp");
    }
  };
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  return (
    <form className="signUp">
      <p className="login-title">Now, just login... </p>

      <input
        id="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        id="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="btn btn-outline-primary" onClick={handleLogin}>
        Login
      </button>
      {/* <button onClick={logout}>singout</button> */}
      {/* <h3 className="text-light">{user?.email} </h3> */}
    </form>
  );
}
export default Login;
