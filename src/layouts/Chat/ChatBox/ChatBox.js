import React, { useEffect, useRef, useState, Fragment } from "react";
import axios from "axios";
import { url, chaturl } from "../../../config";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/Message";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChatBox = ({ senderId, receiverId, jobId, currentUser }) => {
  const [id, setId] = useState("");
  const authorization = `Bearer ${localStorage.getItem("pwd")}`;
  const [showHoursButton, setShowHoursButton] = useState(false);
  const [showFixPriceButton, setShowFixPriceButton] = useState(false);
  const [showHoursField, setShowHoursField] = useState(false);
  const [showFixPriceField, setShowFixPriceField] = useState(false);
  const [freelancerId, setFreelancerId] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // eslint-disable-next-line
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        setId(res.data.id);
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
    //   eslint-disable-next-line
  }, []);

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

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", id);
  // }, [id]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get(`${url}/api/conversations/` + id);
  //       setCurrentChat(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [id]);

  useEffect(() => {
    try {
      const getConversationId = async () => {
        await axios
          .post(`${url}/api/conversations/id`, {
            senderId,
            receiverId,
          })
          .then((res) => {
            setConversationId(res.data);
          });
      };
      getConversationId();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, [conversationId]);

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [messages]);

  const getMessages = async () => {
    try {
      const res = await axios.post(`${url}/api/messages/conversationId`, {
        conversationId,
      });
      setLoading(false);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setNewMessage("");
    getMessages();

    const message = {
      sender: senderId,
      text: newMessage,
      conversationId: conversationId,
      id: freelancerId ? freelancerId : employerId,
      noOfHours: noOfHours,
      fixedPrice: fixedPrice,
      jobId: jobId,
    };
    // console.log("hhh", currentChat);

    socket.current.emit("sendMessage", {
      senderId: senderId,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${url}/api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      setShowHoursButton(false);
      setShowHoursField(false);
      setShowFixPriceField(false);
      setShowFixPriceButton(false);
      setValue(0);
      if (res.data.success) {
        toast.success(res.data.success, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.data.error) {
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleOfferClick = () => {
    setShowHoursButton(true);
    setShowFixPriceButton(true);
    setShowHoursField(false);
    setShowFixPriceField(false);
  };

  const handleAddHoursButton = () => {
    setShowHoursField(true);
    setShowFixPriceButton(false);
    setShowHoursButton(false);
  };

  const handleFixPriceButton = () => {
    setShowHoursButton(false);
    setShowFixPriceField(true);
    setShowFixPriceButton(false);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleMessageSubmit(e);
    }
  };

  const userName = currentUser.displayname
    ? currentUser.displayname
    : currentUser?.map((i) => i?.displayname).toString();

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="row">
          {/* <div className="col-md-1 pr-0"> */}
          {/* {profile !== "yes" ? (
                            <img
                                className="messageImg"
                                src={`${url}/${profile}`}
                                alt=""
                            />
                        ) : (
                            <img
                                className="messageImg"
                                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                                alt=""
                            />
                        )} */}
          {/* </div> */}
          <div
            style={{ textTransform: "capitalize" }}
            className="col-md-11 pl-1"
          >
            <p>{userName}</p>
          </div>
        </div>
      </div>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messages.length > 0 &&
                messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === id}
                      getMessages={getMessages}
                    />
                  </div>
                ))}
            </ScrollToBottom>
          </div>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Chat" {...a11yProps(0)} />
                <Tab
                  onClick={() => {
                    handleOfferClick();
                    setNoOfHours("");
                    setFixedPrice("");
                  }}
                  label="Make Offer"
                  {...a11yProps(1)}
                  style={{ padding: "0px" }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Enter your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeypress}
                />

                <button
                  type="button"
                  name="submit"
                  className="btn btn-blue btn-send"
                  onClick={handleMessageSubmit}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="row">
                {showHoursButton === true ? (
                  <div className="col-6">
                    <button
                      style={{
                        color: "white",
                      }}
                      className="btn btn-primary mb-1"
                      onClick={handleAddHoursButton}
                    >
                      Add Hours
                    </button>
                  </div>
                ) : null}

                {showHoursField === true ? (
                  <Fragment>
                    <div className="col-10">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="No. Of Hours"
                        onChange={(e) => setNoOfHours(e.target.value)}
                        onKeyPress={(e) => {
                          if (
                            (e.which !== 8 && e.which !== 0 && e.which < 48) ||
                            e.which > 57
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <button
                        style={{
                          color: "white",
                        }}
                        className="btn btn-primary mb-1"
                        onClick={handleMessageSubmit}
                      >
                        Add
                      </button>
                    </div>
                  </Fragment>
                ) : null}

                {showFixPriceButton === true ? (
                  <div className="col-6">
                    <button
                      style={{
                        color: "white",
                      }}
                      className="btn btn-primary mb-1"
                      onClick={handleFixPriceButton}
                    >
                      Fixed Price
                    </button>
                  </div>
                ) : null}

                {showFixPriceField === true ? (
                  <div className="row">
                    <div className="col-10">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="$ Fixed Price"
                        onChange={(e) => setFixedPrice(e.target.value)}
                        onKeyPress={(e) => {
                          if (
                            (e.which !== 8 && e.which !== 0 && e.which < 48) ||
                            e.which > 57
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <button
                        style={{
                          color: "white",
                        }}
                        className="btn btn-primary mb-1"
                        onClick={handleMessageSubmit}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </TabPanel>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default ChatBox;
