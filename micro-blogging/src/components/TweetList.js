import TweetShow from "./TweetShow";
import TweetsContext from "../context/tweets";
import {  useContext } from "react"; 
function TweetList() {
  const {tweets} = useContext(TweetsContext);
  const renderedTweets = tweets.map((tweet) => {
    return (
      <div key={tweet.id} >
        <TweetShow tweet={tweet} />;
      </div>
    );
  });
  return <div>{renderedTweets}</div>;
}
export default TweetList;
