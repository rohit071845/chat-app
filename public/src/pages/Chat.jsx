


import React,{useState,useEffect,useRef} from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {io} from "socket.io-client";
import { allUsersRoute,host } from '../utils/ApiRoutes';
import Welcome from '../components/Welcome';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem("chat-app-user");
  
      if (!storedUser) {
        // alert("1!");
        navigate("/login");
        return; // Prevent further execution after navigation
      }
  
      // alert("this");
      const user = await JSON.parse(storedUser);
      setCurrentUser(user);
      // alert("2");
      // console.log(user, "is the current user");
    };
  
    checkUser();
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    const x=async()=>{
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        // alert("4");
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        // console.log(data.data,"this is contacts",contacts);
      } else {
        // alert("3");
        navigate("/setAvatar");
      }
    }
  }
  x();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    // console.log("chat is",chat);
    setCurrentChat(chat);
  };

  return (
    <Container>
      currentUser&& <div className="container">
   <Contacts contacts={contacts}  changeChat={handleChatChange} />
   {
   currentChat===null?(<Welcome currentUser={currentUser}/>):(
      <ChatContainer currentChat={currentChat} socket={socket} />
    )
   }
   
     
     
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat
// useEffect( () => {
  //   const x=async()=>{
  //   if (!localStorage.getItem("chat-app-user")) {
  //     JSON.parse(
  //       localStorage.getItem("chat-app-user")
  //     )
  //     alert("1!");
  //     navigate("/login");
  //   } else {
  //     alert("this");
  //     setCurrentUser(
  //       await JSON.parse(
  //         localStorage.getItem("chat-app-user")
  //       )
  //     );
  //   }
  //   alert("2");
  //   console.log(currentUser,"is");
  // }
  // x();
  // }, []);