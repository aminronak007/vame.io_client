import { Card, CardContent, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import FreelancerFooter from "../FreelancerFooter/FreelancerFooter";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import { useParams } from "react-router";
import axios from "axios";
import { url } from "config";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SavedItem from "../FreelancerNavbar/Menulogo/SavedItem";
import ChatBox from "layouts/Chat/ChatBox/ChatBox";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
import TabContext from "@mui/lab/TabContext";
import Rating from "@mui/material/Rating";
import defaultUserImage from "assets/defaultImages/defaultUserImage.png";
import moment from "moment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "1px solid #fff",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export const SingleJobPage = () => {
  const { slug } = useParams();
  const [jobDetails, setJobDetails] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const authorization = `Bearer ${localStorage.getItem("pwd")}`;

  const [senderId, setSenderId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  let [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [saveJobs, setSaveJobs] = useState([]);
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState(0);
  const [employerRatings, setEmployerRatings] = useState([]);
  const [employerBadges, setEmployerBadges] = useState([]);
  const [empEmail, setEmpEmail] = useState([]);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          setSenderId(res.data.id);
          setUserEmail(res.data.email);
        });
    } else {
      window.location = "/";
    }
    //   eslint-disable-next-line
  }, [flag]);

  useEffect(() => {
    loadSaveJobDetails();
    loadConversations();
    if (localStorage.getItem("pwd")) {
      axios
        .post(`${url}/api/employer-details`, { email: empEmail })
        .then((resp) => {
          // console.log("resp", resp.data.employerDetails);
          setEmployerRatings(resp.data.employerDetails);
        });
      //   eslint-disable-next-line
      axios
        .post(`${url}/api/employer/badges`, { email: empEmail })
        .then((resp) => {
          // console.log("resp", resp.data.employerDetails);
          setEmployerBadges(resp.data.employerDetails);
        });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, [empEmail]);

  const loadConversations = () => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${url}/api/conversations/` + senderId);
        // console.log("curr", res);
        setCurrentChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  };

  const handleSetOpen = async () => {
    setOpen(true);
    setFlag(!flag);
    const conversationId = currentChat
      ?.map((m) => m?.members.find((member) => member !== senderId))
      .toString();

    try {
      await axios.post(`${url}/api/users-id`, { email }).then(async (res) => {
        setReceiverId(res.data);
        await axios.post(`${url}/api/conversations`, {
          senderId,
          receiverId: res.data,
          conversationId: conversationId,
        });
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get(`${url}/api/list-jobs/${slug}`).then((res) => {
      setEmail(res.data.readJobDetails.map((i) => i.email).toString());
      setJobDetails(res.data.readJobDetails);
      setEmpEmail(res.data.readJobDetails?.map((d) => d?.email).toString());
      setLoading(false);
    });
    //   eslint-disable-next-line
  }, []);

  const loadSaveJobDetails = () => {
    axios.get(`${url}`, { headers: { authorization } }).then((res) => {
      axios
        .post(`${url}/api/read/save-jobs`, { email: res.data.email })
        .then((res) => {
          // console.log("getSaveJobDetails", res);
          setSaveJobs(res.data?.savedJobs);
          setLoading(false);
        });
    });
  };

  const handleSaveJobClick = (jobId) => {
    axios.post(`${url}/api/save/jobs`, { userEmail, jobId }).then((res) => {
      setLoading(true);
      if (res.data.success) {
        // console.log(res.data.success);
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
        loadSaveJobDetails();
        setLoading(false);
      } else if (res.data.error) {
        // console.log(res.data.error);
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
        loadSaveJobDetails();
        setLoading(false);
      }
    });
  };

  const handleRemoveSaveJobs = (jobId) => {
    axios
      .post(`${url}/api/remove/save-jobs`, { email: userEmail, jobId })
      .then((res) => {
        setLoading(true);
        if (res.data.success) {
          // console.log(res.data.success);
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
          loadSaveJobDetails();
          setLoading(false);
        } else if (res.data.error) {
          // console.log(res.data.error);
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
          setLoading(false);
        }
      });
  };

  return (
    <React.Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div>
            <FreelancerNavbar />
          </div>
          <div className="container">
            <div className="view-free-profile" style={{ paddingTop: "20px" }}>
              {jobDetails && jobDetails.length === 1
                ? jobDetails.map((i, index) => {
                    return (
                      <React.Fragment key={`key${index}`}>
                        <Card>
                          <CardContent
                            style={{
                              backgroundColor: "#F7F7F7",
                            }}
                          >
                            <div className="row">
                              <div className="col-sm-12 col-md-9">
                                <h1 className="mt-4 mb-1">{i.jobtitle}</h1>
                              </div>
                              <div className="col-sm-12 col-md-3 text-left">
                                <Button
                                  onClick={() => handleSetOpen()}
                                  className="btn btn-blue mt-4 mb-1"
                                >
                                  <TextsmsRoundedIcon />
                                  Chat Employer
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box className="white-box1" sx={style}>
                                    <ChatBox
                                      senderId={senderId}
                                      receiverId={receiverId}
                                      jobId={i._id}
                                      currentUser={employerRatings}
                                    />
                                  </Box>
                                </Modal>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="white-box mt-4">
                          <Box>
                            <TabContext value={value}>
                              <Box>
                                <TabList
                                  onChange={handleChange}
                                  aria-label="lab API tabs example"
                                >
                                  <Tab
                                    label="Overview"
                                    aria-label="lab API tabs example"
                                    value={0}
                                    {...a11yProps(0)}
                                  />
                                  <Tab
                                    label="Reviews"
                                    aria-label="lab API tabs example"
                                    value={1}
                                    {...a11yProps(1)}
                                  />
                                </TabList>
                              </Box>
                              <TabPanel value={value} index={0}>
                                <div className="row">
                                  <div className="col-md-8">
                                    <div>
                                      <h5 className="mt-4 mb-1">
                                        <strong className="postjob-fontsize">
                                          Job Description:
                                        </strong>
                                      </h5>
                                      <p className="mb-1 mt-3 text-14">
                                        {i.jobdescription
                                          ? i?.jobdescription
                                          : null}
                                      </p>
                                    </div>
                                    <div>
                                      {i?.skills.length > 0 ? (
                                        <React.Fragment>
                                          <h5 className="mt-4 mb-1">
                                            <strong className="postjob-fontsize">
                                              Skills Required:
                                            </strong>
                                          </h5>
                                          {i?.skills.map((s, i) => (
                                            <p
                                              key={`key${i}`}
                                              className="mb-1 mt-1 text-14"
                                            >
                                              {i + 1}. {s?.skills}
                                            </p>
                                          ))}
                                        </React.Fragment>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <Card>
                                      <CardContent className="text-16">
                                        <div>
                                          <span className="wt-proposalsicon">
                                            <i className="fa fa-angle-double-down"></i>
                                            <i className="fa fa-money"></i>
                                          </span>
                                          <p className="viewjobtext">0</p>
                                        </div>
                                        <hr />
                                        <div className="mb-3">
                                          <span className="wt-proposalsicon">
                                            {/* <i className="fa fa-angle-double-down"></i> <br /> */}
                                            <i className="fa fa-hourglass-half"></i>
                                          </span>
                                          <p>
                                            <span className="viewjobtext">
                                              Expiry Date
                                            </span>
                                            <p> {i?.date} </p>
                                          </p>
                                        </div>
                                        <hr className="my-3" />
                                        <div className="text-center">
                                          <p>Project Id: 12312341234</p>

                                          <div className="mb-3">
                                            {saveJobs?.jobs?.find(
                                              (j) => j._id === i._id
                                            ) ? (
                                              <Button
                                                style={{
                                                  textTransform: "none",
                                                }}
                                                className="reject btn btn-danger w-100 d-flex justify-content-center"
                                                onClick={() =>
                                                  handleRemoveSaveJobs(i._id)
                                                }
                                              >
                                                Remove
                                              </Button>
                                            ) : (
                                              <Button
                                                className="accept btn btn-blue w-100 d-flex justify-content-center"
                                                onClick={() =>
                                                  handleSaveJobClick(i._id)
                                                }
                                              >
                                                <SavedItem />
                                                &ensp; Click to Save
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                        <hr />
                                        <div
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                          className="text-center"
                                        >
                                          {/* <img src="employer profile pic" /> */}
                                          <p>
                                            {i.user ? i.user?.firstname : ""}
                                            &nbsp;
                                            {i.user ? i.user?.lastname : ""}
                                          </p>
                                          <a href="/freelancer/search-projects">
                                            Open jobs
                                          </a>
                                          &ensp;
                                          {/* <a href="/employer/view-profile" > View profile </a> &ensp; */}
                                        </div>

                                        <div>
                                          <h5 className="mt-4">
                                            <strong className="postjob-fontsize">
                                              Badges
                                            </strong>
                                          </h5>
                                          <div>
                                            {employerBadges?.coursesEnrolled
                                              ?.length > 0 ? (
                                              employerBadges?.coursesEnrolled?.map(
                                                (c, index) => {
                                                  return (
                                                    <React.Fragment
                                                      key={`key${index}`}
                                                    >
                                                      {index === 0 ? (
                                                        <React.Fragment>
                                                          {/* eslint-disable-next-line */}
                                                          {c.courseId
                                                            ?.courseCategory
                                                            ?._id ===
                                                          c.courseId
                                                            ?.courseCategory
                                                            ?._id ? (
                                                            <div className="row">
                                                              <div className="col-md-3">
                                                                {(c?.quiz
                                                                  ?.quizMarks /
                                                                  c?.quiz
                                                                    ?.quizContent
                                                                    ?.length) *
                                                                  100 >
                                                                35 ? (
                                                                  <img
                                                                    style={{
                                                                      height:
                                                                        "50px",
                                                                      width:
                                                                        "50px",
                                                                    }}
                                                                    alt="categoryBadge"
                                                                    src={`${url}/${c?.courseId?.courseCategory?.categoryBadge}`}
                                                                  />
                                                                ) : null}
                                                              </div>
                                                            </div>
                                                          ) : null}
                                                        </React.Fragment>
                                                      ) : null}
                                                    </React.Fragment>
                                                  );
                                                }
                                              )
                                            ) : (
                                              <span
                                                className="text-danger"
                                                style={{ fontSize: "13px" }}
                                              >
                                                No Badges Earned
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </TabPanel>

                              <TabPanel value={value} index={1}>
                                {employerRatings?.email === i.email
                                  ? employerRatings?.ratings?.length > 0
                                    ? employerRatings?.ratings?.map(
                                        (i, index) => {
                                          return (
                                            <div
                                              className="row pt-3 pr-1 border-bottom"
                                              key={`Key${index}`}
                                            >
                                              <div className="col-md-1">
                                                {i?.freelancerId
                                                  ?.profilephoto ? (
                                                  <img
                                                    style={{
                                                      width: "75px",
                                                      height: "75px",
                                                      borderRadius: "10px",
                                                    }}
                                                    src={`${url}/${i?.freelancerId.profilephoto}`}
                                                    alt={`${i?.freelancerId?.displayname}`}
                                                  />
                                                ) : (
                                                  <img
                                                    style={{
                                                      width: "50px",
                                                    }}
                                                    src={defaultUserImage}
                                                    alt="defaultImg"
                                                  />
                                                )}
                                              </div>

                                              <div className="col-md-8 pl-3">
                                                <p
                                                  style={{ fontSize: "18px" }}
                                                  className="text-capitalize text-primary font-bold"
                                                >
                                                  {i?.jobId?.jobtitle}
                                                  <br />
                                                  <span
                                                    style={{
                                                      color: "black",
                                                      fontSize: "16px",
                                                    }}
                                                  >
                                                    $
                                                    {
                                                      i?.jobId?.projectStatus
                                                        ?.fixedPrice
                                                    }{" "}
                                                    USD
                                                  </span>
                                                </p>
                                                <p style={{ fontSize: "14px" }}>
                                                  "{i?.description}"
                                                </p>
                                                <p
                                                  style={{ fontSize: "14px" }}
                                                  className="text-success"
                                                >
                                                  -&nbsp;
                                                  {i?.freelancerId?.displayname}
                                                  &nbsp;
                                                  <span
                                                    style={{ color: "black" }}
                                                  >
                                                    (
                                                    {moment(
                                                      i?.date,
                                                      "YYYYMMDD"
                                                    ).fromNow()}
                                                    )
                                                  </span>
                                                </p>
                                              </div>

                                              <div className="col-md-3 text-center ">
                                                <Rating
                                                  name="simple-controlled"
                                                  value={i?.ratings}
                                                  readOnly
                                                />
                                                <br />
                                                <span
                                                  style={{
                                                    backgroundColor: "#faaf00",
                                                    width: "50px",
                                                    padding: "4px",
                                                    fontWeight: "bold",
                                                    color: "white",
                                                  }}
                                                >
                                                  {i?.ratings}
                                                  .0
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )
                                    : "No Review"
                                  : null}
                              </TabPanel>
                            </TabContext>
                          </Box>
                        </div>
                      </React.Fragment>
                    );
                  })
                : null}
            </div>
          </div>
          <div>
            <FreelancerFooter />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
