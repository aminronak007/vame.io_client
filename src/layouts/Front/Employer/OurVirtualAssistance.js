import React, { Fragment, useEffect, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import ReactPlayer from "react-player";
import Button from "@mui/material/Button";
import Slide from "./Slide";
import EmployerFooter from "./EmployerFooter";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { CardContent, CardMedia, TextField } from "@mui/material";
import { Card } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import axios from "axios";
import { url } from "config";
import { useHistory } from "react-router";
import defaultUserImage from "assets/defaultImages/defaultUserImage.png";
import ClipLoader from "react-spinners/ClipLoader";
import { NavLink, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

function OurVirtualAssistance() {
  const [expanded, setExpanded] = React.useState(false);
  let history = useHistory();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [hurlyRateFilter, setHurlyRateFilter] = useState({
    four: "",
    three: "",
    two: "",
    one: "",
  });
  // eslint-disable-next-line
  const [passedExamFilter, setpassedExamFilter] = useState([]);
  const [englishLevelFilter, setEnglishLevelFilter] = useState("");
  const [freelancerData, setFreelancerData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterData, setFilterData] = useState(null);
  let [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [currPage, setCurrPage] = useState(0);
  const [curr, setCurr] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleHourlyRate = (e) => {
    const checked = e.target.checked;
    const { name, value } = e.target;
    if (
      (!hurlyRateFilter.four && checked) ||
      (!hurlyRateFilter.three && checked) ||
      (!hurlyRateFilter.two && checked) ||
      (!hurlyRateFilter.one && checked)
    ) {
      setHurlyRateFilter({
        ...hurlyRateFilter,
        [name]: value,
      });
    } else {
      setHurlyRateFilter({
        ...hurlyRateFilter,
        [name]: "",
      });
    }
  };

  const handlePassedExam = (e) => {
    setpassedExamFilter(e.target.value);
  };

  const handleEnglishLevel = (e) => {
    setEnglishLevelFilter(e.target.value);
  };

  useEffect(() => {
    loadDataWithPages();
    // eslint-disable-next-line
  }, []);

  const loadDataWithPages = (page) => {
    let curr = page ? page : currPage;
    if (localStorage.getItem("pwd")) {
      axios.post(`${url}/api/freelancer-detail`, { curr }).then((res) => {
        setFreelancerData(res.data.freelancerDetails);
        setTotalPages(res.data.totalPages);
        setCurr(res.data.curr + 1);
        setLoading(false);
      });
    } else {
      window.location = "/";
    }
  };

  const searched = (key) => (c) =>
    c.displayname ? c.displayname.toLowerCase().includes(key) : null;

  const handleApplyFilter = () => {
    axios
      .post(`${url}/api/freelancer/filters`, {
        englishLevelFilter,
        hurlyRateFilter,
      })
      .then((res) => {
        setFilterData(res.data.filterData);
        setFreelancerData([]);
      });
  };

  const passedExam = [
    { name: "Adobe After Effects" },
    { name: "Adobe InDesign" },
    { name: "Ali Express Tools" },
    { name: "Ali Express - Order fulfillment" },
    { name: "Amazon Full Research" },
    { name: "Animaker Course" },
    { name: "Auto DS Monitor Guide" },
    { name: "Canva Designs" },
    { name: "Cashdo Course" },
    { name: "Comic Effects" },
    { name: "Content Writing 101" },
    { name: "Customer service" },
    { name: "Dropeex" },
    { name: "eBay Basics" },
    { name: "Fillva Course" },
    { name: "Google Sheet" },
    { name: "Graphic Design" },
    { name: "Home Depot" },
    { name: "How To Manage A Facebook Page" },
    { name: "How To Manage A YouTube Account" },
    { name: "How to Manage Linkedin Account" },
    { name: "How to Manage Twitter Account" },
    { name: "Illustrator Basic" },
    { name: "Instagram Account manage" },
    { name: "KalDrop Monitor Guide" },
    { name: "Kamatera" },
    { name: "Market research - Power Drop" },
    { name: "Market research - ZIK Analytics" },
    { name: "Order fulfillment - Amazon" },
    { name: "Photoshop Basics" },
    { name: "Photoshop Experts" },
    { name: "Portfolio" },
    { name: "Price Backers" },
    { name: "Product Designing" },
    { name: "Real Estate VA" },
    { name: "Shopify Basics" },
    { name: "Shopify Experts" },
    { name: "Social Media Content Creation" },
    { name: "SuperDS Monitor Guide" },
    { name: "SurfShark VPN" },
    { name: "Triple Mars Monitor Guide" },
    { name: "Video Editing through Filmora 9" },
    { name: "Walmart" },
    { name: "Wordpress" },
    { name: "Yaballe Monitor Guide" },
    { name: "Zoom Full Course" },
  ];

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
          <div>
            <EmployerNavbar />
          </div>
          <div className="container">
            <div className="white-box" style={{ marginTop: "40px" }}>
              <Slide />
            </div>
            <div
              className="white-box"
              style={{
                marginTop: 40,
                marginBottom: 40,
                padding: 36,
              }}
            >
              <div className="row">
                <div className="col-lg-3">
                  <div>
                    <p>
                      <b> Filter freelancers by </b>
                    </p>
                    <hr />
                    <div className="mb-3">
                      <p className="text-14 mb-1">Start Your Search</p>
                      <TextField
                        fullWidth
                        placeholder="Type Keyword"
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        onClick={() => {
                          setEnglishLevelFilter("");
                          setpassedExamFilter("");
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography>Hourly Rate</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormControl component="fieldset">
                            <FormGroup
                              aria-label="gender"
                              name="radio-buttons-group"
                              onChange={(e) => handleHourlyRate(e)}
                            >
                              <FormControlLabel
                                control={<Checkbox name="four" value="4" />}
                                label="$4+"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox name="three" value="3 to 4" />
                                }
                                label="$3 to 4"
                              />
                              <FormControlLabel
                                control={<Checkbox name="two" value="2 to 3" />}
                                label="$2 to 3"
                              />
                              <FormControlLabel
                                control={<Checkbox name="one" value="1 to 2" />}
                                label="$1 to 2"
                              />
                            </FormGroup>
                          </FormControl>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        onClick={() => {
                          setEnglishLevelFilter("");
                          setHurlyRateFilter("");
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                        >
                          <Typography>Passed Exams</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{
                            overflow: "scroll",
                            overflowX: "hidden",
                            height: "200px",
                          }}
                        >
                          <FormGroup
                            id="aria-multiselectable"
                            onClick={(e) => handlePassedExam(e)}
                          >
                            {passedExam.map((i, index) => {
                              return (
                                <FormControlLabel
                                  control={<Checkbox value={i.name} />}
                                  label={i.name}
                                  key={`key${index}`}
                                />
                              );
                            })}
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                        onClick={() => {
                          setHurlyRateFilter("");
                          setpassedExamFilter("");
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3bh-content"
                          id="panel3bh-header"
                        >
                          <Typography>English Level</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="gender"
                              name="radio-buttons-group"
                              onChange={(e) => handleEnglishLevel(e)}
                            >
                              <FormControlLabel
                                value="Basic"
                                control={<Radio />}
                                label="Basic"
                              />
                              <FormControlLabel
                                value="Conversational"
                                control={<Radio />}
                                label="Conversational"
                              />
                              <FormControlLabel
                                value="Fluent"
                                control={<Radio />}
                                label="Fluent"
                              />
                              <FormControlLabel
                                value="Native Or Bilingual"
                                control={<Radio />}
                                label="Native Or Bilingual"
                              />
                              <FormControlLabel
                                value="Professional"
                                control={<Radio />}
                                label="Professional"
                              />
                            </RadioGroup>
                          </FormControl>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p className="text-14 mt-3">
                      Click “Apply Filter” to apply latest changes made by you.
                    </p>
                    <Button
                      className="btn btn-blue w-100"
                      onClick={() => handleApplyFilter()}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
                <div className="col-lg-9 border-left">
                  {filterData && filterData.length > 0 ? (
                    filterData.map((i, index) => {
                      return (
                        <Card
                          key={`key${index}`}
                          className="employer-deshboard-card mt-3"
                        >
                          <CardContent className="p-0">
                            <div className="row">
                              <div className="col-md-8">
                                <div className="row">
                                  <div className="col-sm-12 col-md-3">
                                    {i.profilephoto &&
                                    i.profilephoto !== "undefined" ? (
                                      <CardMedia
                                        component="img"
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                        image={`${url}/${i?.profilephoto}`}
                                        alt="profile-image"
                                      />
                                    ) : (
                                      <CardMedia
                                        component="img"
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                        image={defaultUserImage}
                                        alt="default-image"
                                      />
                                    )}
                                  </div>
                                  <div className="col-sm-12 col-md-9 pl-md-3">
                                    <Typography
                                      className="text-14"
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      color="text.secondary"
                                    >
                                      {/* eslint-disable-next-line */}
                                      <a
                                        onClick={() =>
                                          history.push(
                                            `/employer/FreelancerProfilePage/${i?._id}`
                                          )
                                        }
                                      >
                                        {i?.displayname}
                                      </a>
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
                                        {i?.hourrate} $ / hr
                                      </Typography>
                                      <Divider orientation="vertical" />
                                      <Typography
                                        className="text-14"
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        color="text.secondary"
                                      >
                                        {i?.location}
                                      </Typography>
                                    </p>
                                  </div>
                                </div>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  className="mt-md-2"
                                >
                                  {i?.tagline && i?.tagline !== ""
                                    ? i?.tagline
                                    : null}
                                </Typography>
                              </div>
                              <div className="col-md-4 justify-content-right mt-2 text-md-right text-sm-left">
                                <Button
                                  onClick={() =>
                                    history.push(
                                      `/employer/FreelancerProfilePage/${i?._id}`
                                    )
                                  }
                                  className="btn btn-blue"
                                >
                                  See Profile
                                </Button>
                                {i?.profilevideo ? (
                                  <div className="player-wrapper mt-3">
                                    <ReactPlayer
                                      className="react-player"
                                      url={`${url}/${i?.profilevideo}`}
                                      // url= {i.profilevideo}
                                      width="100%"
                                      height="100%"
                                    />
                                  </div>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : filterData && filterData.length === 0 ? (
                    <div className="align-items-center d-flex h-100 justify-content-center">
                      <h2 className="text-center">No Data Found</h2>
                    </div>
                  ) : freelancerData && freelancerData.length > 0 ? (
                    freelancerData.filter(searched(keyword)).map((i, index) => {
                      return (
                        <Card
                          key={`key${index}`}
                          className="employer-deshboard-card mt-3"
                        >
                          <CardContent className="p-0">
                            <div className="row">
                              <div className="col-md-8">
                                <div className="row">
                                  <div className="col-sm-12 col-md-3">
                                    {i.profilephoto &&
                                    i.profilephoto !== "undefined" ? (
                                      <CardMedia
                                        component="img"
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                        image={`${url}/${i.profilephoto}`}
                                        alt="profile-image"
                                      />
                                    ) : (
                                      <CardMedia
                                        component="img"
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                        image={defaultUserImage}
                                        alt="default-image"
                                      />
                                    )}
                                  </div>
                                  <div className="col-sm-12 col-md-9 pl-md-3">
                                    <Typography
                                      className="text-14"
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      color="text.secondary"
                                    >
                                      <NavLink
                                        to={`/employer/FreelancerProfilePage/${i._id}`}
                                        style={{
                                          color: "#339aff",
                                        }}
                                        className={"text-capitalize"}
                                      >
                                        {i.displayname}
                                      </NavLink>
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

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  className="mt-md-2"
                                >
                                  {i?.tagline && i?.tagline !== ""
                                    ? i?.tagline
                                    : null}
                                </Typography>
                              </div>
                              <div className="col-md-4 justify-content-right mt-2 text-md-right text-sm-left">
                                <Button
                                  onClick={() =>
                                    history.push(
                                      `/employer/FreelancerProfilePage/${i._id}`
                                    )
                                  }
                                  className="btn btn-blue"
                                >
                                  See Profile
                                </Button>
                                {i?.profilevideo ? (
                                  <div className="player-wrapper mt-3">
                                    <ReactPlayer
                                      className="react-player"
                                      url={i?.profilevideo}
                                      width="100%"
                                      height="100%"
                                    />
                                  </div>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : null}
                  {(filterData && filterData.length > 0) ||
                  (freelancerData && freelancerData.length) ? (
                    <Pagination
                      page={curr}
                      count={totalPages}
                      renderItem={(item) => (
                        <PaginationItem
                          component={Link}
                          to={`/employer-dashboard`}
                          {...item}
                          onClick={() => loadDataWithPages(item.page - 1)}
                        />
                      )}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div>
            <EmployerFooter />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default OurVirtualAssistance;
