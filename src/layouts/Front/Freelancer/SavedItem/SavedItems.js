import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import jobLogo from "../image/job-type.png";
import saveLogo from "../image/favorite.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import heartLogo from "../image/img-05.png";
import FreelancerSideber from "../FreaalancerSidebar/FreelancerSidebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { url } from "config";
import { useHistory } from "react-router";

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
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  const [savedJobs, setSaveJobs] = useState({});
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}`, { headers: { authorization } }).then((res) => {
        axios
          .post(`${url}/api/read/save-jobs`, { email: res.data.email })
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  const handleClick = (slug) => {
    history.push(`/freelancer/view-job/${slug}`);
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
                          label="Saved Jobs"
                          {...a11yProps(0)}
                        />
                        <Tab
                          style={{
                            textAlign: "left",
                          }}
                          label="Followed Companies"
                          {...a11yProps(1)}
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
                            Saved Jobs
                          </Typography>

                          {savedJobs?.jobs && savedJobs?.jobs.length > 0 ? (
                            savedJobs?.jobs?.reverse().map((i, index) => {
                              return (
                                <div
                                  style={{
                                    marginLeft: "0px",
                                  }}
                                  className="row white-box mt-4"
                                  key={`key${index}`}
                                >
                                  <div className="col-md-12 col-lg-8 col-xl-9">
                                    <Card
                                      sx={{}}
                                      style={{
                                        boxShadow: "none",
                                        paddingLeft: "2px",
                                      }}
                                    >
                                      <CardContent className="p-0">
                                        <Typography
                                          gutterBottom
                                          variant="h5"
                                          component="div"
                                        >
                                          {i.jobtitle}
                                        </Typography>

                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {i.jobdescription}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  <div className="col-md-12 col-lg-4 col-xl-3 mt-2 mt-md-0">
                                    <Card
                                      sx={{}}
                                      style={{
                                        boxShadow: "none",
                                        overflow: "visible",
                                      }}
                                    >
                                      <CardContent className="p-0">
                                        <div className="d-flex">
                                          <img
                                            src={jobLogo}
                                            height="22"
                                            width="22"
                                            alt="logo"
                                          />
                                          &ensp;{" "}
                                          <p
                                            style={{
                                              fontSize: "13px",
                                            }}
                                          >
                                            Project type: Fixed Price{" "}
                                          </p>
                                        </div>
                                        <div className="d-flex">
                                          <img
                                            src={saveLogo}
                                            alt="logo"
                                            height="22"
                                            width="22"
                                          />
                                          &ensp;{" "}
                                          <p
                                            style={{
                                              fontSize: "13px",
                                            }}
                                          >
                                            Save
                                          </p>
                                        </div>
                                        <Button
                                          className="btn btn-blue-save-jobs w-60"
                                          size="small"
                                          color="secondary"
                                          onClick={() => handleClick(i.slug)}
                                        >
                                          View Job
                                        </Button>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
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
                                    <p>You have no job your favorite list.</p>
                                  </div>
                                </div>
                              </div>
                            </Typography>
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel
                        value={value}
                        index={1}
                        className="edit-tab border-right"
                      >
                        <div className="row">
                          <Typography
                            variant="h5"
                            component="div"
                            className="postjob-fontsize"
                          >
                            Followed Companies
                          </Typography>
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
                                    You have no companies in your favorite list.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Typography>
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
                      <span>Jobs</span>
                      <hr />
                      <span>{savedJobs?.jobs?.length}</span>
                      <br />
                      <span> Saved jobs </span>
                    </div>
                    <div
                      className="me-lg-3 mt-4"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "2px",
                        padding: "12px",
                        fontSize: "14px",
                      }}
                    >
                      <span>Employers</span>
                      <hr />
                      <span> 0 </span>
                      <br />
                      <span> followed companies </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default SavedItems;
