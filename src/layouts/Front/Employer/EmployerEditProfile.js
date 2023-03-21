import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FileUploader } from "react-drag-drop-files";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmployerNavbar from "./EmployerNavbar";
import Skype from "./images/skype.png";
import Tumblr from "./images/tumblr.png";
import Filckr from "./images/filckr.png";
import Medium from "./images/medium.png";
import Tripadvisor from "./images/tripadviser.png";
import Wikipedia from "./images/wikipedia.png";
import Vimeo from "./images/vimeo.png";
import Vkontakte from "./images/vkontakte.png";
import Odnaklassniki from "./images/odnaklassniki.png";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import EmployerSidebar from "./EmployerSidebar";
import { url } from "config";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Select from "react-select";
import countryList from "react-select-country-list";

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

const EmployerEditProfile = () => {
  const [value, setValue] = React.useState(0);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [tagLine, setTagLine] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [jobdescription, setJobDescription] = React.useState("");
  const [profilePic, setProfilePic] = React.useState(null);
  const [brochure, setBrochurePic] = React.useState(null);

  const [socialProfileList, setSocialProfileList] = React.useState({
    facebookLink: "",
    linkedinLink: "",
    twitterLink: "",
    pinterestLink: "",
    instagramLink: "",
    youtubeLink: "",
    whatsappNumber: null,
    skypeLink: "",
    filckrLink: "",
    mediumLink: "",
    tripadvisorLink: "",
    wikipediaLink: "",
    vimeoLink: "",
    vkontakteLink: "",
    odnaklassnikiLink: "",
    tumblrLink: "",
  });

  const [department, setDepartment] = React.useState("");
  const [employeesCount, setEmployeesCount] = React.useState("");
  // eslint-disable-next-line
  const [location, setLocation] = React.useState([]);
  const [employerDetails, setEmployerDetails] = React.useState({});
  const [empployerSocialDetails, setEmployerSocialDetails] = React.useState({});
  const [employerDetailDepartment, setEmployerDetailDepartment] =
    React.useState("");
  const [employerDetailCount, setEmployerDetailCount] = React.useState("");

  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email, setEmail] = React.useState("");
  const [email1, setEmail1] = React.useState({
    email: "",
  });
  let [loading, setLoading] = React.useState(true);
  const [selectCountry, setSelectCountry] = React.useState("");

  const options = React.useMemo(() => countryList().getData(), []);

  const changeHandler = (selectCountry) => {
    setSelectCountry(selectCountry);
  };

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  React.useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        setEmail(res.data.email);
        setEmail1({ email: res.data.email });
      });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.post(`${url}/api/employer-details`, email1).then((res) => {
        setEmployerDetails(res.data.employerDetails);
        // console.log("ds", res.data.employerDetails);
        if (res.data.employerDetails) {
          setEmployerDetailDepartment(res.data.employerDetails.department);
          setEmployerDetailCount(res.data.employerDetails.noofemployees);
          setEmployerSocialDetails(res.data.employerDetails.socialprofile);
          setLoading(false);
        }
      });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, [employerDetails]);

  React.useEffect(() => {
    axios.get(`${url}/api/locations`).then((res) => {
      // console.log("location", res);
      setLocation(res.data.locationData);
    });
    // eslint-disable-next-line
  }, []);

  // handle click event of the Remove button

  const handleProfileChange = (file) => {
    setProfilePic(file);
  };
  // console.log(profilePic);

  const handleFileChange = (file) => {
    setBrochurePic(file);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;

    setSocialProfileList({
      ...socialProfileList,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = new FormData();

    data.append("email", email);
    data.append(
      "firstname",
      firstName
        ? firstName
        : employerDetails.firstname
        ? employerDetails.firstname
        : ""
    );
    data.append(
      "lastname",
      lastName
        ? lastName
        : employerDetails.lastname
        ? employerDetails.lastname
        : ""
    );
    data.append(
      "phone",
      phoneNumber
        ? phoneNumber
        : employerDetails.phone
        ? employerDetails.phone
        : ""
    );
    data.append("tagline", tagLine ? tagLine : employerDetails.tagline);
    data.append(
      "displayname",
      displayName
        ? displayName
        : employerDetails.displayname
        ? employerDetails.displayname
        : ""
    );
    data.append(
      "companyname",
      companyName
        ? companyName
        : employerDetails.companyname
        ? employerDetails.companyname
        : ""
    );
    data.append(
      "jobtitle",
      jobTitle
        ? jobTitle
        : employerDetails.foundedYear
        ? employerDetails.foundedYear
        : ""
    );
    data.append(
      "jobdescription",
      jobdescription
        ? jobdescription
        : employerDetails.companyDescription
        ? employerDetails.companyDescription
        : ""
    );
    data.append(
      "employeepropic",
      profilePic?.name ? profilePic : employerDetails?.profilephoto
    );
    data.append(
      "department",
      department ? department : employerDetails.department
    );
    data.append(
      "employees",
      employeesCount ? employeesCount : employerDetails.noofemployees
    );
    data.append(
      "location",
      selectCountry ? selectCountry : employerDetails.location
    );
    data.append("social", JSON.stringify(socialProfileList));
    data.append(
      "brochure",
      brochure?.name ? brochure : employerDetails?.brohcure
    );

    axios.put(`${url}/api/update/employer-details`, data).then((res) => {
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
            <EmployerNavbar />
          </div>
          <div className="row mx-0" style={{ marginTop: "40px" }}>
            <div className="col-1">
              <EmployerSidebar />
            </div>
            <div
              className="col-12 right-content"
              style={{ marginBottom: "30px" }}
            >
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
                      label="Personal Details"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Social Profile"
                      {...a11yProps(1)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Brochures"
                      {...a11yProps(2)}
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
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                          defaultValue={
                            employerDetails ? employerDetails.firstname : null
                          }
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          placeholder="Last Name"
                          defaultValue={
                            employerDetails ? employerDetails.lastname : null
                          }
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="number"
                          min="0"
                          className="form-control remove-arrows"
                          id="exampleInputPassword1"
                          placeholder="Phone number"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          defaultValue={
                            employerDetails ? employerDetails.phone : null
                          }
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control remove-arrows"
                          id="exampleInputPassword1 validationCustomUsername"
                          placeholder="Add your tagline here (a.k.a tagline)"
                          onChange={(e) => setTagLine(e.target.value)}
                          defaultValue={
                            employerDetails ? employerDetails.tagline : null
                          }
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          placeholder="Display Name"
                          onChange={(e) => setDisplayName(e.target.value)}
                          defaultValue={
                            employerDetails ? employerDetails.displayname : null
                          }
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustomUsername"
                          aria-describedby="emailHelp"
                          placeholder="Company Name"
                          onChange={(e) => setCompanyName(e.target.value)}
                          defaultValue={
                            employerDetails ? employerDetails.companyname : null
                          }
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Company Founded Year"
                          onChange={(e) => setJobTitle(e.target.value)}
                          value={
                            employerDetails
                              ? moment(employerDetails?.foundedYear).format(
                                  "yyyy-MM-DD"
                                )
                              : null
                          }
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="answer"
                          placeholder="Company Description"
                          className="form-control"
                          defaultValue={
                            employerDetails
                              ? employerDetails?.companyDescription
                              : null
                          }
                          onChange={(e) => setJobDescription(e.target.value)}
                          rows="8"
                        />
                      </div>
                      <div className="col-lg-12 pt-3 form-group file-uploderform">
                        <Typography
                          className="py-3 postjob-fontsize"
                          variant="h5"
                          component="div"
                        >
                          Profile Photo
                        </Typography>
                        <FileUploader
                          handleChange={handleProfileChange}
                          name="file"
                        />
                      </div>
                      <div>
                        <Typography
                          className="py-3 postjob-fontsize"
                          variant="h5"
                          component="div"
                        >
                          Company Details
                        </Typography>
                        <div className="row com-detail-text">
                          <div className="col-sm">
                            <Typography className="text-16">
                              Your Department?
                            </Typography>
                            <FormControl component="fieldset">
                              <RadioGroup
                                aria-label="Your Department?"
                                defaultValue={
                                  employerDetailDepartment
                                    ? employerDetailDepartment
                                    : ""
                                }
                                name="radio-buttons-group"
                                onChange={(e) => {
                                  setDepartment(e.target.value);
                                }}
                              >
                                <FormControlLabel
                                  value="Accounting and Finance"
                                  control={<Radio />}
                                  label="Accounting and Finance"
                                />
                                <FormControlLabel
                                  value="Customer Service Or Operations"
                                  control={<Radio />}
                                  label="Customer Service Or Operations"
                                />
                                <FormControlLabel
                                  value="Engineering Or Product Management"
                                  control={<Radio />}
                                  label="Engineering Or Product Management"
                                />
                                <FormControlLabel
                                  value="Human Resource Management"
                                  control={<Radio />}
                                  label="Human Resource Management"
                                />
                                <FormControlLabel
                                  value="Marketing"
                                  control={<Radio />}
                                  label="Marketing"
                                />
                                <FormControlLabel
                                  value="Production"
                                  control={<Radio />}
                                  label="Production"
                                />
                                <FormControlLabel
                                  value="Purchasing"
                                  control={<Radio />}
                                  label="Purchasing"
                                />
                                <FormControlLabel
                                  value="Research and Development"
                                  control={<Radio />}
                                  label="Research and Development"
                                />
                                <FormControlLabel
                                  value="Sales"
                                  control={<Radio />}
                                  label="Sales"
                                />
                              </RadioGroup>
                            </FormControl>
                          </div>
                          <div className="col-sm">
                            <Typography className="text-16">
                              No. of employees you have
                            </Typography>
                            <FormControl component="fieldset">
                              <RadioGroup
                                aria-label="Your Department?"
                                defaultValue={
                                  employerDetailCount ? employerDetailCount : ""
                                }
                                name="radio-buttons-group"
                                onChange={(e) => {
                                  setEmployeesCount(e.target.value);
                                }}
                              >
                                <FormControlLabel
                                  value="Its Just Me"
                                  control={<Radio />}
                                  label="Its Just Me"
                                />
                                <FormControlLabel
                                  value="2 - 9 Employees"
                                  control={<Radio />}
                                  label="2 - 9 Employees"
                                />
                                <FormControlLabel
                                  value="10 - 99 Employees"
                                  control={<Radio />}
                                  label="10 - 99 Employees"
                                />
                                <FormControlLabel
                                  value="100 - 499 Employees"
                                  control={<Radio />}
                                  label="100 - 499 Employees"
                                />
                                <FormControlLabel
                                  value="500 - 1000 Employees"
                                  control={<Radio />}
                                  label="500 - 1000 Employees"
                                />
                                <FormControlLabel
                                  value="More Than 1000 Employees"
                                  control={<Radio />}
                                  label="More Than 1000 Employees"
                                />
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <Typography
                          className="py-3 postjob-fontsize"
                          variant="h5"
                          component="div"
                        >
                          Your Location
                        </Typography>

                        <Select
                          placeholder={
                            employerDetails ? employerDetails.location : null
                          }
                          value={selectCountry ? selectCountry : ""}
                          options={options}
                          onChange={changeHandler}
                        />
                        {/* <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          name="location"
                          defaultValue={
                            employerDetails ? employerDetails.location : null
                          }
                          onChange={(e) => setLocationData(e.target.value)}
                        >
                          <option selected disabled>
                            {" "}
                            Select Location
                          </option>
                          {location.map((i) => {
                            return <option value={i.name}>{i.name}</option>;
                          })}
                        </select> */}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1} className="edit-tab">
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
                        <div class="form-group row social-box">
                          <div className="col-sm-2">
                            <FacebookIcon
                              className="icon-size"
                              style={{
                                color: "#3b5998",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="facebookLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.facebookLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Facebook Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div class="form-group row social-box">
                          <div className="col-sm-2">
                            <TwitterIcon
                              className="icon-size"
                              style={{
                                color: "#55acee",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="twitterLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.twitterLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Twitter Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div class="form-group row social-box">
                          <div className="col-sm-2">
                            <LinkedInIcon
                              className="icon-size"
                              style={{
                                color: "#0177b5",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="linkedinLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.linkedinLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Linkedin Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div class="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Skype}
                              style={{
                                color: "#55acee",
                              }}
                              alt="Skype"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="skypeLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.skypeLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Skype Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <PinterestIcon
                              className="icon-size"
                              style={{
                                color: "#bd081c",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="pinterestLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.pinterestLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Pinterest Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Tumblr}
                              style={{
                                width: 30,
                                height: 30,
                                color: "#c53081",
                              }}
                              alt="Tumblr"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="tumblrLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.tumblrLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Tumblr Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <InstagramIcon
                              className="icon-size"
                              style={{
                                color: "#c53081",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="instagramLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.instagramLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Instagram Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Filckr}
                              style={{
                                width: 30,
                                height: 30,
                                color: "#c53081",
                              }}
                              alt="Filckr"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="filckrLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.filckrLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Filckr Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Medium}
                              style={{
                                width: 30,
                                height: 30,
                                color: "#c53081",
                              }}
                              alt="Medium"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="mediumLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.mediumLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Medium Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Tripadvisor}
                              style={{
                                width: 35,
                                height: 35,
                                color: "#c53081",
                              }}
                              alt="Tripadvisor"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="tripadvisorLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.tripadvisorLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Tripadvisor Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Wikipedia}
                              style={{
                                width: 30,
                                height: 30,
                                color: "#c53081",
                              }}
                              alt="Wikipedia"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="wikipediaLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.wikipediaLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Wikipedia Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Vimeo}
                              style={{
                                width: 30,
                                height: 30,
                                color: "#c53081",
                              }}
                              alt="Vimeo"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="vimeoLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.vimeoLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Vimeo Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <YouTubeIcon
                              className="icon-size"
                              style={{
                                color: "#cd201f",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="youtubeLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.youtubeLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Youtube Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <WhatsAppIcon
                              className="icon-size"
                              style={{
                                color: "#0dc143",
                              }}
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="whatsappNumber"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.whatsappNumber
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Whatsapp Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Vkontakte}
                              style={{
                                width: 35,
                                height: 35,
                                color: "#0dc143",
                              }}
                              alt="Vkontakte"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="vkontakteLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.vkontakteLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Vkontakte Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group row social-box">
                          <div className="col-sm-2">
                            <img
                              className="icon-size"
                              src={Odnaklassniki}
                              style={{
                                width: 30,
                                height: 30,
                                color: "#0dc143",
                              }}
                              alt="Odnaklassniki"
                            />
                          </div>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              name="odnaklassnikiLink"
                              className="form-control"
                              defaultValue={
                                empployerSocialDetails &&
                                empployerSocialDetails.length > 0
                                  ? empployerSocialDetails.map(
                                      (i) => i.odnaklassnikiLink
                                    )
                                  : null
                              }
                              onChange={(e) => handleSocialChange(e)}
                              placeholder="Odnaklassniki Link"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2} className="edit-tab">
                    <div>
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Upload Brochures
                      </Typography>
                      <FileUploader
                        handleChange={handleFileChange}
                        name="file"
                      />
                    </div>
                  </TabPanel>
                </Box>
                <div>
                  <hr />
                  <div className="text-center">
                    <p className="mb-3">
                      Update all the latest changes made by you, by just
                      clicking on "Save & Update" button.
                    </p>
                    <Button className="btn btn-blue" onClick={handleSubmit}>
                      Save & Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EmployerEditProfile;
