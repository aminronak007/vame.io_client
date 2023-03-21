import React, { useState } from "react";
import { url } from "config";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import logo from "assets/defaultImages/Vamelogo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

function Authentication() {
  const history = useHistory();
  const [f_name, setF_Name] = useState("");
  const [l_name, setL_Name] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [startas, setStartAs] = useState("Virtual Assistant");
  const [agree, setAgree] = useState(false);

  const handleFirstName = (e) => {
    setF_Name(e.target.value);
  };

  const handleLastName = (e) => {
    setL_Name(e.target.value);
  };

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNewPassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleStartAs = (e) => {
    setStartAs(e.target.value);
  };

  const handleSignup = (e) => {
    axios
      .post(`${url}/api/signup`, {
        firstname: f_name,
        lastname: l_name,
        email: newemail,
        password: values.password,
        startas: startas ? startas : null,
        agree: agree,
      })
      .then((result) => {
        if (result.data.success) {
          toast.success(result.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          history.push("/");
        } else {
          toast.error(result.data.error, {
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

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div
        className="row"
        style={{
          padding: "25px",
          paddingTop: "125px",
          paddingBottom: "125px",
        }}
      >
        <div className="col-12 col-md-6">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-lg-8 col-xl-7">
              <div className="signup-left">
                <div className="center_div">
                  <img
                    height="80px"
                    width="80px"
                    alt="Registration logo"
                    className=" ls-is-cached lazyloaded"
                    src={logo}
                  />
                  <span
                    style={{
                      fontSize: "40px",
                      fontWeight: "bolder",
                      color: "#339aff",
                    }}
                  >
                    Vame
                  </span>
                </div>
                <br />
                <br />
                <div>
                  <h4>It's Free to Sign Up and Get Started.</h4>
                  <spna style={{ color: "grey" }}>
                    Already have account?&nbsp;
                    <a href="/">Sign In Now</a>
                  </spna>
                </div>

                <br />
                <form>
                  <div className="row">
                    <div className="col-sm-6 pe-sm-2 mb-3">
                      <TextField
                        className="w-100"
                        onChange={(e) => handleFirstName(e)}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="First Name "
                      />
                    </div>{" "}
                    <div className="col-sm-6 ps-sm-2 mb-3">
                      <TextField
                        className="w-100"
                        onChange={(e) => handleLastName(e)}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <TextField
                        style={{
                          display: "block",
                          width: "150%",
                        }}
                        className="w-100"
                        fullWidth
                        onChange={(e) => handleNewEmail(e)}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Email"
                      />{" "}
                    </div>
                    <div className="col-12 mb-3">
                      <OutlinedInput
                        variant="outlined"
                        className="w-100"
                        id="outlined-basic outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        placeholder="Password"
                        onChange={handleNewPassword("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              style={{
                                paddingLeft: "30px",
                                position: "absolute",
                                right: 20,
                              }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        style={{
                          color: "black",
                          fontSize: "18px",
                        }}
                      >
                        I want to start as:
                      </FormLabel>
                      <RadioGroup
                        onChange={(e) => handleStartAs(e)}
                        aria-label="I want to start as:"
                        defaultValue="Virtual Assistant"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Virtual Assistant"
                          control={<Radio />}
                          label="Virtual Assistant"
                        />
                        <FormControlLabel
                          value="Employer"
                          control={<Radio />}
                          label="Employer"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontSize: "14px",
                      color: "#676767",
                      backgroundColor: "#f7f7f7",
                      borderRadius: "4px",
                    }}
                  >
                    <Checkbox
                      onChange={() => setAgree(!agree)}
                      checked={agree ? "checked" : null}
                    />
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setAgree(!agree)}
                    >
                      Agree with{" "}
                    </span>
                    <a href="/terms-condition">Terms &amp; Conditions</a>{" "}
                  </div>{" "}
                  <br />
                  <div>
                    <div>
                      <Button
                        onClick={(e) => handleSignup(e)}
                        fullWidth
                        variant="contained"
                        style={{
                          textTransform: "none",
                          backgroundColor: "#ff7300",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          color: "#fff",
                        }}
                      >
                        <LockOutlinedIcon
                          style={{
                            position: "absolute",
                            left: 40,
                          }}
                        />
                        Sign up now
                      </Button>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-sm-6 col-md-12 mb-3">
                      <Button
                        fullWidth
                        style={{
                          backgroundColor: "#3b5999",
                          textTransform: "none",
                          color: "whitesmoke",
                          height: "40px",
                        }}
                      >
                        <i
                          className="fab fa-facebook-f login-social-icon fb-icon"
                          style={{
                            position: "absolute",
                            left: 20,
                          }}
                        ></i>
                        Facebook
                      </Button>
                    </div>
                    <div className="col-sm-6 col-md-12 mb-3">
                      <Button
                        fullWidth
                        style={{
                          backgroundColor: "#dd4b39",
                          textTransform: "none",
                          color: "whitesmoke",
                          height: "40px",
                        }}
                      >
                        <i
                          className="fab fa-google login-social-icon google-icon"
                          style={{
                            position: "absolute",
                            left: 20,
                          }}
                        ></i>
                        Google
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="d-none d-md-block col-md-6">
          <div className="row justify-content-center">
            <div className="col-10">
              <div style={{ textAlign: "right", opacity: "0.03" }}>
                <h2 style={{ fontSize: "45px" }}>Welcome to Vame</h2>
                <br />
                <span
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                  }}
                >
                  “Talent wins games, but teamwork and intelligence wins
                  championships“{" "}
                </span>
                <br />
                <span
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                  }}
                >
                  by Michael jordan
                </span>
              </div>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  width="440"
                  height="376"
                  alt=""
                  data-srcset="https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01.png 440w, https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01-300x256.png 300w, https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01-351x300.png 351w"
                  data-src="https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01.png"
                  data-sizes="(max-width: 440px) 100vw, 440px"
                  className="attachment-large size-large ls-is-cached lazyloaded img-fluid"
                  src="https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01.png"
                  sizes="(max-width: 440px) 100vw, 440px"
                  srcset="https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01.png 440w, https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01-300x256.png 300w, https://vame.io/wp-content/uploads/2021/06/landing_Illustration_01-351x300.png 351w"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
