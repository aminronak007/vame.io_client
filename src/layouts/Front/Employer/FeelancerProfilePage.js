import { Card, CardContent, Button } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import Banner from "./images/frbanner-1920x400.jpg";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmployerFooter from "./EmployerFooter";
import { url } from "config";
import axios from "axios";
import moment from "moment";
import ReactPlayer from "react-player";
import { Typography } from "@mui/material";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import SavedItems from "./Menulogo/SavedItem";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import defaultUserImage from "../../../assets/defaultImages/defaultUserImage.png";
import ChatBox from "layouts/Chat/ChatBox/ChatBox";
import SavedItem from "./Menulogo/SavedItem";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
import TabContext from "@mui/lab/TabContext";
import SendIcon from "@mui/icons-material/Send";
import Rating from "@mui/material/Rating";
import Backdrop from "@mui/material/Backdrop";

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

function FeelancerProfilePage() {
  let { id } = useParams();
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [freelancerViewData, setFreelancerViewData] = useState([]);
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (e) => {
    pdfExportComponent.current.save();
  };
  const [profile, setProfile] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const authorization = `Bearer ${localStorage.getItem("pwd")}`;
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [senderId, setSenderId] = useState("");
  const [email1, setEmail1] = useState("");
  const [saveJobs, setSaveJobs] = useState([]);

  const [showHoursField, setShowHoursField] = useState(false);
  const [showFixPriceField, setShowFixPriceField] = useState(false);
  const [jobId, setJobId] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");

  const [employerJobDetails, setEmployerJobDetails] = useState([]);
  const [freelancerBadges, setFreelancerBadges] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openInvitations, setOpenInvitations] = useState(false);
  const handleOpenInvitations = () => setOpenInvitations(true);
  const handleCloseInvitations = () => setOpenInvitations(false);

  useEffect(() => {
    loadEmployerJobDetails();
    // eslint-disable-next-line
  }, [flag]);

  const loadEmployerJobDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setSenderId(res.data.id);
          setEmployerId(res.data.id);
          setEmail1(res.data.email);
          axios
            .post(`${url}/api/employer/jobs`, {
              email: res.data.email,
            })
            .then((res) => {
              setEmployerJobDetails(res.data.jobDetails);
              setLoading(false);
            });
        });
    } else {
      window.location = "/";
    }
  };

  useEffect(() => {
    loadSaveFreelancerDetails();
    loadConversations();

    axios.get(`${url}/api/freelancer-detail/${id}`).then((res) => {
      if (res.data) {
        setFreelancerViewData(res.data.readFreelancerDetails);
        setFreelancerBadges(
          res.data.readFreelancerDetails?.map((i) => i?.coursesEnrolled)
        );
        res.data.readFreelancerDetails.map((i) => {
          return i.profilephoto
            ? setProfile(i.profilephoto)
            : setProfile("no-url");
        });
      }
    });

    // eslint-disable-next-line
  }, []);

  const loadConversations = () => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${url}/api/conversations/` + senderId);
        setCurrentChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  };

  const handleSetOpen = async (email) => {
    setOpen(true);
    setFlag(!flag);
    const conversationId = currentChat
      ?.map((m) => m?.members.find((member) => member !== senderId))
      .toString();

    try {
      axios.post(`${url}/api/users-id`, { email }).then((res) => {
        setReceiverId(res.data);
        axios.post(`${url}/api/conversations`, {
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

  const loadSaveFreelancerDetails = () => {
    axios.get(`${url}`, { headers: { authorization } }).then((res) => {
      axios
        .post(`${url}/api/employer/read/save-jobs`, {
          email: res.data.email,
        })
        .then((res) => {
          // console.log("getSaveJobDetails", res);
          setSaveJobs(res.data?.savedJobs);
          setLoading(false);
        });
    });
  };

  const handleSaveFreelancerClick = (freelancerId) => {
    // console.log("id", jobId);
    axios
      .post(`${url}/api/employer/save/jobs`, {
        email: email1,
        freelancerId,
      })
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
          loadSaveFreelancerDetails();
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
          loadSaveFreelancerDetails();
          setLoading(false);
        }
      });
  };

  const handleRemoveSaveFreelancer = (freelancerId) => {
    axios
      .post(`${url}/api/employer/remove/save-jobs`, {
        email: email1,
        freelancerId,
      })
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
          loadSaveFreelancerDetails();
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
          loadSaveFreelancerDetails();
          setLoading(false);
        }
      });
  };

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  const handleOfferClick = () => {
    setShowHoursField(false);
    setShowFixPriceField(false);
  };

  const handleAddHoursButton = () => {
    setShowHoursField(true);
    setShowFixPriceField(false);
    setFixedPrice("");
  };

  const handleFixPriceButton = () => {
    setShowHoursField(false);
    setShowFixPriceField(true);
    setNoOfHours("");
  };

  const handleSentInvitation = () => {
    axios
      .put(`${url}/api/employer/invite`, {
        jobId: jobId,
        freelancerId: freelancerViewData?.map((i) => i?._id).toString(),
        employerId: employerId,
        fixedPrice: fixedPrice,
        noOfHours: noOfHours,
        seen: false,
      })
      .then((res) => {
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
          handleCloseInvitations();
          loadEmployerJobDetails();
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
          loadEmployerJobDetails();
        }
      });
  };

  let chars = [];
  chars.push(
    freelancerBadges?.map((i) =>
      i?.map((c) => c?.courseId?.courseCategory?._id)
    )
  );

  const ratings = freelancerViewData?.map((i) => i.ratings).filter((n) => n);

  return (
    <Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <div>
          <EmployerNavbar setLoading={setLoading} />
          <div style={{ position: "absolute" }} className="w-100">
            <img src={Banner} width="100%" alt="banner" />
          </div>
          <div className="container">
            <div className="view-free-profile">
              <Card>
                <CardContent>
                  <div className="row">
                    <div className="col-md-3 text-center">
                      {profile !== "no-url" ? (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                          }}
                          src={`${url}/${profile}`}
                          className="img-fluid"
                          alt="profile"
                        />
                      ) : (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                          }}
                          src={defaultUserImage}
                          className="img-fluid"
                          alt="profile"
                        />
                      )}
                      <p className="mt-4 mb-1 text-capitalize">
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map((i) => i.firstname)
                          : null}
                        &nbsp;
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map((i) => i.lastname)
                          : null}
                      </p>
                      <p className="mb-1 text-14">
                        Member Since:
                        {freelancerViewData
                          ? moment(freelancerViewData["createdAt"]).format(
                              "MMMM DD,YYYY"
                            )
                          : null}
                      </p>
                      <p className="mb-1 text-14">
                        Years of experience:&nbsp;
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map((i) => i.yearsofexperience)
                          : null}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <Typography
                        className="text-18 text-capitalize"
                        gutterBottom
                        variant="h5"
                        component="h5"
                        color="text.primary"
                      >
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map((i) => i.displayname)
                          : null}
                      </Typography>
                      <Typography
                        className="text-16"
                        gutterBottom
                        variant="h6"
                        component="h6"
                        color="text.secondary"
                      >
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map((i) => i.tagline)
                          : null}
                      </Typography>
                      <p
                        style={{
                          display: "flex",
                          alignContent: "center",
                        }}
                      ></p>
                      <div className="row">
                        <div className="col-sm-4 pe-0 user-text">
                          <Typography
                            className="text-16"
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="text.secondary"
                          >
                            <LocalAtmRoundedIcon
                              style={{
                                color: "#339aff",
                              }}
                            />
                            {freelancerViewData && freelancerViewData.length > 0
                              ? freelancerViewData.map((i) => i.hourrate)
                              : null}
                            $ / hr
                          </Typography>
                        </div>
                        <div className="col-sm-4 pe-0 user-text">
                          <Typography
                            className="text-16"
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="text.secondary"
                          >
                            {freelancerViewData && freelancerViewData.length > 0
                              ? freelancerViewData.map((i) => i.location)
                              : null}
                          </Typography>
                        </div>
                        <div className="col-sm-4 user-text">
                          <Typography
                            className="text-16"
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="text.secondary"
                          >
                            {saveJobs?.jobs?.find(
                              (j) =>
                                j._id ===
                                freelancerViewData?.map((i) => i._id).toString()
                            ) ? (
                              <Fragment>
                                <SavedItems /> Saved
                              </Fragment>
                            ) : null}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="text-capitalize"
                      >
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map((i) => i.displayname)
                          : null}
                      </Typography>
                    </div>
                    <div className="col-md-3 d-flex flex-column">
                      <Button
                        className="btn btn-blue mt-2"
                        onClick={() => {
                          handleSetOpen(
                            freelancerViewData && freelancerViewData.length > 0
                              ? freelancerViewData.map((i) => i.email)
                              : null
                          );
                          loadConversations();
                        }}
                      >
                        <TextsmsRoundedIcon /> Chat Now
                      </Button>

                      <Button
                        className="btn btn-blue mt-2"
                        onClick={() => {
                          handleOpenInvitations();
                          handleOfferClick();
                        }}
                      >
                        <SendIcon /> Invitation
                      </Button>

                      <div>
                        <Modal
                          open={openInvitations}
                          onClose={handleCloseInvitations}
                          aria-labelledby="spring-modal-title"
                          aria-describedby="spring-modal-description"
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Select Job / Project:
                            </Typography>
                            <select
                              defaultValue="select"
                              className="form-control"
                              onChange={(e) => setJobId(e.target.value)}
                            >
                              <option value="select" disabled>
                                Select Job
                              </option>
                              {employerJobDetails?.length > 0
                                ? employerJobDetails?.map((i, index) => {
                                    return (
                                      <React.Fragment key={`key${index}`}>
                                        {i.assign === false ? (
                                          <option value={i?._id}>
                                            {i?.jobtitle}
                                          </option>
                                        ) : null}
                                      </React.Fragment>
                                    );
                                  })
                                : null}
                            </select>
                            <div className="d-flex flex-column mt-2">
                              <Button
                                onClick={handleAddHoursButton}
                                className="btn btn-primary m-1"
                              >
                                Add Hours
                              </Button>
                              <Button
                                onClick={handleFixPriceButton}
                                className="btn btn-primary m-1"
                              >
                                Fixed Price
                              </Button>
                              <Button
                                onClick={handleCloseInvitations}
                                className="btn btn-danger m-1"
                              >
                                Cancel
                              </Button>
                            </div>
                            <div className="row">
                              {showHoursField === true ? (
                                <Fragment>
                                  <div className="col-md-9 mt-2 pr-1">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="No. Of Hours"
                                      onChange={(e) =>
                                        setNoOfHours(e.target.value)
                                      }
                                      onKeyPress={(e) => {
                                        if (
                                          (e.which !== 8 &&
                                            e.which !== 0 &&
                                            e.which < 48) ||
                                          e.which > 57
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="col-md-3 mt-2 pl-1">
                                    <button
                                      style={{
                                        color: "white",
                                      }}
                                      className="btn btn-primary mb-1"
                                      onClick={handleSentInvitation}
                                    >
                                      Send
                                    </button>
                                  </div>
                                </Fragment>
                              ) : null}

                              {showFixPriceField === true ? (
                                <div className="row">
                                  <div className="col-md-10 mt-2 pr-1">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="$ Fixed Price"
                                      onChange={(e) =>
                                        setFixedPrice(e.target.value)
                                      }
                                      onKeyPress={(e) => {
                                        if (
                                          (e.which !== 8 &&
                                            e.which !== 0 &&
                                            e.which < 48) ||
                                          e.which > 57
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="col-md-2 mt-2 pl-1">
                                    <button
                                      style={{
                                        color: "white",
                                      }}
                                      className="btn btn-primary mb-1"
                                      onClick={handleSentInvitation}
                                    >
                                      Send
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </Box>
                        </Modal>
                      </div>

                      {saveJobs?.jobs?.find(
                        (j) =>
                          j._id ===
                          freelancerViewData?.map((i) => i._id).toString()
                      ) ? (
                        <Button
                          style={{
                            textTransform: "none",
                          }}
                          className="btn btn-blue-remove-save-jobs mt-2 w-60"
                          onClick={() =>
                            handleRemoveSaveFreelancer(
                              freelancerViewData?.map((i) => i._id).toString()
                            )
                          }
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-blue-save-jobs1 mt-2 w-60"
                          onClick={() =>
                            handleSaveFreelancerClick(
                              freelancerViewData?.map((i) => i._id).toString()
                            )
                          }
                        >
                          <SavedItem />
                          &nbsp; Click to Save
                        </Button>
                      )}
                      <br />
                      <div className="row">
                        <h6>Badges</h6>
                        {freelancerBadges?.length > 0 ? (
                          freelancerBadges?.map((i) =>
                            i?.map((c, index) => {
                              return (
                                <React.Fragment key={`key${index}`}>
                                  {index === 0 ? (
                                    <div className="col-md-3">
                                      {(c?.quiz?.quizMarks /
                                        c?.quiz?.quizContent?.length) *
                                        100 >
                                      35 ? (
                                        <img
                                          style={{
                                            height: "50px",
                                            width: "50px",
                                          }}
                                          src={`${url}/${c?.courseId?.courseCategory?.categoryBadge}`}
                                          alt="categoryBadge"
                                        />
                                      ) : null}
                                    </div>
                                  ) : null}
                                </React.Fragment>
                              );
                            })
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
                            jobId={""}
                            currentUser={freelancerViewData}
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
                        />
                        <Tab
                          label="Reviews"
                          aria-label="lab API tabs example"
                          value={1}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <div className="row">
                        <div className="col-md-8">
                          {freelancerViewData?.map((i) =>
                            !i?.profilevideo ? (
                              "No Video"
                            ) : (
                              <React.Fragment>
                                <p className="mb-2">Video overview</p>
                                <div className="player-wrapper w-70">
                                  <ReactPlayer
                                    className="react-player"
                                    url={
                                      freelancerViewData
                                        ? freelancerViewData.map(
                                            (i) => i?.profilevideo
                                          )
                                        : "null"
                                    }
                                  />
                                </div>
                              </React.Fragment>
                            )
                          )}
                        </div>
                        {freelancerViewData &&
                        freelancerViewData.map((i) => !i.resume) ? null : (
                          <div className="col-md-4">
                            <Button
                              className="btn btn-blue w-100 mt-4"
                              primary={true}
                              onClick={(e) => handleExportWithComponent()}
                            >
                              Download My Resume
                            </Button>
                            {freelancerViewData && freelancerViewData.length > 0
                              ? freelancerViewData.map((i, index) => (
                                  <PDFExport
                                    ref={pdfExportComponent}
                                    src={i?.resume}
                                    paperSize="A4"
                                    key={`key${index}`}
                                  >
                                    <img
                                      className="image-fluid"
                                      src={i?.resume}
                                      width="130px"
                                      alt="resume"
                                    />
                                  </PDFExport>
                                ))
                              : null}
                          </div>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      {ratings?.map((r, index) => {
                        return (
                          <React.Fragment key={`key${index}`}>
                            {r.map((i, idx) => {
                              return (
                                <div
                                  key={`key${idx}`}
                                  className="row pt-3 pr-1 border-bottom"
                                >
                                  <div className="col-md-1">
                                    {i?.employerId?.profilephoto ? (
                                      <img
                                        style={{
                                          width: "75px",
                                          height: "75px",
                                          borderRadius: "10px",
                                        }}
                                        src={`${url}/${i?.employerId.profilephoto}`}
                                        alt={`${i?.employerId?.displayname}`}
                                      />
                                    ) : (
                                      <img
                                        style={{ width: "50px" }}
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
                                        ${i?.jobId?.projectStatus?.fixedPrice}{" "}
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
                                      {i?.employerId?.displayname}
                                      &nbsp;
                                      <span style={{ color: "black" }}>
                                        ({moment(i?.date, "YYYYMMDD").fromNow()}
                                        )
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-md-3 text-center text-align-center">
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
                            })}
                          </React.Fragment>
                        );
                      })}
                    </TabPanel>
                  </TabContext>
                </Box>
                <div
                  className="mt-4 row"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <div className="col-sm-12 col-md-6">
                    <div className="row">
                      <div className="col-auto">
                        <FlagIcon style={{ color: "#339aff" }} />{" "}
                        <b> Country: </b>
                      </div>
                      <div className="col-auto pl-0">
                        {freelancerViewData && freelancerViewData?.length > 0
                          ? freelancerViewData?.map((i) => i?.location)
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="row">
                      <div className="col-auto">
                        <LocationOnIcon style={{ color: "#339aff" }} />
                        <b> Address: </b>
                      </div>
                      <div className="col-auto pl-0">
                        {freelancerViewData && freelancerViewData.length > 0
                          ? freelancerViewData.map(
                              (i) => i?.billingDetails?.[0]?.address
                            )
                          : null}

                        {freelancerViewData && freelancerViewData?.length > 0
                          ? freelancerViewData?.map(
                              (i) => i?.billingDetails?.[0]?.city
                            )
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <EmployerFooter />
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default FeelancerProfilePage;
