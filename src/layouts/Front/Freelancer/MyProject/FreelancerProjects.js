import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import { url } from "config";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FreelancerSideber from "../FreaalancerSidebar/FreelancerSidebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring/web.cjs";
import Rating from "@mui/material/Rating";
import PendingInvitations from "./Tabs/PendingInvitations";
import OnGoingJobs from "./Tabs/OnGoingJobs";
import CompletedJobs from "./Tabs/CompletedJobs";
import CancelledJobs from "./Tabs/CancelledJobs";

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

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function FreelancerProject() {
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let [loading, setLoading] = useState(true);
  const [numberOfHours, setNumberOfHours] = useState(0);
  const [freelancerReviewId, setFreelancerReviewId] = useState("");
  const [freelancerId, setFreelancerId] = useState("");
  const [open, setOpen] = React.useState(false);

  const [ratingValue, setRatingValue] = React.useState(0);
  const [description, setDescription] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [invitations, setInvitations] = useState([]);
  const [onGoingJobs, setOnGoingJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  useEffect(() => {
    freelancerload();
    // eslint-disable-next-line
  }, []);

  const freelancerload = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}`, { headers: { authorization } }).then((res) => {
        axios.post(`${url}/api/freelancer/notifications`, {
          email: res.data.email,
        });
        axios
          .post(`${url}/api/freelancer-details`, {
            email: res.data.email,
          })
          .then((res) => {
            setFreelancerId(res.data.freelancerDetails._id);
            setLoading(false);
          });

        axios
          .post(`${url}/api/freelancer/invitations`, {
            email: res.data.email,
          })
          .then((resp) => {
            setInvitations(resp.data);
          });

        axios
          .post(`${url}/api/freelancer/jobs`, { email: res.data.email })
          .then((resp) => {
            setOnGoingJobs(resp.data.currentJobs);
            setCompletedJobs(resp.data.completedJobs);
            setCancelledJobs(resp.data.cancelledJobs);
          });
      });
    } else {
      window.location = "/";
    }
  };

  const handleAcceptByFreelancer = (id) => {
    axios
      .post(`${url}/api/freelancer/accept-project/${id}`, {
        numberOfHours,
      })
      .then((res) => {
        // setAcceptByFreelancer(res.data);
        if (res.data.success) {
          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          freelancerload();
        } else if (res.data.error) {
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const handleRejectByFreelancer = (id) => {
    axios.post(`${url}/api/freelancer/cancel-project/${id}`).then((res) => {
      // setRejectByFreelancer(res.data);
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
        freelancerload();
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
    });
  };

  const handleProjectCompleted = (id) => {
    axios.post(`${url}/api/freelancer/project-completed/${id}`).then((res) => {
      // setCompletedByFreelancer(res.data);
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
        freelancerload();
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
    });
  };

  const handleRatings = (jobId, email) => {
    axios
      .put(`${url}/api/freelancer/ratings`, {
        freelancerId,
        ratingValue,
        jobId,
        email,
        description,
      })
      .then((res) => {
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
          setRatingValue(0);
          freelancerload();
          handleClose();
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
          setRatingValue(0);
          freelancerload();
        }
      });
  };

  const handleAcceptInvitation = (jobId, eId, fp, hours) => {
    axios
      .put(`${url}/api/freelancer/accept/invitation`, {
        jobId: jobId,
        freelancerId: freelancerId,
        employerId: eId,
        fixedPrice: fp,
        noOfHours: hours,
        invitationStatus: true,
      })
      .then((res) => {
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
          freelancerload();
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
          freelancerload();
        }
      });
  };

  const handleRejectInvitation = (jobId, eId, fp, hours) => {
    axios
      .put(`${url}/api/freelancer/reject/invitation`, {
        jobId: jobId,
        freelancerId: freelancerId,
        employerId: eId,
        fixedPrice: fp,
        noOfHours: hours,
        invitationStatus: false,
      })
      .then((res) => {
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
          freelancerload();
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
          freelancerload();
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
          <div className="padding-left">
            <FreelancerNavbar style={{ position: "absolute" }} />
          </div>
          <div className="row mx-0" style={{ marginTop: "40px" }}>
            <div className="col-1">
              <FreelancerSideber />
            </div>
            <div className="col-12 right-content mt-20">
              <div className="container white-box">
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Tab
                      style={{
                        textAlign: "left",
                      }}
                      label="Pending Invitations"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{
                        textAlign: "left",
                      }}
                      label="On Going Jobs"
                      {...a11yProps(1)}
                    />
                    <Tab
                      style={{
                        textAlign: "left",
                      }}
                      label="Completed Job"
                      {...a11yProps(2)}
                    />
                    <Tab
                      style={{
                        textAlign: "left",
                      }}
                      label="Cancelled Job"
                      {...a11yProps(3)}
                    />
                  </Tabs>

                  <TabPanel value={value} index={0} className="edit-tab ">
                    <PendingInvitations
                      invitations={invitations}
                      handleAcceptInvitation={handleAcceptInvitation}
                      handleRejectInvitation={handleRejectInvitation}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={1} className="edit-tab ">
                    <OnGoingJobs
                      onGoingJobs={onGoingJobs}
                      handleProjectCompleted={handleProjectCompleted}
                      setNumberOfHours={setNumberOfHours}
                      handleAcceptByFreelancer={handleAcceptByFreelancer}
                      handleRejectByFreelancer={handleRejectByFreelancer}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={2} className="edit-tab">
                    <CompletedJobs
                      completedJobs={completedJobs}
                      freelancerId={freelancerId}
                      Rating={Rating}
                      handleOpen={handleOpen}
                      setFreelancerReviewId={setFreelancerReviewId}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={3} className="edit-tab ">
                    <CancelledJobs cancelledJobs={cancelledJobs} />
                  </TabPanel>
                </Box>
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className="white-box1" sx={style}>
                <Rating
                  name="size-large"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  size="large"
                />
                <br />
                <label>
                  <strong>Write a Review</strong>
                </label>
                <textarea
                  id="w3review"
                  name="w3review"
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="form-control"
                  placeholder="Write a Review..."
                ></textarea>

                <div class="d-flex">
                  <div class="mr-auto p-2"></div>
                  <div class="p-2"></div>
                  <div class="pt-2">
                    <Button
                      onClick={
                        () =>
                          handleRatings(
                            freelancerReviewId.jobId,
                            freelancerReviewId.email
                          )
                        // handleRatings(i?.jobId?._id, i?.jobId?.email)
                      }
                      className="btn btn-primary"
                    >
                      Submit
                    </Button>
                    &nbsp;
                    <Button onClick={handleClose} className="btn btn-danger">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Box>
            </Fade>
          </Modal>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default FreelancerProject;
