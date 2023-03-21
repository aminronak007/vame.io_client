import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "react-switch";
import { url } from "config";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
import FreelancerSideber from "../../FreaalancerSidebar/FreelancerSidebar";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
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

const AccountForm = ({ loading, setLoading, override }) => {
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  // --------------------tab-0------------
  const [myAccount, setMyAccount] = React.useState(false);
  const [frontend, setFrontend] = React.useState(false);
  const [notification, setNotification] = React.useState(false);

  const handleChangeSwitchMyAccount = (checked) => {
    setMyAccount({ checked });
    // console.log("myAccount", myAccount);
  };
  const handleChangeSwitchHourlyRateForntend = (checked) => {
    setFrontend({ checked });
    // console.log("frontend", frontend);
  };
  const handleChangeSwitchNewProjectNotification = (checked) => {
    setNotification({ checked });
    // console.log("notification", notification);
  };
  // ------------------tab-1----------------------
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [selectCountry, setSelectCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [emailBiliing, setBillingEmail] = React.useState("");

  const options = React.useMemo(() => countryList().getData(), []);

  const changeHandler = (selectCountry) => {
    setSelectCountry(selectCountry);
  };

  // ----------------------tab-2----------------
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  // console.log("password", currentPassword, newPassword);

  // ---------------------------tab-3--------------
  const [emailNotification, setEmailNotification] = React.useState("");
  //-------------------------tab-4-----------------

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [description, setDescription] = React.useState("");

  // ---------------------------------------------------------------

  const [userFirst_Name, setUserFirst_Name] = React.useState("");
  const [userLast_Name, setUserLast_Name] = React.useState("");
  const [userBilling_Email, setUserBilling_Email] = React.useState("");

  // -------------freelancer-data-state---------------------------------------------------------------
  const [f_name, setF_Name] = React.useState("");
  const [l_name, setL_Name] = React.useState("");
  const [b_email, setB_Email] = React.useState("");
  const [comp_name, setComp_Name] = React.useState("");
  const [b_add, setB_Add] = React.useState("");
  const [b_phone, setB_Phone] = React.useState("");
  const [b_city, setB_City] = React.useState("");
  const [b_zipcode, setB_Zipcode] = React.useState("");
  const [b_country, setB_Country] = React.useState("");

  //-------------------------------------------------------------------------------
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [id, setId] = React.useState(null);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email1, setEmail1] = React.useState({
    email: "",
  });
  const [manageAccountValue, setManageAccountValue] = React.useState(false);
  const [manageHourlyRateValue, setManageHourlyRateValue] =
    React.useState(false);
  const [manageNotificationValue, setManageNotificationValue] =
    React.useState(false);

  const [eNotificaion, setENotification] = React.useState("");
  React.useEffect(() => {
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
          // console.log(res.data)
          setId(res.data.id);
          setEmail1({ email: res.data.email });
          axios
            .post(`${url}/api/users`, {
              email: res.data.email,
            })
            .then((res) => {
              setManageAccountValue(res.data.userDetails.account);
              setManageHourlyRateValue(res.data.userDetails.hourRate);
              setManageNotificationValue(
                res.data.userDetails.projectNotification
              );
              setUserFirst_Name(res.data.userDetails.firstname);
              setUserLast_Name(res.data.userDetails.lastname);
              setUserBilling_Email(res.data.userDetails.email);
              setENotification(res.data.userDetails.notificationEmail);
              // console.log(res.data.userDetails);
              setLoading(false);
            });
          axios
            .post(`${url}/api/freelancer-details`, { email: res.data.email })
            .then((res) => {
              if (res.data.freelancerDetails) {
                setF_Name(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.firstname)
                    .toString()
                );
                setL_Name(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.lastname)
                    .toString()
                );
                setB_Email(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.billingEmail)
                    .toString()
                );
                setComp_Name(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.companyName)
                    .toString()
                );
                setB_Add(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.address)
                    .toString()
                );
                setB_Phone(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.billingNumber)
                    .toString()
                );
                setB_City(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.city)
                    .toString()
                );
                setB_Zipcode(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.zipcode)
                    .toString()
                );
                setB_Country(
                  res.data.freelancerDetails.billingDetails
                    ?.map((i) => i.country)
                    .toString()
                );
                setLoading(false);
              }
            });
        });
    } else {
      window.location = "/";
    }
  };

  const handleSaveAccountSetting = () => {
    axios
      .put(`${url}/api/freelancer-account-settings`, {
        email: email1.email,
        account: myAccount.checked,
        hourRate: frontend.checked,
        projectNotification: notification.checked,
      })
      .then((res) => {
        setLoading(true);
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
          setLoading(false);
          loadDetails();
        } else {
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
          setLoading(false);
        }
      });
  };

  const handleUpdateBilling = () => {
    axios
      .put(`${url}/api/update/freelancer/billing-details`, {
        email: email1.email,
        firstname: firstName
          ? firstName
          : f_name
          ? f_name
          : userFirst_Name
          ? userFirst_Name
          : "",
        lastname: lastName ? lastName : userLast_Name ? userLast_Name : "",
        companyname: companyName ? companyName : comp_name ? comp_name : "",
        address: address ? address : b_add ? b_add : "",
        country: selectCountry.label
          ? selectCountry.label
          : b_country
          ? b_country
          : "",
        city: city ? city : b_city ? b_city : "",
        zipcode: zipcode ? zipcode : b_zipcode ? b_zipcode : "",
        billingNumber: phone ? phone : b_phone ? b_phone : "",
        billingEmail: emailBiliing
          ? emailBiliing
          : userBilling_Email
          ? userBilling_Email
          : "",
      })
      .then((res) => {
        setLoading(true);
        // console.log(res.data);
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
          loadDetails();
          setLoading(false);
        } else {
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
          setLoading(false);
        }
        // console.log("freelance-billing", res.data);
      });
  };

  const handelUpdatePassword = () => {
    axios
      .put(`${url}/api/update/password/${id}`, {
        password: currentPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        setLoading(true);
        // console.log(res.data);
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
          setLoading(false);
        } else {
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
          setLoading(false);
        }
        // console.log("freelance-updatepassword", res.data);
      });
  };

  const handleEmailNotification = () => {
    axios
      .put(`${url}/api/update/freelancer/notification-email`, {
        email: email1.email,
        notificationEmail: emailNotification
          ? emailNotification
          : userBilling_Email
          ? userBilling_Email
          : "",
      })
      .then((res) => {
        // console.log("ggg", res);
        setLoading(true);
        // console.log(res.data);
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
          loadDetails();
          setLoading(false);
        } else {
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
          loadDetails();
          setLoading(false);
        }
        // console.log("notificationEmail", res)
      });
  };

  const handleCancelNotifications = () => {
    axios
      .post(`${url}/api/cancel/notification-email`, {
        email: email1.email,
      })
      .then((res) => {
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
          loadDetails();
          setLoading(false);
        } else {
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
          loadDetails();
          setLoading(false);
        }
      });
  };

  const handleAccountDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All the data will be Deleted Permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      // console.log("result", result);
      if (result.value) {
        axios
          .post(`${url}/api/freelancer/delete/user/account`, {
            email: email1.email,
            password,
            confirmPassword,
            reason,
            description,
          })
          .then((res) => {
            // console.log("res", res);
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
              history.push("/");
              localStorage.removeItem("pwd");
              setLoading(false);
            } else {
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
              // setLoading(false);
            }
          });
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
          <div className="row mx-0" style={{ marginTop: "50px" }}>
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
                      style={{ textAlign: "left" }}
                      label="Manage Account"
                      {...a11yProps(0)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Billing Address"
                      {...a11yProps(1)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Password"
                      {...a11yProps(2)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Email Notification"
                      {...a11yProps(3)}
                    />
                    <Tab
                      style={{ textAlign: "left" }}
                      label="Delete Account"
                      {...a11yProps(4)}
                    />
                  </Tabs>
                  <TabPanel value={value} index={0} className="edit-tab">
                    <div className="row">
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Manage Account
                      </Typography>
                      <p
                        style={{
                          fontSize: "16px",
                          marginTop: "10px",
                        }}
                      >
                        To hide your profile all over the site you can disable
                        your profile temporarily
                      </p>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Switch
                          onChange={handleChangeSwitchMyAccount}
                          checked={
                            myAccount ? myAccount.checked : manageAccountValue
                          }
                        />{" "}
                        {/* {console.log("SDF", myAccount.checked)} */}
                        <span
                          style={{
                            fontSize: "16px",
                            marginLeft: 15,
                          }}
                        >
                          Disable my account temporarily
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Switch
                          onChange={handleChangeSwitchHourlyRateForntend}
                          checked={
                            frontend ? frontend.checked : manageHourlyRateValue
                          }
                        />{" "}
                        <span
                          style={{
                            fontSize: "16px",
                            marginLeft: 15,
                          }}
                        >
                          Disable hourly rate on frontend
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {console.log(
                          "notification",
                          notification,
                          manageNotificationValue
                        )}
                        <Switch
                          onChange={handleChangeSwitchNewProjectNotification}
                          // checked={notification.checked}
                          checked={
                            notification
                              ? notification.checked
                              : manageNotificationValue
                          }
                        />{" "}
                        <span
                          style={{
                            fontSize: "16px",
                            marginLeft: 15,
                          }}
                        >
                          New project notification
                        </span>
                      </div>
                      <div className="mt-4">
                        <Button
                          className="btn btn-blue"
                          variant="contained"
                          onClick={() => handleSaveAccountSetting()}
                        >
                          Save Account Settings
                        </Button>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1} className="edit-tab">
                    <div className="row">
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Billing details
                      </Typography>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          // id
                          defaultValue={
                            f_name
                              ? f_name
                              : userFirst_Name
                              ? userFirst_Name
                              : ""
                          }
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          // id
                          defaultValue={
                            l_name ? l_name : userLast_Name ? userLast_Name : ""
                          }
                          placeholder="Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={comp_name ? comp_name : ""}
                          aria-describedby="emailHelp"
                          placeholder="Company Name"
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={b_add ? b_add : ""}
                          placeholder="Your Address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <Select
                          options={options}
                          placeholder={b_country ? b_country : ""}
                          value={selectCountry}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={b_city ? b_city : ""}
                          placeholder="City"
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          defaultValue={b_zipcode ? b_zipcode : ""}
                          placeholder="Zipcode "
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          defaultValue={b_phone ? b_phone : ""}
                          placeholder="Phone"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="email"
                          className="form-control"
                          // id
                          defaultValue={
                            b_email
                              ? b_email
                              : userBilling_Email
                              ? userBilling_Email
                              : ""
                          }
                          placeholder="Email"
                          onChange={(e) => setBillingEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Button
                          className="btn btn-blue mt-3"
                          onClick={() => handleUpdateBilling()}
                        >
                          {" "}
                          Upload billing details
                        </Button>
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
                        Reset Password
                      </Typography>
                      <div className="row">
                        <div className="col-lg-6 pt-3 form-group">
                          <input
                            type="text"
                            className="form-control"
                            // id
                            aria-describedby="emailHelp"
                            placeholder="New Password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 pt-3 form-group">
                          <input
                            type="text"
                            className="form-control"
                            // id
                            placeholder="Confirm Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Button
                          className="btn btn-blue mt-3"
                          onClick={() => handelUpdatePassword()}
                        >
                          {" "}
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={3} className="edit-tab">
                    <div>
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Email Notifications
                      </Typography>
                      <span style={{ fontSize: "16px" }}>
                        All the emails will be sent to the below email address
                      </span>
                      <div className="row">
                        <div className="col-lg-6 pt-3 form-group text-right">
                          <input
                            type="text"
                            className="form-control"
                            // id
                            defaultValue={
                              eNotificaion
                                ? eNotificaion === "Cancelled"
                                  ? ""
                                  : eNotificaion
                                : eNotificaion
                            }
                            placeholder={
                              eNotificaion === "Cancelled"
                                ? "Enter Email"
                                : eNotificaion
                            }
                            onChange={(e) =>
                              setEmailNotification(e.target.value)
                            }
                          />
                          {eNotificaion === "Cancelled" ? (
                            <p
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Please Enter email to get updates.
                            </p>
                          ) : (
                            // eslint-disable-next-line
                            <a
                              style={{
                                color: "#339ffa",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                              onClick={handleCancelNotifications}
                            >
                              Cancel Notifications
                            </a>
                          )}
                        </div>
                      </div>
                      {eNotificaion === "Cancelled" ? (
                        <div>
                          <Button
                            className="btn btn-blue mt-3"
                            onClick={() => handleEmailNotification()}
                          >
                            Change Email
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={4} className="edit-tab">
                    <div className="row">
                      <Typography
                        variant="h5"
                        component="div"
                        className="postjob-fontsize"
                      >
                        Delete Account
                      </Typography>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          // id
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          // id
                          placeholder="Retype Password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          onChange={(e) => setReason(e.target.value)}
                        >
                          <option>Select Reason to Leave</option>
                          <option>No satisfied with the system</option>
                          <option>Support is not good</option>
                          <option>Others</option>
                        </select>
                      </div>
                      <div>
                        <textarea
                          className="form-control"
                          placeholder="Description (optional)"
                          onChange={(e) => setDescription(e.target.value)}
                          rows="8"
                        />
                      </div>
                      <div className="mt-4">
                        <Button
                          className="btn btn-blue"
                          onClick={() => handleAccountDelete()}
                        >
                          Delete Account
                        </Button>
                      </div>
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
};

export default AccountForm;
