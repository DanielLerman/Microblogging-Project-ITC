import TextareaAutosize from "react-textarea-autosize";
import TweetsContext from "../context/tweets";
import {  useContext } from "react";
function UserProfile() {
  const { userName, setUserName } = useContext(TweetsContext);

  const handleSubmit = (event) => {
    event.preventDefault()
    setUserName(userName);

    
  };

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
        />
        <button className="user-btn btn btn-primary " type="submit">
        save
        </button>
      </form>
    </div>
  );
}
export default UserProfile;
