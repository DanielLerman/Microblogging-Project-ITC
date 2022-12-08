import { useState,useEffect,useContext } from "react";

import TextareaAutosize from "react-textarea-autosize";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//
import TweetsContext from "../context/tweets";
function TweetCreate() {
  const { createTweet,isLoading,  errCatch } = useContext(TweetsContext);


  const [text, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    text.length === 140
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [text]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createTweet(text);
    setText("");
  };

  return (
    <form
      className="tweet-create-box rounded border border-3 border border-white"
      onSubmit={handleSubmit}
    >
      <TextareaAutosize
        cacheMeasurements
        className="text-area "
        minRows={6}
        maxRows={6}
        maxLength={140}
        placeholder="What you have in mind..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="bottom-box ">
        {isButtonDisabled || errCatch ? (
          <Alert
            className="chars-alert p-1 m-0 mx-3"
            key={"danger"}
            variant={"danger"}
          >
            {errCatch
              ? "Couldn't Post"
              : "The Tweet can't conatain more then 140 chars."}
          </Alert>
        ) : (
          ""
        )}
        <div className="btn-position-helper"></div>
        <Button
          className="tweet-btn"
          variant="primary"
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading || errCatch ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            " "
          )}
          <span className={isLoading || errCatch ? "visually-hidden" : ""}>
            Tweet
          </span>
        </Button>{" "}
      </div>
    </form>
  );
}
export default TweetCreate;
