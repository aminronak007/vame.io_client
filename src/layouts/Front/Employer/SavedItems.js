import React, { Fragment, useEffect, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import heartLogo from "./images/img-05.png";
import EmployerSidebar from "./EmployerSidebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import { CardMedia } from "@mui/material";
import defaultUserImage from "assets/defaultImages/defaultUserImage.png";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import axios from "axios";
import { url } from "config";
import { Link } from "react-router-dom";

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

function SavedItems() {
  const [value, setValue] = React.useState(0);
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;
  const [savedJobs, setSaveJobs] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}`, { headers: { authorization } }).then((res) => {
        axios
          .post(`${url}/api/employer/read/save-jobs`, {
            email: res.data.email,
          })
          .then((res) => {
            setSaveJobs(res.data.savedJobs);
            setLoading(false);
            // console.log("save", res);
          });
      });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, [savedJobs?.jobs?.length]);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  return (
    <Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="padding-left">
            <EmployerNavbar style={{ position: "absolute" }} />
          </div>
          <div className="row mx-0" style={{ marginTop: "40px" }}>
            <div className="col-1">
              <EmployerSidebar />
            </div>
            <div className="col-12 right-content mt-20">
              <div className="container white-box">
                <div className="row">
                  <div className="col-lg-9">
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
                          label="Liked Freelancer"
                          {...a11yProps(0)}
                        />
                      </Tabs>
                      <TabPanel
                        value={value}
                        index={0}
                        className="edit-tab border-right"
                      >
                        <div className="row">
                          <Typography
                            variant="h5"
                            component="div"
                            className="postjob-fontsize"
                          >
                            Liked Freelancer
                          </Typography>
                          {savedJobs?.jobs && savedJobs?.jobs.length > 0 ? (
                            savedJobs?.jobs?.reverse().map((i, index) => {
                              return (
                                <Card
                                  key={`key${index}`}
                                  className="employer-deshboard-card mt-3"
                                >
                                  <CardContent className="p-0">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-xl-2 col-md-4 col-xs-12">
                                            {i.profilephoto ? (
                                              <CardMedia
                                                component="img"
                                                style={{
                                                  width: "80px",
                                                  height: "80px",
                                                }}
                                                image={`${url}/${i.profilephoto}`}
                                                alt="img"
                                              />
                                            ) : (
                                              <CardMedia
                                                component="img"
                                                style={{
                                                  width: "80px",
                                                  height: "80px",
                                                }}
                                                image={defaultUserImage}
                                                alt="default-image"
                                              />
                                            )}
                                          </div>
                                          <div className="col-xl-10 col-md-8 col-xs-12">
                                            <Typography
                                              className="text-14"
                                              gutterBottom
                                              variant="h5"
                                              component="div"
                                              color="text.secondary"
                                            >
                                              <Link
                                                style={{
                                                  cursor: "pointer",
                                                  color: "#339aff",
                                                }}
                                                to={`/employer/FreelancerProfilePage/${i._id}`}
                                              >
                                                {i.displayname}
                                              </Link>
                                              {/* <a
                                                                                                    
                                                                                                    onClick={() =>
                                                                                                        history.push(
                                                                                                            
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    
                                                                                                </a> */}
                                            </Typography>
                                            <p
                                              style={{
                                                display: "flex",
                                                alignContent: "center",
                                              }}
                                            >
                                              <Typography
                                                className="text-14"
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                color="text.secondary"
                                              >
                                                <LocalAtmRoundedIcon
                                                  style={{
                                                    color: "#339aff",
                                                  }}
                                                />{" "}
                                                {i.hourrate} $ / hr
                                              </Typography>
                                              <Divider orientation="vertical" />
                                              <Typography
                                                className="text-14"
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                color="text.secondary"
                                              >
                                                {i.location}
                                              </Typography>
                                            </p>
                                          </div>
                                        </div>
                                        <div className="row mt-md-3 mt-sm-0">
                                          <div className="col-12">
                                            <Typography
                                              variant="body2"
                                              color="text.secondary"
                                            >
                                              We run a digital media company
                                              that provides services in all
                                              digital media areas in one place
                                              (graphic design, digital
                                              marketing, website building,
                                              content writing, etc.). We are
                                              looking for…
                                            </Typography>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })
                          ) : (
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "black",
                              }}
                            >
                              <div className="row mt-3">
                                <div className="col-12 text-center">
                                  <div
                                    className="pb-4"
                                    style={{
                                      justifyContent: "center",
                                      border: "1px black",
                                      // height: "800px",
                                    }}
                                  >
                                    <img src={heartLogo} alt="logo" />
                                    <p>
                                      You have no freelancers in your favorite
                                      list.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Typography>
                          )}
                        </div>
                      </TabPanel>
                    </Box>
                  </div>
                  <div className="col-lg-3 ps-lg-2">
                    <div
                      className="me-lg-3"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "2px",
                        padding: "12px",
                        fontSize: "14px",
                      }}
                    >
                      <span>Freelancers</span>
                      <hr />
                      <span>{savedJobs?.jobs?.length}</span>
                      <br />
                      <span> liked freelancers </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default SavedItems;
