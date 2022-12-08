// import React from 'react'
import { createContext, useState, useEffect } from 'react'
import axios from "axios";
import uuid from "react-uuid";

const TweetsContext=createContext();

function Provider ({children}){ 
///APP
const LOCAL_STORAGE_KEY = "tweets";
const [userName, setUserName] = useState(
  localStorage.getItem(LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    : " "
);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userName));
}, [userName]);


    const url = `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`;
    //every tweet created will be push to the array of tweet list
    const [tweets, setTweets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errCatch, setErrCatch] = useState(false);
  
    const getAllTweets = () => {
      setIsLoading(true);
      axios.get(url).then((data) => {
          setTweets(data.data.tweets);
        setIsLoading(false);
      });
      
    };
    //making a request once when page load
    useEffect(() => {
      getAllTweets();
      const interval = setInterval(() => {
        getAllTweets();
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  

    //user's creation--> enter to array
    const createTweet = async (tweetContent) => {
      try {
        setIsLoading(true);
        setErrCatch(false);
        const id = uuid();
  
        const createdDate = new Date().toISOString();
        const newTweet = {
          id,
          content: tweetContent,
          date: createdDate,
          userName: userName,
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
        setIsLoading(false);
      }
    };

  
  const valueToShere={
    createTweet,
    userName,
    setUserName,
    isLoading,
    errCatch,
    tweets,
   
  }

    return(
        <TweetsContext.Provider value={valueToShere}>
            {children}
        </TweetsContext.Provider>
    )
    
}
export {Provider};
export default TweetsContext;