import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "react-switch";
import EmployerNavbar from "./EmployerNavbar";
import EmployerSidebar from "./EmployerSidebar";
import { url } from "config";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

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

const EmployerAccountSetting = () => {
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  // --------------------tab-0------------

  const [myAccount, setMyAccount] = React.useState(false);
  const [notification, setNotification] = React.useState(false);

  const handleChangeSwitchMyAccount = (checked) => {
    setMyAccount({ checked });
  };

  const handleChangeSwitchNotification = (checked) => {
    setNotification({ checked });
  };

  // ------------------tab-1----------------------
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [selectCountry, setSelectCountry] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [emailBilling, setEmailBilling] = React.useState("");
  const [updateFlag, setUpdateFlag] = React.useState(false);

  const options = React.useMemo(() => countryList().getData(), []);

  const changeHandler = (selectCountry) => {
    setSelectCountry(selectCountry);
  };

  // ----------------------tab-2----------------

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  // ---------------------------tab-3--------------
  const [emailNotification, setEmailNotification] = React.useState("");
  //-------------------------tab-4-----------------

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [description, setDescription] = React.useState("");

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
  const [manageNotification, setManageNotification] = React.useState(false);
  const [userFirst_Name, setUserFirst_Name] = React.useState("");
  const [userLast_Name, setUserLast_Name] = React.useState("");
  const [userBilling_Email, setUserBilling_Email] = React.useState("");
  const [eNotificaion, setENotification] = React.useState("");

  // console.log(userFirst_Name, userLast_Name, userBilling_Email);
  let [loading, setLoading] = React.useState(true);
  const [employerCompanyName, setEmployerCompanyName] = React.useState("");
  const [employerAdress, setEmployerAdress] = React.useState("");
  const [employerCountries, setEmployerCountries] = React.useState("");
  const [employerCity, setEmployerCity] = React.useState("");
  const [employerZipcode, setEmployerZipcode] = React.useState("");
  const [employerPhone, setEmployerPhone] = React.useState("");

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  React.useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, [updateFlag]);

  const loadDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          console.log(res.data);
          setId(res.data.id);
          setEmail1({ email: res.data.email });
          axios
            .post(`${url}/api/users`, {
              email: res.data.email,
            })
            .then((res) => {
              // setUpdateFlag(!updateFlag)
              setManageAccountValue(res.data.userDetails.account);
              setManageNotification(res.data.userDetails.projectNotification);

              setUserFirst_Name(res.data.userDetails.firstname);
              setUserLast_Name(res.data.userDetails.lastname);
              setUserBilling_Email(res.data.userDetails.email);
              setENotification(res.data.userDetails.notificationEmail);
              // console.log(res.data.userDetails);
              setLoading(false);
            });
          axios
            .post(`${url}/api/employer-details`, { email: res.data.email })
            .then((resp) => {
              // setUpdateFlag(!updateFlag)
              setEmployerCompanyName(
                resp.data.employerDetails.billingDetails
                  ?.map((i) => i.companyName)
                  .toString()
              );
              setEmployerAdress(
                resp.data.employerDetails.billingDetails
                  ?.map((i) => i.address)
                  .toString()
              );
              setEmployerCountries(
                resp.data.employerDetails.billingDetails
                  ?.map((i) => i.country)
                  .toString()
              );
              setEmployerCity(
                resp.data.employerDetails.billingDetails
                  ?.map((i) => i.city)
                  .toString()
              );
              setEmployerZipcode(
                resp.data.employerDetails.billingDetails
                  ?.map((i) => i.zipcode)
                  .toString()
              );
              setEmployerPhone(
                resp.data.employerDetails.billingDetails
                  ?.map((i) => i.billingNumber)
                  .toString()
              );
            });
        });
    } else {
      window.location = "/";
    }
  };

  const handleSaveAccountSetting = () => {
    axios
      .put(`${url}/api/employer-account-settings`, {
        email: email1.email,
        account: myAccount.checked,
        projectNotification: notification.checked,
      })
      .then((res) => {
        console.log(res.data);
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
        // console.log("employer-account-setting", res.data);
      });
  };

  const handleBillingDetails = () => {
    axios
      .put(`${url}/api/update/employer/billing-details`, {
        email: email1.email,
        firstname: firstName ? firstName : userFirst_Name ? userFirst_Name : "",
        lastname: lastName ? lastName : userLast_Name ? userLast_Name : "",
        companyname: companyName
          ? companyName
          : employerCompanyName
          ? employerCompanyName
          : "",
        address: address ? address : employerAdress ? employerAdress : "",
        country: selectCountry.label
          ? selectCountry.label
          : employerCountries
          ? employerCountries
          : "",
        city: city ? city : employerCity ? employerCity : "",
        zipcode: zipcode ? zipcode : employerZipcode ? employerZipcode : "",
        billingNumber: phone ? phone : employerPhone ? employerPhone : "",
        billingEmail: emailBilling
          ? emailBilling
          : userBilling_Email
          ? userBilling_Email
          : "",
      })
      .then((res) => {
        setLoading(true);
        loadDetails();
        setUpdateFlag(!updateFlag);
        console.log(res.data);
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
        // console.log("employer-account-setting", res.data);
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
        console.log(res.data);
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
      .put(`${url}/api/update/employer/notification-email`, {
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
          setLoading(false);
        }
      });
  };

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All the data will be Deleted Permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      console.log(result);
      if (result.value) {
        axios
          .post(`${url}/api/employer/delete/user/account`, {
            email: email1.email,
            password,
            confirmPassword,
            reason,
            description,
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
                        If searchable option will be disabled then your profile
                        will not show in the search result. To hide your profile
                        all over the site you can disable your profile
                        temporarily
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
                          // defaultChecked
                          checked={
                            myAccount ? myAccount.checked : manageAccountValue
                          }
                        />{" "}
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
                          onChange={handleChangeSwitchNotification}
                          // checked={notification.checked}
                          checked={
                            notification
                              ? notification.checked
                              : manageNotification
                          }
                        />{" "}
                        <span
                          style={{
                            fontSize: "16px",
                            marginLeft: 15,
                          }}
                        >
                          Disable "New message" notification emails
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
                          defaultValue={userFirst_Name ? userFirst_Name : ""}
                          // id="validationCustomUsername"
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={userLast_Name ? userLast_Name : ""}
                          // id="validationCustomUsername"
                          placeholder="Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={
                            employerCompanyName ? employerCompanyName : ""
                          }
                          // id="validationCustomUsername"
                          aria-describedby="emailHelp"
                          placeholder="Company Name"
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={employerAdress ? employerAdress : ""}
                          // id="validationCustomUsername"
                          placeholder="Your Address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <Select
                          placeholder={
                            employerCountries ? employerCountries : ""
                          }
                          value={selectCountry ? selectCountry : ""}
                          options={options}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          defaultValue={employerCity ? employerCity : ""}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          defaultValue={employerZipcode ? employerZipcode : ""}
                          // id="validationCustomUsername"
                          placeholder="Zipcode "
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          defaultValue={employerPhone ? employerPhone : ""}
                          // id="validationCustomUsername"
                          placeholder="Phone"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 pt-3 form-group">
                        <input
                          type="email"
                          className="form-control"
                          defaultValue={
                            userBilling_Email ? userBilling_Email : ""
                          }
                          // id="validationCustomUsername"
                          placeholder="Email"
                          onChange={(e) => setEmailBilling(e.target.value)}
                        />
                      </div>
                      <div>
                        <Button
                          className="btn btn-blue mt-3"
                          onClick={() => handleBillingDetails()}
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
                            // id="validationCustomUsername"
                            aria-describedby="emailHelp"
                            placeholder="New Password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 pt-3 form-group">
                          <input
                            type="text"
                            className="form-control"
                            // id="validationCustomUsername"
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
                            // id="validationCustomUsername"
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
                          // id="validationCustomUsername"
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-4 pt-3 form-group">
                        <input
                          type="text"
                          className="form-control"
                          // id="validationCustomUsername"
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
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Description (optional)"
                          rows="8"
                        />
                      </div>
                      <div className="mt-4">
                        <Button
                          className="btn btn-blue"
                          onClick={() => handleDeleteAccount()}
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

export default EmployerAccountSetting;
