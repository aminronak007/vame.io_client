// @mui material components
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";

// Custom styles for the Tables
import styles from "layouts/project/styles";

// Data
import AddProjectDetails from "./component/AddProjectDetails";
import { url } from "config";
import axios from "axios";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Tables() {
  const classes = styles();
  const [openStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [freelancerBankDetails, setFreelancerBankDetails] = useState([]);
  // eslint-disable-next-line
  const [freelancerPaidId, setFreelancerPaidId] = useState([]);
  const [test, setTest] = useState("");
  // eslint-disable-next-line
  const [freelancerPaidStatus, setFreelancerPaidStatus] = useState([]);
  // eslint-disable-next-line
  const [testStatus, setTestStatus] = useState("");
  const [releasePaymentStatus, setReleasePaymentStatus] = useState("");
  const [paidStatus, setPaidStatus] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}/api/projectslist`)
        .then((res) => {
          setJobDetails(res.data.jobDetails);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      window.location = "/";
    }
  }, [flag]);

  const handleReleasePayment = (release_id) => {
    setFreelancerBankDetails(
      jobDetails?.map((i) =>
        i._id === release_id ? i?.projectStatus?.freelancerBankDetails : null
      )
    );
    setFreelancerPaidId(
      jobDetails?.map((i) => (i._id === release_id ? setTest(i?._id) : null))
    );
    setFreelancerPaidStatus(
      jobDetails?.map((i) =>
        i._id === release_id
          ? setTestStatus(i?.projectStatus?.releasePaymentStatus)
          : null
      )
    );
    setFlag(!flag);
  };

  const handlePaidtoFreelancerPayment = (id) => {
    axios
      .post(`${url}/api/release/payment/status`, { jobId: id })
      .then((res) => {
        setReleasePaymentStatus(res.data.success);
      });
    setFlag(!flag);
  };

  const columns = [
    { name: "Sr No", align: "center" },
    { name: "Title", align: "center" },
    { name: "Posted by", align: "center" },
    { name: "Status", align: "center" },
    { name: "Date", align: "center" },
    { name: "Release payment", align: "center" },
    { name: "Project Type", align: "center" },
    { name: "Price", align: "center" },
    // { name: "Skill", align: "center" },
    // { name: "Action", align: "center" },
  ];

  const rows = [];

  const searched = (key) => (c) => c?.jobtitle.toLowerCase().includes(key);

  if (jobDetails.length > 0) {
    jobDetails.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        "Sr No": idx + 1,
        Title: item?.jobtitle,
        "Posted by": item?.email,
        Status: (
          <SuiBadge
            variant="gradient"
            badgeContent={
              item.projectStatus
                ? item?.projectStatus?.proStatus?.status ||
                  (item?.projectStatus?.employerStatus?.status ===
                    "In Progress" && !item?.projectStatus?.proStatus
                    ? "Not Accept by Freelancer"
                    : null)
                : "Not Assigned"
            }
            color={
              item?.projectStatus?.proStatus?.status === "Not Verified"
                ? "dark"
                : item?.projectStatus?.proStatus?.status === "In Progress"
                ? "info"
                : item?.projectStatus?.proStatus?.status === "Cancelled"
                ? "primary"
                : item?.projectStatus?.proStatus?.status === "Completed"
                ? "success"
                : item?.projectStatus?.proStatus?.status === "Hold"
                ? "warning"
                : "light"
            }
            size="extra-small"
          />
        ),
        Date: moment(item?.updatedAt).format("LL"),
        "Release payment":
          item?.projectStatus?.freelancerPaymentStatus === "Applied" ? (
            item?.projectStatus?.releasePaymentStatus === true ? (
              <span
                onClick={() => {
                  handleOpenStatus();
                  handlePaidtoFreelancerPayment(item._id);
                  setPaidStatus(!paidStatus);
                }}
                className="project-status-release-payment"
              >
                Payment Paid
              </span>
            ) : (
              <span
                onClick={() => {
                  handleOpen();
                  handleReleasePayment(item._id);
                }}
                className="project-status-release-payment"
              >
                Release Payment
              </span>
            )
          ) : (
            "-"
          ),
        "Project Type": item?.hourrate ? "Hourly" : "-",
        Price: 0,
        // Skill:
        // item?.skills.length > 0 ? item?.skills.map((s) => s.skills) : "-",
        // Action: (
        //   <SuiTypography
        //     component="a"
        //     href="#"
        //     variant="caption"
        //     textColor="secondary"
        //     fontWeight="medium"
        //   >
        //     Edit
        //   </SuiTypography>
        // ),
      })
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiTypography>
          <AddProjectDetails />
        </SuiTypography>

        <SuiBox mb={3}>
          <Card style={{ padding: "15px" }}>
            <SuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SuiTypography variant="h6">Projects</SuiTypography>
            </SuiBox>
            <SuiBox pr={1}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              >
                <div></div>
                <div>
                  <SuiInput
                    size="medium"
                    placeholder="Type here..."
                    onChange={(e) => setKeyword(e.target.value)}
                    withIcon={{
                      icon: "search",
                      direction: "left",
                    }}
                    customClass={classes.navbar_input}
                  />
                </div>
              </div>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
              {isLoading ? (
                <div className="text-center">
                  <i className="spinner-border"></i>
                </div>
              ) : (
                <Table columns={columns} rows={rows} />
              )}
            </SuiBox>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openStatus}
              onClose={handleCloseStatus}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openStatus}>
                <Box sx={style}>
                  <Typography
                    className="text-center"
                    id="transition-modal-title"
                    variant="h4"
                    component="h6"
                  >
                    {releasePaymentStatus}
                  </Typography>
                </Box>
              </Fade>
            </Modal>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    className="text-center"
                    id="transition-modal-title"
                    variant="h4"
                    component="h6"
                  >
                    Freelancer Bank Account Details
                  </Typography>
                  <Typography
                    className="text-center"
                    id="transition-modal-description"
                    variant="h6"
                    sx={{ mt: 2 }}
                  >
                    <div>
                      Bank Name :{" "}
                      {freelancerBankDetails?.map((i) => i?.bankName)}
                    </div>
                    <div>
                      Account No :{" "}
                      {freelancerBankDetails?.map((i) => i?.accountNo)}
                    </div>
                    <div>
                      IFSC Code :{" "}
                      {freelancerBankDetails?.map((i) => i?.ifscCode)}
                    </div>
                    <div>
                      Mobile No : {freelancerBankDetails?.map((i) => i?.mobile)}
                    </div>
                    <button
                      className="btn btn-accept mt-3"
                      onClick={() => {
                        handlePaidtoFreelancerPayment(test);
                      }}
                    >
                      Paid
                    </button>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </Card>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
