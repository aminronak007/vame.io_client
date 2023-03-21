import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "antd";
import { FileUploader } from "react-drag-drop-files";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { url } from "../../../../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AwardTitle from "../../image/awards.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
import FreelancerSideber from "../../FreaalancerSidebar/FreelancerSidebar";
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

const Form = ({ loading, setLoading, override }) => {
  const [value, setValue] = React.useState(0);

  const [awardList, setAwardList] = React.useState([
    {
      awardDegreeTitle: "",
      date: "",
    },
  ]);

  const [faqList, setFaqList] = React.useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const [skillsList, setSkillsList] = React.useState([
    {
      skills: "",
      gradeExperience: "",
    },
  ]);

  // --------------------tab-0------------
  const [englishLevel, setEnglishLevel] = React.useState("Basic");
  const [profilePic, setProfilePic] = React.useState([]);
  const [bannerPic, setBannerPic] = React.useState([]);
  const [uploadResume, setUploadResume] = React.useState([]);
  // eslint-disable-next-line
  const [locationData, setLocationData] = React.useState("");
  // eslint-disable-next-line
  const [awardFiles, setAwardFiles] = React.useState([]);
  const [videoUrl, setVideoUrl] = React.useState("");

  const [location, setLocation] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [freelancerDetails, setFreelancerDetails] = React.useState({
    socialprofile: [],
  });

  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setEmail(res.data.email);
        });
      axios.get(`${url}/api/locations`).then((res) => {
        setLocation(res.data.locationData);
      });
      axios.get(`${url}/api/skill`).then((res) => {
        setSkills(res.data.skillsData);
      });
    } else {
      window.location = "/";
    }

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    axios.post(`${url}/api/freelancer-details`, { email }).then((res) => {
      setFreelancerDetails(res.data.freelancerDetails);
      setSkillsList(
        res.data.freelancerDetails ? res.data.freelancerDetails.skills : []
      );
      setAwardList(
        res.data.freelancerDetails
          ? res.data.freelancerDetails.awardDetails
          : []
      );
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [skills]);

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    freelancerDetails.experienceDetails.splice(index, 1);
    setFreelancerDetails(
      Object.assign({}, freelancerDetails, {
        experienceDetails: freelancerDetails.experienceDetails,
      })
    );
  };
  const handleRemoveClick1 = (index) => {
    freelancerDetails.educationDetails.splice(index, 1);
    setFreelancerDetails(
      Object.assign({}, freelancerDetails, {
        educationDetails: freelancerDetails.educationDetails,
      })
    );
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setFreelancerDetails(
      Object.assign({}, freelancerDetails, {
        experienceDetails: [
          {
            jobtitle: "",
            companytitle: "",
            startDate: "",
            endDate: "",
            jobdescription: "",
          },
          ...freelancerDetails.experienceDetails,
        ],
      })
    );
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    freelancerDetails.experienceDetails[index][name] = value;
    setFreelancerDetails(
      Object.assign({}, freelancerDetails, {
        experienceDetails: freelancerDetails.experienceDetails,
      })
    );
  };

  const handleAddClick2 = () => {
    setFreelancerDetails(
      Object.assign({}, freelancerDetails, {
        educationDetails: [
          { degreeTitle: "", instituteTitle: "", startDate: "", endDate: "" },
          ...freelancerDetails.educationDetails,
        ],
      })
    );
  };
  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    freelancerDetails.educationDetails[index][name] = value;
    setFreelancerDetails(
      Object.assign({}, freelancerDetails, {
        educationDetails: freelancerDetails.educationDetails,
      })
    );
  };

  const handleAwardsAddClick = () => {
    setAwardList([{ awardDegreeTitle: "", date: "" }, ...awardList]);
  };
  const handleAwardRemoveClick = (index) => {
    const list = [...awardList];
    list.splice(index, 1);
    setAwardList(list);
  };

  const handleAwardsChange = (e, index) => {
    const list = [...awardList];
    const { name, value } = e.target;
    list[index][name] = value;

    setAwardList(list);
  };

  const handleVideoChange = (e, index) => {
    setVideoUrl(e.target.value);
  };

  const handleFAQAddClick = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };
  const handleFAQRemoveClick = (index) => {
    const list = [...faqList];
    list.splice(index, 1);
    setFaqList(list);
  };

  const handleFaqChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...faqList];
    list[index][name] = value;
    setFaqList(list);
  };

  const handleSkillsAddClick = () => {
    setSkillsList([{ skills: "", gradeExperience: "" }, ...skillsList]);
  };
  const handleSkillsRemoveClick = (index) => {
    const list = [...skillsList];
    list.splice(index, 1);
    setSkillsList(list);
  };

  const handleSkillsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skillsList];
    list[index][name] = value;
    setSkillsList(list);
  };

  const handleAwardImageChange = (file) => {
    awardFiles.push(file);
  };

  const handleProfilePicChange = (file) => {
    setProfilePic(file);
  };

  const handleBannerPicChange = (file) => {
    setBannerPic(file);
  };

  const handleUploadResumeChange = (file) => {
    setUploadResume(file);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFreelancerChange = (e) => {
    var socialArr = [
      "facebookLink",
      "linkedinLink",
      "twitterLink",
      "pinterestLink",
      "instagramLink",
      "youtubeLink",
      "whatsappNumber",
    ];
    if (socialArr.includes(e.target.name)) {
      freelancerDetails.socialprofile =
        freelancerDetails.socialprofile === undefined
          ? []
          : freelancerDetails.socialprofile;
      freelancerDetails.socialprofile[e.target.name] = e.target.value;

      setFreelancerDetails(
        Object.assign({}, freelancerDetails, {
          socialprofile: freelancerDetails.socialprofile,
        })
      );
    } else {
      setFreelancerDetails(
        Object.assign({}, freelancerDetails, {
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const data = new FormData();

    data.append("email", email);
    data.append(
      "gender",
      freelancerDetails.gender ? freelancerDetails.gender : ""
    );
    data.append(
      "firstname",
      freelancerDetails.firstname ? freelancerDetails.firstname : ""
    );
    data.append(
      "lastname",
      freelancerDetails.lastname ? freelancerDetails.lastname : ""
    );
    data.append(
      "displayname",
      freelancerDetails.displayname ? freelancerDetails.displayname : ""
    );
    data.append(
      "maxhour",
      freelancerDetails.dailyrate ? freelancerDetails.dailyrate : ""
    );
    data.append(
      "hourrate",
      freelancerDetails.hourrate ? freelancerDetails.hourrate : ""
    );
    data.append(
      "yearsofexperience",
      freelancerDetails.yearsofexperience
        ? freelancerDetails.yearsofexperience
        : ""
    );
    data.append(
      "phone",
      freelancerDetails.phone ? freelancerDetails.phone : ""
    );
    data.append(
      "tagline",
      freelancerDetails.tagline ? freelancerDetails.tagline : ""
    );
    data.append(
      "englishlevel",
      freelancerDetails.englishLevel
        ? freelancerDetails.englishLevel
        : englishLevel
    );

    data.append(
      "propic",
      profilePic.name ? profilePic : freelancerDetails.profilephoto
    );
    data.append(
      "bannerpic",
      bannerPic.name ? bannerPic : freelancerDetails.bannerphoto
    );
    data.append(
      "resume",
      uploadResume.name ? uploadResume : freelancerDetails.resume
    );
    data.append(
      "location",
      locationData
        ? locationData
        : freelancerDetails.location
        ? freelancerDetails.location
        : ""
    );
    data.append(
      "skills",
      JSON.stringify(
        skillsList
          ? skillsList
          : freelancerDetails.skills
          ? freelancerDetails.skills
          : ""
      )
    );
    data.append(
      "jobDetails",
      JSON.stringify(
        freelancerDetails.experienceDetails
          ? freelancerDetails.experienceDetails
          : ""
      )
    );
    data.append(
      "educationDetails",
      JSON.stringify(
        freelancerDetails.educationDetails
          ? freelancerDetails.educationDetails
          : ""
      )
    );
    data.append(
      "videoUrl",
      videoUrl
        ? videoUrl
        : freelancerDetails.profilevideo
        ? freelancerDetails.profilevideo
        : ""
    );
    data.append(
      "social",
      JSON.stringify(
        freelancerDetails.socialprofile ? freelancerDetails.socialprofile : ""
      )
    );
    data.append(
      "awardDetails",
      JSON.stringify(
        awardList
          ? awardList
          : freelancerDetails.awardDetails
          ? freelancerDetails.awardDetails
          : ""
      )
    );

    for (let i = 0; i < awardFiles.length; i++) {
      data.append("awards", awardFiles[i]);
    }

    data.append(
      "faq",
      JSON.stringify(
        faqList ? faqList : freelancerDetails.faq ? freelancerDetails.faq : ""
      )
    );

    axios.put(`${url}/api/update/freelancer-profile`, data).then((res) => {
      setLoading(true);
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
        setLoading(false);
      } else {
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
          <div className="padding-left">
            <FreelancerNavbar />
          </div>
          <div className="row mx-0" style={{ marginTop: "40px" }}>
            <div className="col-1">
              <FreelancerSideber />
            </div>
            <div className="col-12 right-content mb-4">
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
                      style={{ textAlign: "left" }}
                      label="Personal Details & Skills"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Experience & Education"
                      {...a11yProps(1)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Awards/Certifications"
                      {...a11yProps(2)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Profile Videos"
                      {...a11yProps(3)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Social Profile"
                      {...a11yProps(4)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="FAQ Profile"
                      {...a11yProps(5)}
                    />
                    \
                  </Tabs>
                  <TabPanel value={value} index={0} className="edit-tab">
                    <div className="row">
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Your Details
                      </Typography>

                      <div className="col-lg-4 pt-3 form-group">
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          name="gender"
                          value={
                            freelancerDetails ? freelancerDetails.gender : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        >
                          <option value="Mr">Mr.</option>
                          <option value="Miss">Miss</option>
                        </select>
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          aria-describedby="emailHelp"
                          placeholder="Firstname"
                          value={
                            freelancerDetails
                              ? freelancerDetails.firstname
                              : null
                          }
                          name="firstname"
                          onChange={(e) => handleFreelancerChange(e)}
                        />
                        <div className="invalid-feedback">
                          Please choose a firstname.
                        </div>
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          placeholder="Last Name"
                          name="lastname"
                          value={
                            freelancerDetails
                              ? freelancerDetails.lastname
                              : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        />
                        <div className="invalid-feedback">
                          Please choose a lastname.
                        </div>
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          placeholder="Full Name"
                          name="displayname"
                          value={
                            freelancerDetails
                              ? freelancerDetails.displayname
                              : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        />
                        <div className="invalid-feedback">
                          Please choose a fullname.
                        </div>
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          placeholder="hijkcnkdnckdn"
                          name="dailyrate"
                          value={
                            freelancerDetails
                              ? freelancerDetails.dailyrate
                              : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        >
                          <option disabled selected>
                            Hours of max. daily availability
                          </option>
                          <option value="1">1 hr.</option>
                          <option value="2">2 hr.</option>
                          <option value="3">3 hr.</option>
                          <option value="4">4 hr.</option>
                          <option value="5">5 hr.</option>
                        </select>
                        <div className="invalid-feedback">
                          Please choose a Hours of max. daily availability.
                        </div>
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          name="hourrate"
                          value={
                            freelancerDetails
                              ? freelancerDetails.hourrate
                              : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        >
                          <option disabled selected>
                            Your hourly rate(1-8 $/hr)
                          </option>
                          <option value="1">1 $/hr.</option>
                          <option value="2">2 $/hr.</option>
                          <option value="3">3 $/hr.</option>
                          <option value="4">4 $/hr.</option>
                          <option value="5">5 $/hr.</option>
                        </select>
                        <div className="invalid-feedback">
                          Please choose a Your hourly rate.
                        </div>
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Years of general experience"
                          name="yearsofexperience"
                          value={
                            freelancerDetails
                              ? freelancerDetails.yearsofexperience
                              : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          min="0"
                          type="number"
                          className="form-control remove-arrows"
                          id="exampleInputPassword1"
                          placeholder="Phone number"
                          name="phone"
                          value={
                            freelancerDetails ? freelancerDetails.phone : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control remove-arrows"
                          id="validationCustomUsername"
                          placeholder="Add short description (a.k tagline)"
                          name="tagline"
                          value={
                            freelancerDetails ? freelancerDetails.tagline : null
                          }
                          onChange={(e) => handleFreelancerChange(e)}
                        />
                        <div className="invalid-feedback">
                          Please choose a TagLine.
                        </div>
                      </div>

                      <Typography
                        className="pt-4 postjob-fontsize"
                        variant="h5"
                        component="div"
                      >
                        English Level
                      </Typography>
                      <div className="col-lg-12 pt-3 form-group">
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          name="englishlevel"
                          value={
                            freelancerDetails
                              ? freelancerDetails.englishLevel
                              : null
                          }
                          onChange={(e) => setEnglishLevel(e.target.value)}
                        >
                          <option>Basic</option>
                          <option>Conversational</option>
                          <option>Fluent</option>
                          <option>Native Or Bilingual </option>
                          <option>Professional</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <Typography
                          className="py-3"
                          variant="h5"
                          component="div"
                        >
                          Profile Photo
                        </Typography>
                        <FileUploader
                          name="propic"
                          handleChange={handleProfilePicChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <Typography
                          className="py-3 "
                          variant="h5"
                          component="div"
                        >
                          Banner Photo
                        </Typography>
                        <FileUploader
                          handleChange={handleBannerPicChange}
                          name="bannerpic"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <Typography
                          className="py-3"
                          variant="h5"
                          component="div"
                        >
                          Upload Resume
                        </Typography>
                        <FileUploader
                          handleChange={handleUploadResumeChange}
                          name="resume"
                        />
                      </div>

                      <div className="col-lg-12 form-group">
                        <Typography
                          className="pt-2 postjob-fontsize"
                          variant="h5"
                          component="div"
                        >
                          Your Location
                        </Typography>
                        <div className="form-group">
                          <select
                            className=" form-control form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            name="location"
                            value={
                              freelancerDetails
                                ? freelancerDetails.location
                                : null
                            }
                            onChange={(e) => handleFreelancerChange(e)}
                          >
                            <option selected desebaled>
                              {" "}
                              Select Location{" "}
                            </option>
                            {location.map((i, index) => {
                              return (
                                <option key={`key${index}`} value={i.name}>
                                  {i.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <Typography
                          className="postjob-fontsize"
                          variant="h5"
                          component="div"
                        >
                          My Skills
                        </Typography>
                      </div>
                      <div className="col-md-4">
                        <Button
                          onClick={handleSkillsAddClick}
                          className="justify-end float-end"
                        >
                          + Add Skills
                        </Button>
                      </div>
                      {skillsList.map((x, i) => {
                        return (
                          <div className="row" key={`key${i}`}>
                            <div className="btn-box">
                              {skillsList.length !== 0 && (
                                <div className="form-box1 form-box-border">
                                  <p className="job-title">
                                    {x.skills ? x.skills : "Skills"}
                                  </p>

                                  <Button
                                    onClick={() => handleSkillsRemoveClick(i)}
                                  >
                                    <DeleteOutlineIcon
                                      style={{
                                        color: "red",
                                        fontSize: 30,
                                        marginRight: 10,
                                      }}
                                    />
                                  </Button>
                                </div>
                              )}
                            </div>
                            <React.Fragment>
                              <div className="col-lg-6 pt-3 form-group">
                                <select
                                  className=" form-control form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                  placeholder="Select Skills"
                                  name="skills"
                                  onChange={(e) => handleSkillsChange(e, i)}
                                  id="exampleFormControlSelect1"
                                  value={x.skills}
                                >
                                  <option selected desebaled>
                                    {" "}
                                    Select Skills{" "}
                                  </option>
                                  {skills.map((i, index) => {
                                    return (
                                      <option
                                        key={`key${index}`}
                                        value={i.name}
                                      >
                                        {i.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-lg-6 pt-3 form-group">
                                <select
                                  className=" form-control form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                  id="exampleFormControlSelect1"
                                  onChange={(e) => handleSkillsChange(e, i)}
                                  name="gradeExperience"
                                  value={x.gradeExperience}
                                >
                                  <option disabled selected>
                                    Grade Your Experience
                                  </option>
                                  <option value="1"> 1 star</option>
                                  <option value="2"> 2 star</option>
                                  <option value="3"> 3 star</option>
                                  <option value="4"> 4 star</option>
                                  <option value="5"> 5 star</option>
                                </select>
                              </div>
                            </React.Fragment>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>
                  {/* -----------------experience and education details-------------------- */}
                  <TabPanel value={value} index={1} className="edit-tab">
                    <div className="row">
                      <div className="col-md-9">
                        <Typography
                          variant="h5"
                          component="div"
                          className="postjob-fontsize"
                        >
                          Add Your Experience
                        </Typography>
                      </div>
                      <div className="col-md-3 text-right">
                        <Button onClick={handleAddClick}>
                          + Add Experience
                        </Button>
                      </div>
                    </div>

                    {freelancerDetails?.experienceDetails
                      ? freelancerDetails?.experienceDetails?.map((h, i) => {
                          return (
                            <div className="row mt-4" key={`key${i}`}>
                              <div className="btn-box">
                                <div className="form-box1 form-box-border">
                                  <p className="job-title">
                                    {h?.jobtitle ? h?.jobtitle : "Job Title"}
                                    <span
                                      style={{
                                        color: "lightgrey",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {h?.startDate &&
                                        h?.endDate &&
                                        `(${moment(h?.startDate).format(
                                          "DD-MM-yyyy"
                                        )} - ${moment(h?.endDate).format(
                                          "DD-MM-yyyy"
                                        )})`}
                                    </span>
                                  </p>

                                  <Button onClick={() => handleRemoveClick(i)}>
                                    <DeleteOutlineIcon
                                      style={{
                                        color: "red",
                                        fontSize: 30,
                                        marginRight: 10,
                                      }}
                                    />
                                  </Button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6 form-group">
                                  <input
                                    name="jobtitle"
                                    placeholder="Job Title"
                                    className="form-control"
                                    value={h?.jobtitle}
                                    onChange={(e) =>
                                      handleExperienceChange(e, i)
                                    }
                                  />
                                </div>
                                <div className="col-md-6">
                                  <input
                                    className="form-control ml10"
                                    name="companytitle"
                                    placeholder="Company Title"
                                    value={h?.companytitle}
                                    onChange={(e) =>
                                      handleExperienceChange(e, i)
                                    }
                                  />
                                </div>
                                <div className="col-md-6 pt-4">
                                  <Typography
                                    variant="h5"
                                    component="div"
                                    className="postjob-fontsize"
                                  >
                                    Start Date
                                  </Typography>
                                  <input
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    value={h?.startDate}
                                    onChange={(e) =>
                                      handleExperienceChange(e, i)
                                    }
                                  />
                                </div>
                                <div className="col-md-6 pt-4">
                                  <Typography
                                    variant="h5"
                                    component="div"
                                    className="postjob-fontsize"
                                  >
                                    End Date
                                  </Typography>
                                  <input
                                    type="date"
                                    name="endDate"
                                    value={h?.endDate}
                                    onChange={(e) =>
                                      handleExperienceChange(e, i)
                                    }
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-12 pt-4">
                                  <textarea
                                    className="form-control"
                                    onChange={(e) =>
                                      handleExperienceChange(e, i)
                                    }
                                    name="jobdescription"
                                    value={h?.jobdescription}
                                    placeholder="Your job Description"
                                    rows="8"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : null}

                    <div className="row pt-5">
                      <div className="col-md-9">
                        <Typography
                          variant="h5"
                          component="div"
                          className="postjob-fontsize"
                        >
                          Add Your Education
                        </Typography>
                      </div>
                      <div className="col-md-3 text-right">
                        <Button
                          onClick={handleAddClick2}
                          className="justify-end"
                        >
                          + Add Education
                        </Button>
                      </div>
                    </div>
                    {freelancerDetails &&
                      freelancerDetails.educationDetails.map((x, i) => {
                        return (
                          <div className="row" key={`key${i}`}>
                            <div className="btn-box">
                              {/* {inputList1.length !== 0 && ( */}
                              <div className="form-box1">
                                <p className="job-title">
                                  {x?.degreeTitle
                                    ? x?.degreeTitle
                                    : "Degree Title "}
                                  <span
                                    style={{
                                      color: "lightgrey",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {x?.startDate &&
                                      x?.endDate &&
                                      `${moment(x?.startDate).format(
                                        "DD-MM-yyyy"
                                      )} - ${moment(x?.endDate).format(
                                        "DD-MM-yyyy"
                                      )}`}
                                  </span>
                                </p>

                                <Button onClick={() => handleRemoveClick1(i)}>
                                  <DeleteOutlineIcon
                                    style={{
                                      color: "red",
                                      fontSize: 30,
                                      marginRight: 10,
                                    }}
                                  />
                                </Button>
                              </div>
                              {/* )} */}
                            </div>

                            <div className="col-md-6 form-group">
                              <input
                                name="degreeTitle"
                                placeholder="Degree Title"
                                value={x.degreeTitle}
                                onChange={(e) => handleEducationChange(e, i)}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <input
                                className="ml10 form-control"
                                name="instituteTitle"
                                placeholder="Institute Name"
                                value={x.instituteTitle}
                                onChange={(e) => handleEducationChange(e, i)}
                              />
                            </div>
                            <div className="col-md-6 pt-4">
                              <Typography
                                variant="h5"
                                component="div"
                                className="postjob-fontsize"
                              >
                                Start Date
                              </Typography>
                              <input
                                type="date"
                                name="startDate"
                                className="form-control"
                                value={x.startDate}
                                onChange={(e) => {
                                  handleEducationChange(e, i);
                                }}
                              />
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "gray",
                                }}
                              >
                                *Leave ending date empty if its your current
                                degree
                              </p>
                            </div>
                            <div className="col-md-6 pt-4">
                              <Typography
                                variant="h5"
                                component="div"
                                className="postjob-fontsize"
                              >
                                End Date
                              </Typography>
                              <input
                                type="date"
                                name="endDate"
                                className="form-control"
                                value={x.endDate}
                                onChange={(e) => handleEducationChange(e, i)}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </TabPanel>
                  {/* --------------- Awards/Certifications ------------ */}
                  <TabPanel value={value} index={2} className="edit-tab">
                    <div className="row">
                      <div className="col-md-8">
                        <Typography
                          variant="h5"
                          component="div"
                          className="postjob-fontsize"
                        >
                          Add your Awards/Certifications
                        </Typography>
                      </div>
                      <div className="col-md-4">
                        <Button
                          onClick={handleAwardsAddClick}
                          className="justify-end float-end"
                        >
                          + Add Award
                        </Button>
                      </div>
                    </div>
                    {awardList.map((x, i) => {
                      return (
                        <div className="row mt-4" key={`key${i}`}>
                          <div className="btn-box">
                            {awardList.length !== 0 && (
                              <div className="form-box1">
                                <p className="job-title d-flex">
                                  <img src={AwardTitle} alt="award" /> &ensp;
                                  <div>
                                    {x.awardDegreeTitle
                                      ? x.awardDegreeTitle
                                      : "Awards Title"}
                                    <div
                                      style={{
                                        color: "red",
                                        textAlign: "left",
                                      }}
                                    >
                                      {x.date
                                        ? moment(x.date).format("DD-MM-yyyy")
                                        : moment().format("DD/MM/YYYY")}
                                    </div>
                                  </div>
                                </p>

                                <Button
                                  onClick={() => handleAwardRemoveClick(i)}
                                >
                                  <DeleteOutlineIcon
                                    style={{
                                      color: "red",
                                      fontSize: 40,
                                      marginRight: 20,
                                    }}
                                  />
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6">
                            <Typography
                              variant="h5"
                              component="div"
                              className="postjob-fontsize"
                            >
                              Award Title
                            </Typography>
                            <input
                              name="awardDegreeTitle"
                              placeholder="Award Title"
                              value={x.awardDegreeTitle}
                              onChange={(e) => handleAwardsChange(e, i)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-md-6">
                            <Typography
                              variant="h5"
                              component="div"
                              className="postjob-fontsize"
                            >
                              Award Date
                            </Typography>
                            <input
                              placeholder="Award Date"
                              type="date"
                              name="date"
                              value={x.date}
                              className="form-control"
                              onChange={(e) => handleAwardsChange(e, i)}
                            />
                          </div>
                          <div className="col-md-12 pt-3 form-group">
                            <FileUploader
                              handleChange={handleAwardImageChange}
                              name="awards"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </TabPanel>
                  {/* ---------------------add video ---------------- */}
                  <TabPanel value={value} index={3} className="edit-tab">
                    <div className="row">
                      <div className="col-md-12">
                        <Typography
                          variant="h5"
                          component="div"
                          className="postjob-fontsize"
                        >
                          Add Your Video
                        </Typography>
                        <Typography
                          className="pt-3"
                          color="secondary"
                          variant="h6"
                          component="div"
                        >
                          Please add your CV video here, just click '+ Add Video
                          URL' and copy your YouTube or Vimeo link
                        </Typography>
                        <Typography
                          color="secondary"
                          variant="h6"
                          component="div"
                        >
                          (ex: https://www.youtube.com/watch?v=WCHlr2-AzSw).
                          It's that simple :)
                        </Typography>
                        <Typography
                          className="pb-2"
                          color="secondary"
                          variant="h6"
                          component="div"
                        >
                          P.S. remember to save the changes to your profile.
                        </Typography>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <input
                            name="videoUrl"
                            placeholder="Video URL"
                            // value={x.videoUrl}
                            defaultValue={
                              freelancerDetails
                                ? freelancerDetails.profilevideo
                                : null
                            }
                            onChange={(e) => handleVideoChange(e)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  {/* ----------------------- social profile---------------- */}
                  <TabPanel value={value} index={4} className="edit-tab">
                    <div className="row">
                      <div className="col-md-10 pb-3">
                        <Typography
                          variant="h5"
                          component="div"
                          className="postjob-fontsize"
                        >
                          Social Profile
                        </Typography>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <FacebookIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#3b5998",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="facebookLink"
                              className="form-control"
                              onChange={(e) => handleFreelancerChange(e)}
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile
                                      ?.facebookLink
                                  : null
                              }
                              placeholder="Facebook Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <LinkedInIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#0177b5",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="linkedinLink"
                              className="form-control"
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile
                                      ?.linkedinLink
                                  : null
                              }
                              onChange={(e) => handleFreelancerChange(e)}
                              placeholder="Linkedin Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <TwitterIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#55acee",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="twitterLink"
                              className="form-control"
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile?.twitterLink
                                  : null
                              }
                              onChange={(e) => handleFreelancerChange(e)}
                              placeholder="Twitter Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <PinterestIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#bd081c",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="pinterestLink"
                              className="form-control"
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile
                                      ?.pinterestLink
                                  : null
                              }
                              onChange={(e) => handleFreelancerChange(e)}
                              placeholder="Pinterest Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <InstagramIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#c53081",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="instagramLink"
                              className="form-control"
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile
                                      ?.instagramLink
                                  : null
                              }
                              onChange={(e) => handleFreelancerChange(e)}
                              placeholder="Instagram Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <YouTubeIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#cd201f",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="youtubeLink"
                              className="form-control"
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile?.youtubeLink
                                  : null
                              }
                              onChange={(e) => handleFreelancerChange(e)}
                              placeholder="Youtube Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <WhatsAppIcon
                              style={{
                                width: 50,
                                height: 50,
                                color: "#0dc143",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="number"
                              min="0"
                              name="whatsappNumber"
                              className="form-control"
                              value={
                                freelancerDetails
                                  ? freelancerDetails.socialprofile
                                      ?.whatsappNumber
                                  : null
                              }
                              onChange={(e) => handleFreelancerChange(e)}
                              placeholder="Whatsapp Number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  {/* -----------------------add faq----------------------- */}
                  <TabPanel value={value} index={5} className="edit-tab">
                    <div className="row">
                      <div className="col-md-8">
                        <Typography
                          variant="h5"
                          component="div"
                          className="postjob-fontsize"
                        >
                          Question
                        </Typography>
                      </div>
                      <div className="col-md-4">
                        <Button
                          onClick={handleFAQAddClick}
                          className="justify-end float-end"
                        >
                          + Add FAQ
                        </Button>
                      </div>
                    </div>
                    {faqList.map((x, i) => {
                      return (
                        <div className="row" key={`key${i}`}>
                          <div className="btn-box">
                            {faqList.length !== 0 && (
                              <div className="form-box1 mt-4">
                                <p className="job-title">Question</p>

                                <Button onClick={() => handleFAQRemoveClick(i)}>
                                  <DeleteOutlineIcon
                                    style={{
                                      color: "red",
                                      fontSize: 30,
                                      marginRight: 10,
                                    }}
                                  />
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-12">
                            <input
                              name="question"
                              placeholder="Question"
                              onChange={(e) => handleFaqChange(e, i)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </TabPanel>
                </Box>
                <div className="text-center">
                  <hr />
                  <p>
                    Update all the latest changes made by you, by just clicking
                    on "Save & Update" button.
                  </p>
                  <Button
                    className="btn btn-blue"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save & Update
                  </Button>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Form;
