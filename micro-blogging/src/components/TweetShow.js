function TweetShow({ tweet }) {
  //console.log(tweet);
  return (
    <div className="tweetie rounded">
      <div className="tweetie-top">
        <span>{tweet.userName}</span>
        <span> {tweet.date} </span>
      </div>
      <span className="tweetie-text">{tweet.content}</span>
    </div>
  );
}
export default TweetShow;
