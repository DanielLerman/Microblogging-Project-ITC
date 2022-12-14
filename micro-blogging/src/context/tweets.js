
import { createContext, useState } from "react";
import { collection, addDoc, getDocs , onSnapshot, query} from "firebase/firestore";
import { db, auth } from "../firebaseConfig/firebase";

const TweetsContext = createContext();

function Provider({ children }) {
  //every tweet created will be push to the array of tweet list
  const [tweets, setTweets] = useState([]);
  //control access
  const [currentUser, setCurrentUser] = useState(false);
  //spineer
  const [isLoading, setIsLoading] = useState(false);
  //fetch
  const [errCatch, setErrCatch] = useState(false);
  //user info when signed
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    repassword: "",
    id: "",
  });
  //url state
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  //user's creation--> enter to array
  const createTweet = async (tweetContent) => {
    try {
      setIsLoading(true);
      setErrCatch(false);
      const createdDate = new Date().toISOString();
      //new tweet created at home page assigning the signed user id
      const newTweet = {
        content: tweetContent,
        date: createdDate,
        id: auth.currentUser.uid,
      };
     
      //adding the new tweet to the collection
      addDoc(collection(db, "tweets"), newTweet);
   
      //adding the new tweet to the state
      const updateTweets = [newTweet, ...tweets];
      setIsLoading(false);
      setTweets(updateTweets);
    } catch (err) {
      console.log(err);
      setErrCatch(true);
      setIsLoading(false);
    }
  };

  //fetch on load pass to app 
  const getAllTweets = async () => {
    try {
      //get a ref from collection 
      const allTweetsSnapshot = await getDocs(collection(db, "tweets"));
      //mapping to add the tweets is and the user name data of chosen
      const allTweets = allTweetsSnapshot.docs.map((tweet) => {
        const newTweetWithId = {
          ...tweet.data(),
          tweetId: tweet.id,
          userName: tweet.data().userName,
        };
        return newTweetWithId;
      });

      setTweets(allTweets);
    } catch (err) {console.log(err)}
  };

  //diff tabs conection 
  const listenForChanges=()=>{
    const q=query(collection(db, "tweets"))
    onSnapshot(q ,(querySnap)=>{
      const tweetsArray=querySnap.docs.map(tweetQuery=>{
        return {...tweetQuery.data(), tweetId: tweetQuery.id}
      });
      setTweets(tweetsArray)
    })

  }

  const valueToShere = {
    createTweet,
    isLoading,
    errCatch,
    tweets,
    getAllTweets,
    setCurrentUser,
    currentUser,
    userInfo,
    setUserInfo,
    listenForChanges,
    profileImgUrl,
     setProfileImgUrl,
  };

  return (
    <TweetsContext.Provider value={valueToShere}>
      {children}
    </TweetsContext.Provider>
  );
}
export { Provider };
export default TweetsContext;
