import TweetShow from "./TweetShow";

//
import TweetsContext from "../context/tweets";
import {  useContext } from "react"; 
function TweetList() {
  const { tweets } = useContext(TweetsContext);
  //console.log(tweets);
  const renderedTweets = tweets.map((tweet) => {
    //  console.log(tweet);
    return (
      <div key={tweet.id}>
        <TweetShow tweet={tweet} />;
      </div>
    );
  });
  return <div>{renderedTweets}</div>;
}
export default TweetList;
