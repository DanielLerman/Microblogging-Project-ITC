import { db, auth } from "../firebaseConfig/firebase";
import {doc, getDoc } from "firebase/firestore";
import { useState } from "react";


function TweetShow({ tweet }) {
  //comps states
  const [displayProfileImg, setDisplayProfileIm] = useState("");
  const [displayUserName, setDisplayUserName] = useState("");


  const handelUserName = async () => {
    //getting a ref 
    const nameRef = await getDoc(doc(db, "users", auth.currentUser.uid));
    //store the data ref at var
    const data = nameRef.data();
    //updating states
    setDisplayUserName(data.userName);
    setDisplayProfileIm(data.url);
  };
  handelUserName();


  return (
    <div className="tweetie rounded">
      <div className="tweetie-top">
        <span className="user-info">
          <span >
            <img className="profile-img" src={displayProfileImg} alt="" />
          </span>
          <span>{displayUserName}</span>
        </span>
        <span> {tweet.date} </span>
      </div>
      <span className="tweetie-text">{tweet.content}</span>
    </div>
  );
}
export default TweetShow;
