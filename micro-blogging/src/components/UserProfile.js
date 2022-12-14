import TextareaAutosize from "react-textarea-autosize";
import TweetsContext from "../context/tweets";
import { useContext, useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { storage } from "../firebaseConfig/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function UserProfile() {
  const { profileImgUrl, setProfileImgUrl } =useContext(TweetsContext);
//comps states
  const [userName, setUserName] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [buttonColor, setButtonColor]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonColor(true)
    try {
      //setting in doc name from the state
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        userName: userName,
      });
      setButtonColor(false)
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (imageUpload == null) return ;
    //ref from storage 
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //
    uploadBytes(imageRef, imageUpload).then((res) => {
      getDownloadURL(imageRef).then((url) => {
        setProfileImgUrl(url);
      });
    });
  };
  
const addProfileImg =async()=>{
    const profileRef = doc(db, "users", auth.currentUser.uid);
    // if(!profileRef.exists()){
    //   const aditedDoc=await setDoc(profileRef, { 
    //     url: "image.png"
    //   } , { merge: true }); 
    // }
    const aditedDoc=await setDoc(profileRef, { 
      url: profileImgUrl
    } , { merge: true }); 
  
}

  useEffect(() => {
   
    if (profileImgUrl !== null){
      addProfileImg() 
    } 
  }, [profileImgUrl]);


  // const handleButtonSave=()=>{
  //   setButtonColor(true)
  // }
  return (
    <div>
      <form className="user-box" onSubmit={handleSubmit}>
        <span id="user-title">Profile</span>
        <span id="user-input-title">User Name</span>
        <TextareaAutosize
          cacheMeasurements
          className="user-text-area rounded"
          minRows={1}
          maxRows={1}
          placeholder="Your name..."
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          spellCheck={false}
        />
        <div className="upload-img-box">
          <input
          className="upload-img-input  btn-outline-info"
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          
          />
       
          <button className="upload-submit btn btn-outline-info " onClick={uploadImage}>Upload Profile Image</button>
        </div>
        <button className={buttonColor? "user-btn btn btn-success":"user-btn btn btn-primary "} type="submit">
        {buttonColor? "saved": "save"}
        </button>
      </form>
    </div>
  );
}
export default UserProfile;
