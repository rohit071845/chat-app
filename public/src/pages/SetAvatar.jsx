
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer,toast} from "react-toastify" ;
import loader from "../Assets/loader.gif"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/ApiRoutes';

import {Buffer} from "buffer";
function SetAvatar() {
     const api = `https://api.multiavatar.com/4645646`;
   


    const navigate=useNavigate();
    const [avatars,setAvatars]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const toastOptions={
        position:"bottom-right",
                pauseOnHover:true,
                autoClose:800, 
                draggable:true,
                theme:"dark",
    };
    useEffect( () => {
      const x=async()=>{
      if (!localStorage.getItem("chat-app-user")){
        navigate("/login");}
//      { const userString = localStorage.getItem("chat-app-user");
// if (userString) {
//   const user = JSON.parse(userString);
//   alert('y');
//   console.log(user); // Outputs: JohnDoe
//   navigate("/");
// }}
        }
    x();
    }, []);
    const setProfilePicture=async()=>{
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar",toastOptions);
        }
        else {
            const user= JSON.parse(localStorage.getItem("chat-app-user"));
               if (!user) {
          toast.error("User not found. Please log in again.", toastOptions);
          return;
      }
            const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            });
            alert("found");
           console.log(data);
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                alert("/");
                navigate('/');
            }
            else {
                toast.error("Error while setting Avatar,Plz try again",toastOptions);
            }
        }
    };
    // const setProfilePicture = async () => {
    //   if (selectedAvatar === undefined ) {
    //       toast.error("Please select a valid avatar", toastOptions);
    //       return;
    //   }
  
    //   const user = JSON.parse(localStorage.getItem("chat-app-user"));
    //   if (!user) {
    //       toast.error("User not found. Please log in again.", toastOptions);
    //       return;
    //   }
  
  //     try {
      
  //        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
  //             image: avatars[selectedAvatar],
  //         });
  //      alert("done")
  //         if (data.isSet === true) {
  //             user.isAvatarImageSet = true;
  //             user.avatarImage = data.image;
  //             localStorage.setItem("chat-app-user", JSON.stringify(user));
            
  //         } else {
  //             toast.error("Error while setting Avatar, please try again", toastOptions);
  //         }
  //     } catch (error) {
  //      alert("catch");
  //       navigate("/");
  //         toast.error("Network error occurred, please try again later", toastOptions);
  //         console.error("Error setting profile picture:", error);
  //     }
  // };
  
    useEffect(() => {
        const fetchImages = async () => {
          try {
            const data = [];
            for (let i = 0; i <4; i++) {
              const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
              const buffer = new Buffer(image.data); 
              data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching images:", error);
            setIsLoading(false); 
          }
        };
      
        fetchImages(); 
      
      }, []); 
      
  return (
    <>
    {
      isLoading?(<Container>
        <img src={loader} alt="loader" className="loader"/>
      </Container>):(<Container>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
        </div>
       <div className="avatars">
        {
            avatars.map((avatar,index)=>{
                return(
                    <div key={index} className={
                        `avatar ${
                            selectedAvatar===index?"selected":""
                        }`
                    }>
                        <img src={`data:image/svg+xml;base64,${avatar}`} 
                        alt="avatar"
                        onClick={()=>setSelectedAvatar(index)}/>
                        </div>

                );
            })
        }
       </div>
       <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
      </Container>
  )}
      <ToastContainer></ToastContainer>
    </>
  )
}
const Container=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  gap:3rem;
  background-color:#131324;
  height:100vh;
  width:100vw;
  .loader{
  max-inline-size:100%
  }
  .title-container{
  h1{
  color:white;
  }}
  .avatars{
  display:flex;
  gap:2rem;
  .avatar{
     border:0.4rem solid transparent;
     padding:0.4rem;
     border-radius:5rem;
     display:flex;
     justify-content:center;
     align-items:center;
     transition:0.5s ease-in-out;
     img{
     height:6rem;}
  }
     .selected{
     border:0.4rem solid #4e0eff}
  }
     .submit-btn{
     background-color:#997af0;
color:white;
padding:1rem 2rem;
border:none;
font-weight:bold;
cursor:pointer;
border-radius:0.4rem;
font-size:1rem;
text-transform:uppercase;
transition:0.5s ease-in-out;
&:hover{
background-color:#4e0eff;}
     }
`;
export default SetAvatar
