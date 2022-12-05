import { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Alert from "react-bootstrap/Alert";

function TweetCreate({ onCreate }) {
  const [text, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    text.length === 140
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [text]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(text)
    setText("")
    console.log("this is th tweet ", text)
  }
  



  return (
    <form className="tweet-create-box rounded border border-3 border border-white" onSubmit={handleSubmit}>
      <TextareaAutosize

        cacheMeasurements
        // border border-white
        className="text-area "
        minRows={6}
        maxRows={6}
        maxLength={140}
        placeholder="What you have on mind..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="bottom-box ">
      {isButtonDisabled && (
        <Alert className="chars-alert p-1 m-0 mx-3" key={"danger"} variant={"danger"}>
          {" "}
          The Tweet can't conatain more then 140 chars.
        </Alert>
      )}
      <div className="btn-position-helper"></div>
      <button className="tweet-btn btn btn-primary" disabled={isButtonDisabled}>Tweet</button>
      
      </div>
    </form>
  );
}
export default TweetCreate;
