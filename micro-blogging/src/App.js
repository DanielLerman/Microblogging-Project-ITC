import { useState } from "react";
import TweetCreate from "./components/TweetCreate";
import TweetList from "./components/TweetList";
import uuid from "react-uuid";
import {useEffect} from "react"

function App() {
  //every tweet created will be push to the array of tweet list
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // localStorage.setItem('my-tweets', JSON.stringify(tweets));
    const data= localStorage.getItem("my-tweets")
    if(data){
    setTweets(JSON.parse(data))
  }
  },[]);

  useEffect(() => {
    localStorage.setItem('my-tweets', JSON.stringify(tweets));
  });

  //user's creation--> enter to array
  const createTweet = (tweetContent) => {
    console.log("What the heell is this?", tweetContent);
    const id = uuid();
    const userName="Danielle"
    // const createdDate = format(new Date(), "MMM do p");
    const createdDate= new Date().toISOString()
    /// avoidng modify the array-creating array-->copy-->add new elem
    const updateTweets = [
      {
        //id to each note--help later to specify desire note
        id,
        text: tweetContent,
        date: createdDate,
        userName,
      },
      ...tweets,
    ];
    setTweets(updateTweets);
    console.log(updateTweets);
    console.log(tweetContent);
  };

  return (
    <div>
      <TweetCreate onCreate={createTweet} />
      <TweetList tweets={tweets} />
    </div>
  );
}

export default App;
