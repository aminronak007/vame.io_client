import React, { Fragment, useEffect, useRef, useState } from "react";
import "./messenger.css";
import Conversations from "../conversations/Conversations";
import Message from "../message/Message";
import EmployeeNavbar from "../../Front/Employer/EmployerNavbar";
import axios from "axios";
import { url, chaturl } from "../../../config";
import { io } from "socket.io-client";
import FreelancerNavbar from "layouts/Front/Freelancer/FreelancerNavbar/FreelancerNavbar";
import { CardContent } from "@mui/material";
import { Card } from "@material-ui/core";

import ClipLoader from "react-spinners/ClipLoader";

const Messenger = () => {
  const authorization = `Bearer ${localStorage.getItem("pwd")}`;
  const [id, setId] = useState("");
  const [startas, setStartAs] = useState("");
  let [loading, setLoading] = useState(true);
  const [freelancerId, setFreelancerId] = useState("");
  const [employerId, setEmployerId] = useState("");

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };
  // const [user, setUser] = usState({});
  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          // console.log(res);
          setId(res.data.id);
          setStartAs(res.data.startas);
          if (res.data.startas === "Virtual Assistant") {
            axios
              .post(`${url}/api/freelancer-details`, {
                email: res.data.email,
              })
              .then((result) => {
                setFreelancerId(result.data.freelancerDetails._id);
              });
          }
          if (res.data.startas === "Employer") {
            axios
              .post(`${url}/api/employer-details`, {
                email: res.data.email,
              })
              .then((result) => {
                setEmployerId(result.data.employerDetails._id);
              });
          }
        });
    } else {
      window.location = "/";
    }
  });

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const [search, setSearch] = useState("");

  useEffect(() => {
    socket.current = io(`${chaturl}`);

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);

    // console.log("arrive", arrivalMessage);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", id);
    socket.current.emit("getMessage", (m) => {
      // console.log("mmm", m);
    });
  }, [id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${url}/api/conversations/` + id);

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [messages]);

  const getMessages = async () => {
    try {
      const res = await axios.get(`${url}/api/messages/` + currentChat?._id);

      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat._id,
      id: freelancerId ? freelancerId : employerId,
    };

    const receiverId = currentChat.members.find((member) => member !== id);

    // console.log("xon rece", receiverId);
    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${url}/api/messages`, message);
      setMessages([...messages, res.data]);

      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#f1f5f9",
          }}
        >
          {startas === "Employer" ? <EmployeeNavbar /> : <FreelancerNavbar />}

          <div
            className="container"
            style={{
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            <div className="messenger white-box">
              <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <Card
                    sx={{
                      //   maxWidth: 875,
                      marginTop: "40px",
                      marginBottom: "40px",
                      boxShadow: "20px",
                    }}
                  >
                    <CardContent>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search for Users"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                      </div>
                      {conversations.map((c) => (
                        <div className="row">
                          <div
                            onClick={() => setCurrentChat(c)}
                            className="col-md-12"
                          >
                            <Conversations
                              conversation={c}
                              currentUser={id}
                              search={search}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="chatBox">
                <div className="chatBoxWrapper">
                  <Card
                    style={{
                      padding: 15,
                      height: currentChat ? 550 : 150,
                    }}
                  >
                    {currentChat ? (
                      <Fragment>
                        <div className="chatBoxTop">
                          {messages.length > 0 &&
                            messages.map((m) => (
                              <div ref={scrollRef}>
                                <Message message={m} own={m.sender === id} />
                              </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                          <div class="input-group">
                            <textarea
                              className="chatMessageInput form-control"
                              placeholder="Write your Message here..."
                              onChange={(e) => setNewMessage(e.target.value)}
                              value={newMessage}
                            ></textarea>
                            <button
                              onClick={handleMessageSubmit}
                              className="chatSubmitButton btn btn-outline-secondary"
                              type="button"
                              id="button-addon2"
                            >
                              <i className="fas fa-paper-plane"></i>
                            </button>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <span className="noConversationText">
                        Open a Conversation to start a chat
                      </span>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Messenger;
