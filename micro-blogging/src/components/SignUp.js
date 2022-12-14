import React, { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig/firebase";
import { useNavigate } from "react-router-dom";
import TweetsContext from "../context/tweets";
import { GoogleButton } from "react-google-button";

function SignUp() {
  const { userInfo, setUserInfo } = useContext(TweetsContext);
  const navigate = useNavigate();
//grabbing by id & set the state
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (userInfo.password === userInfo.repassword) {
        //creating the user in firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userInfo.email,
          userInfo.password
        );
        //creating user obj with inpur values from the state
        const newUser = {
          userName: userInfo.userName,
          email: userInfo.email,
          password: userInfo.password,
        };
        //sending the newUser to the user collection with that id
        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        //updating userInfo state with the signed in user
        setUserInfo({
          ...userInfo,
          id: userCredential.user.uid,
          userName: newUser.userName,
        });

        navigate("/login");
        // setCurrentUser(true)
      }
    } catch (err) {console.log(err)}
    setUserInfo({ userName: "", email: "", password: "", repassword: "" });
  };

  const googleSignIn =async () => {
    const provider = new GoogleAuthProvider();
     const userCredential=await signInWithPopup(auth, provider)
     //create a ref
    const refdata=  await getDoc(doc(db, "users", userCredential.user.uid))
    //if its exist at the id
    if(!refdata.exists()){
    await setDoc(doc(db, "users", userCredential.user.uid),{
    userName: "Guest"
  })
    }
    navigate("/");
  };

  const handleGoogleSignUp = async () => {
    try {
      googleSignIn();
    
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="signUp">
      <h1 className="signUp-welcome">Welcome Bird</h1>
      <span className="signUp-mini-title">Let's Tweet together</span>
      <input
        onChange={handleChange}
        placeholder="You Name"
        value={userInfo.userName}
        id="userName"
      />
      <input
        onChange={handleChange}
        placeholder="Email"
        value={userInfo.email}
        id="email"
      />
      <input
        onChange={handleChange}
        placeholder="Password"
        value={userInfo.password}
        id="password"
      />
      <label className="signUp-confirm">Confirm Password:</label>
      <input
        onChange={handleChange}
        placeholder="Password"
        value={userInfo.repassword}
        id="repassword"
      />
      <button className="btn btn-outline-primary" onClick={handleSignUp}>
        Sign Up
      </button>
      <GoogleButton
        onClick={handleGoogleSignUp}
        className="google-button rounded w-50  mt-3"
      />
    </form>
  );
}
export default SignUp;
