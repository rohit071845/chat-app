import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutRoute } from "../utils/ApiRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const TOAST_ID = "logout-toast";

  const handleLogout = () => {
    if (!toast.isActive(TOAST_ID)) {
      toast(
        ({ closeToast }) => {
          // 🔥 AUTO CLOSE AFTER 30s
          const timer = setTimeout(() => {
            closeToast(); // acts like "No"
          }, 10000);

          return (
            <div>
              <p>Are you sure you want to logout?</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={async () => {
                    clearTimeout(timer); // stop auto-close

                    const id = JSON.parse(
                      localStorage.getItem("chat-app-user")
                    )?._id;

                    try {
                      await axios.get(`${logoutRoute}/${id}`);
                      localStorage.clear();
                      navigate("/login");
                    } catch (err) {
                      console.log(err);
                    }

                    closeToast();
                  }}
                  style={{
                    padding: "5px 10px",
                    background: "green",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Yes
                </button>

                <button
                  onClick={() => {
                    clearTimeout(timer); // stop auto-close
                    closeToast();
                  }}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  No
                </button>
              </div>

            </div>
          );
        },
        {
          toastId: TOAST_ID,
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      );
    }
  };

  return (
    <>
      <Button onClick={handleLogout}>
        <BiPowerOff />
      </Button>
      <ToastContainer />
    </>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;