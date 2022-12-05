import TweetShow from "./TweetShow";
function TweetList({ tweets }) {
  const renderedTweets = tweets.map((tweet) => {
    console.log(tweet);
    return (
      <div key={tweet.id}>
        <TweetShow tweet={tweet} />;
      </div>
    );
  });
  console.log(renderedTweets);
  return <div>{renderedTweets}</div>;
}
export default TweetList;
