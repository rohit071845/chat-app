


import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Robot from "../Assets/robot.gif";
function Welcome({currentUser}) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const x = async () => {
      const storedData = localStorage.getItem("chat-app-user");
      if (storedData) {
        const data = await JSON.parse(storedData);
        if (data && data.username) {
          setUserName(data.username);
        } else {
          console.error("Username is missing in the stored data.");
          setUserName("Guest"); // Fallback if username is not present
        }
      } else {
        console.error("No data found in localStorage.");
        setUserName("Guest"); // Fallback if no data is found
      }
    };
    x();
  }, []);

  return (
    <Container>
        <img src={Robot} alt="Robot" />
        <h1> Welcome, <span>{userName}!</span></h1>
        <h3>Please select a chat to start Messaging.</h3>
    </Container>
  )
}
const Container=styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome
