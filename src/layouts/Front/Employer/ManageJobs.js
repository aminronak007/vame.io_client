import React, { useEffect, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import EmployerSidebar from "./EmployerSidebar";
import { url } from "config";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router";
import Modal from "@mui/material/Modal";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring/web.cjs";
import Rating from "@mui/material/Rating";
import PendingPayments from "./ManageJobs/PendingPayments";
import OnGoingJobs from "./ManageJobs/OnGoingJobs";
import CompletedJobs from "./ManageJobs/CompletedJobs";
import CancelledJobs from "./ManageJobs/CancelledJobs";

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

const styleRating = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ManageJobs() {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;

  const [freelancerId, setFreelancerId] = React.useState();
  let [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const [ratingValue, setRatingValue] = React.useState(0);
  const [description, setDescription] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [employerId, setEmployerId] = useState("");

  const [noOfHours, setNoOfHours] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");

  const [showFixPriceField, setShowFixPriceField] = useState(false);
  const [showHoursField, setShowHoursField] = useState(false);
  const [openInvitations, setOpenInvitations] = useState(false);
  const handleOpenInvitations = () => setOpenInvitations(true);
  const handleCloseInvitations = () => setOpenInvitations(false);

  const [pendingPayments, setPendingPayments] = useState([]);
  const [onGoingJobs, setOnGoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, []);

  const loadDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          axios
            .post(`${url}/api/employer/job`, { email: res.data.email })
            .then((response) => {
              setPendingPayments(response.data.pendingPayments);
              setOnGoingJobs(response.data.currentJobs);
              setCompletedJobs(response.data.completedJobs);
              setCancelledJobs(response.data.cancelledJobs);
            });
          axios
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((result) => {
              setEmployerId(result.data.employerDetails._id);
            });
          axios
            .post(`${url}/api/employer/jobs`, {
              email: res.data.email,
            })
            .then((res) => {
              setLoading(false);
            });
        });
    } else {
      window.location = "/";
    }
  };

  const handleRejectProject = (id) => {
    let a = false;
    axios
      .post(`${url}/api/employer/cancel-projects/${id}`, { assign: a })
      .then((res) => {
        loadDetails();
      });
  };

  const handleProjectCompleted = (id) => {
    axios.post(`${url}/api/employer/project-completed/${id}`).then((res) => {
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
        loadDetails();
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

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  const handleRatings = (jobId, freelancerId) => {
    axios
      .put(`${url}/api/employer/ratings`, {
        employerId,
        ratingValue,
        jobId,
        freelancerId,
        description,
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
          setRatingValue(0);
          loadDetails();
          handleClose();
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
        }
      });
  };

  const handleSentInvitation = (jobId, freelancerId) => {
    axios
      .put(`${url}/api/employer/invite`, {
        jobId: jobId,
        freelancerId: freelancerId,
        employerId: employerId,
        fixedPrice: fixedPrice,
        noOfHours: noOfHours,
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
          loadDetails();
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
          loadDetails();
        }
      });
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

  return (
    <>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <>
          <div className="padding-left">
            <EmployerNavbar style={{ position: "absolute" }} />
          </div>
          <div className="row mx-0" style={{ marginTop: "40px" }}>
            <div className="col-1">
              <EmployerSidebar />
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
                      label="Pending Payments"
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
                      label="Completed Jobs"
                      {...a11yProps(2)}
                    />
                    <Tab
                      style={{
                        textAlign: "left",
                      }}
                      label="Cancelled Jobs"
                      {...a11yProps(3)}
                    />
                  </Tabs>

                  <TabPanel value={value} index={0} className="edit-tab">
                    <PendingPayments
                      pendingPayments={pendingPayments}
                      handleSentInvitation={handleSentInvitation}
                      handleOpenInvitations={handleOpenInvitations}
                      openInvitations={openInvitations}
                      handleCloseInvitations={handleCloseInvitations}
                      handleAddHoursButton={handleAddHoursButton}
                      handleFixPriceButton={handleFixPriceButton}
                      showHoursField={showHoursField}
                      setNoOfHours={setNoOfHours}
                      showFixPriceField={showFixPriceField}
                      setFixedPrice={setFixedPrice}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={1} className="edit-tab">
                    <OnGoingJobs
                      handleRejectProject={handleRejectProject}
                      history={history}
                      handleProjectCompleted={handleProjectCompleted}
                      onGoingJobs={onGoingJobs}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={2} className="edit-tab">
                    <CompletedJobs
                      completedJobs={completedJobs}
                      handleOpen={handleOpen}
                      Rating={Rating}
                      setFreelancerId={setFreelancerId}
                    />
                  </TabPanel>

                  <TabPanel value={value} index={3} className="edit-tab">
                    <CancelledJobs cancelledJobs={cancelledJobs} />
                  </TabPanel>
                </Box>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        {/* <Fade in={open}> */}
        <Box sx={styleRating}>
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
                onClick={() =>
                  handleRatings(
                    freelancerId._id,
                    freelancerId.assignedFreelancer
                  )
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
        {/* </Fade> */}
      </Modal>
    </>
  );
}
export default ManageJobs;
