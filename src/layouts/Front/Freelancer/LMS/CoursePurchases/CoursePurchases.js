import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
import { url } from "config";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FreelancerSideber from "../../FreaalancerSidebar/FreelancerSidebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router";
import DefaultImage from "assets/images/fillvaAcademy/fillva_academy.png";
import moment from "moment";
import heartLogo from "../../image/img-03.png";

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

function FreelancerCourses() {
  let history = useHistory();
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let [loading, setLoading] = useState(true);
  const [freelancerEnrolledCourses, setFreelancerEnrolledCourses] = useState(
    []
  );
  const [freelancerPurchaseCourses, setFreelancerPurchaseCourses] = useState(
    []
  );

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  useEffect(() => {
    loadFreelancerDetails();
    // eslint-disable-next-line
  }, []);

  const loadFreelancerDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setLoading(false);
          axios
            .post(`${url}/api/enrolled/courses`, {
              email: res.data.email,
            })
            .then((result) => {
              setFreelancerEnrolledCourses(
                result.data.freelancerDetails.coursesEnrolled
              );
              setFreelancerPurchaseCourses(
                result.data.freelancerDetails.purchaseCourses
              );
            });
        });
    } else {
      window.location = "/";
    }
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
                      label="All Courses"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{
                        textAlign: "left",
                      }}
                      label="Purchase Courses"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                  <TabPanel value={value} index={0} className="edit-tab ">
                    <div className="row">
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        All Courses
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "black",
                        }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            {freelancerEnrolledCourses?.length > 0 ? (
                              freelancerEnrolledCourses?.map((i, index) => {
                                return (
                                  <div
                                    key={`key${index}`}
                                    className="row align-items-center mt-4"
                                  >
                                    <div className="col-md-10 text-left">
                                      <b
                                        style={{
                                          fontSize: "16px",
                                        }}
                                      >
                                        {i?.courseId?.courseTitle}
                                      </b>
                                      &ensp;
                                      <div className="row mt-2 text-justify">
                                        <div className="col-md-3">
                                          {i?.courseId?.courseImageUrl ? (
                                            <img
                                              className="img-fluid"
                                              src={`${url}/${i?.courseId?.courseImageUrl}`}
                                              alt="courseImageUrl"
                                            />
                                          ) : (
                                            <img
                                              className="img-fluid"
                                              style={{
                                                height: "80px",
                                              }}
                                              src={DefaultImage}
                                              alt="DefaultImage"
                                            />
                                          )}
                                        </div>
                                        <div className="col-md-9">
                                          <p className="pt-2 pt-md-0">
                                            {i?.courseId?.courseDescription}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-2">
                                      <Button
                                        onClick={() =>
                                          history.push(
                                            `/course/${i?.courseId?.slug}`
                                          )
                                        }
                                        className="btn btn-accept w-100 d-flex justify-content-center"
                                      >
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div
                                className="pb-4"
                                style={{
                                  justifyContent: "center",
                                  border: "1px black",
                                }}
                              >
                                <img src={heartLogo} alt="heartLogo" />
                                <p>You have no Courses list.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Typography>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1} className="edit-tab ">
                    <div className="row">
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Purchase Courses
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "black",
                        }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            {freelancerPurchaseCourses?.length > 0 ? (
                              freelancerPurchaseCourses?.map((i, index) => {
                                return (
                                  <div
                                    key={`key${index}`}
                                    className="row align-items-center mt-4"
                                  >
                                    <div className="col-md-10 text-left">
                                      <b
                                        style={{
                                          fontSize: "16px",
                                        }}
                                      >
                                        {i?.courseId?.courseTitle}
                                      </b>
                                      &ensp;
                                      <div className="row mt-2 text-justify">
                                        <div className="col-lg-2 col-md-6">
                                          {i?.courseId?.courseImageUrl ? (
                                            <img
                                              className="img-fluid"
                                              src={`${url}/${i?.courseId?.courseImageUrl}`}
                                              alt="courseImageUrl"
                                            />
                                          ) : (
                                            <img
                                              className="img-fluid"
                                              style={{
                                                height: "80px",
                                              }}
                                              src={DefaultImage}
                                              alt="DefaultImage"
                                            />
                                          )}
                                        </div>
                                        <div className="col-lg-2 col-md-6 mt-2 mt-md-0">
                                          <h6>Order Id</h6>
                                          <p style={{ wordBreak: "break-all" }}>
                                            {i?.orderId}
                                          </p>
                                        </div>
                                        <div className="col-lg-2 col-md-6 mt-2 mt-lg-0">
                                          <h6>Order Date</h6>
                                          <p>
                                            {moment(i?.orderDate).format(
                                              "DD-MMM-YYYY"
                                            )}
                                          </p>
                                        </div>
                                        <div className="col-lg-6 col-md-6 mt-2 mt-lg-0">
                                          <h6>More Details</h6>
                                          <p>
                                            Please click on view button to see
                                            Invoice details.
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-2">
                                      <Button
                                        onClick={() =>
                                          history.push(
                                            `/freelancer/order/${i?.courseId?._id}`
                                          )
                                        }
                                        className="btn btn-accept w-100 d-flex justify-content-center"
                                      >
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div
                                className="pb-4"
                                style={{
                                  justifyContent: "center",
                                  border: "1px black",
                                }}
                              >
                                <img src={heartLogo} alt="heartLogo" />
                                <p>You have no Purchase Courses list.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Typography>
                    </div>
                  </TabPanel>
                </Box>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default FreelancerCourses;
