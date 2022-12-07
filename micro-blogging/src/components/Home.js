import { useState } from "react";
import TweetCreate from "./TweetCreate";
import TweetList from "./TweetList";
import uuid from "react-uuid";
import { useEffect } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";


function Home({userName}) {
  console.log("the new userName", userName)
  const url = `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`;
  //every tweet created will be push to the array of tweet list
  const [tweets, setTweets] = useState([]);
  //push state down to control spinner depended on the fetch
  const [isLoading, setIsLoading] = useState(false);
  const [errCatch, setErrCatch] = useState(false);

  ///
  const getAllTweets = () => {
    setIsLoading(true);
    axios.get(url).then((data) => {
      console.log(data.data);
      setTweets(data.data.tweets);
      setIsLoading(false);
    });
  };
  //making a request once when page load
  useEffect(() => {
    getAllTweets();
  }, []);

  //user's creation--> enter to array
  const createTweet = async (tweetContent) => {
    try {
      setIsLoading(true);
      setErrCatch(false);
      const id = uuid();
      // const userName="danielle";
      const createdDate = new Date().toISOString();
      const newTweet = {
        id,
        content: tweetContent,
        date: createdDate,
        userName:userName,
      };
      const updateTweets = [newTweet, ...tweets];
      const res = await axios.post(url, newTweet);
      //checking if newTweet was accepted and updating the new array
      if (res.data) {
        setIsLoading(false);
        //uodating the array localy to the server and on loed with useEffect on the first request
        setTweets(updateTweets);
      }
    } catch (err) {
      setErrCatch(true);
    }
  };

  const onCreateUser=(userName)=>{
    return 
  }

  return (
    <div>
      <TweetCreate
        url={url}
        onCreate={createTweet}
        onfetch={isLoading}
        onCatch={errCatch}
      />
      <TweetList tweets={tweets} />
      <UserProfile onCreate={onCreateUser} />
    </div>
  );
}

export default Home;
