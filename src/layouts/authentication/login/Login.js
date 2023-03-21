import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "assets/defaultImages/Vamelogo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useHistory } from "react-router";
import { url } from "config";
//eslint-disable-next-line
import { GoogleLogin, GoogleLogout } from "react-google-login";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (prop) => (event) => {
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
  // eslint-disable-next-line
  const responseGoogle = (res) => {
    // console.log(res);
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/login`, {
        email: email,
        password: values.password,
      })
      .then((result) => {
        if (result.data.success) {
          localStorage.setItem("pwd", result.data.accessToken);
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

          if (result.data.startas === "Employer") {
            history.push("/employer-dashboard");
          } else if (result.data.startas === "Admin") {
            history.push("/project");
          } else {
            if (result.data.login === false) {
              history.push(`/freelancer/edit-profile/${result.data.id}`);
            } else {
              history.push("/freelancer/search-projects");
            }
          }
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
    <div style={{ backgroundColor: "#20a6df", textAlign: "center" }}>
      <div
        className="page-padding"
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
          alignContent: "center",
        }}
      >
        <div className="row justify-content-center mx-0">
          <div className="col-sm-7 col-lg-5">
            <Card>
              <CardContent
                style={{
                  paddingTop: "60px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  <div className="center_div">
                    <img
                      height="80px"
                      width="80px"
                      alt="Registration logo"
                      className=" ls-is-cached lazyloaded "
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

                  <div style={{ paddingTop: "45px" }}>
                    <div>
                      <h4
                        style={{
                          fontSize: "24px",
                          margin: "0px",
                        }}
                      >
                        <b> Sign In Now </b>
                      </h4>
                      <div
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          fontSize: "18px",
                        }}
                      >
                        <span style={{ color: "#676767" }}>
                          Don’t have an account?&nbsp;
                          <a href="/authentication">Sign up</a>
                        </span>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div>
                      <TextField
                        onChange={handleUserEmail}
                        fullWidth
                        id="outlined-basic"
                        placeholder="Type email or username"
                        variant="outlined"
                      />{" "}
                      <br />
                      <br />
                      <OutlinedInput
                        fullWidth
                        variant="outlined"
                        className="w-100"
                        id="outlined-basic outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        placeholder="Password"
                        onChange={handlePassword("password")}
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
                      <br />
                      <br />
                      <div style={{ textAlign: "left" }}>
                        {" "}
                        <Checkbox /> Keep me logged in{" "}
                      </div>
                      <br />
                      <div>
                        <Button
                          onClick={(e) => handleSignIn(e)}
                          fullWidth
                          variant="contained"
                          style={{
                            backgroundColor: "#ff7300",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            textTransform: "none",
                            fontSize: "18px",
                            color: "#fff",
                          }}
                        >
                          <LockOutlinedIcon
                            style={{
                              position: "absolute",
                              left: 20,
                            }}
                          />
                          Sign In
                        </Button>
                      </div>
                    </div>
                    <br /> <br />
                    <div>
                      <a href="/resetpage" style={{ fontSize: "18px" }}>
                        Reset Password?
                      </a>
                    </div>
                    <br />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Divider
                        style={{
                          marginRight: "5px",
                          backgroundColor: "#676767",
                          width: "47%",
                        }}
                      />
                      or
                      <Divider
                        style={{
                          marginLeft: "5px",
                          backgroundColor: "#676767",
                          width: "47%",
                        }}
                      />
                    </div>
                    <br />
                    <br />
                    <div className="row">
                      <div className="col-sm-6 mb-3">
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
                        </Button>{" "}
                      </div>
                      <div className="col-sm-6 mb-3">
                        {/* <GoogleLogin
                          clientId="600589485679-2iouqdk68vrqoo3hhhnkvi5l65umqdtj.apps.googleusercontent.com"
                          buttonText="Login"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          fetchBasicProfile={false}
                          cookiePolicy={"single_host_origin"}
                        />
                        <GoogleLogout
                          clientId="600589485679-2iouqdk68vrqoo3hhhnkvi5l65umqdtj.apps.googleusercontent.com"
                          buttonText="Logout"
                          onLogoutSuccess={(res) => console.log(res)}
                          onFailure={(res) => console.log(res)}
                        ></GoogleLogout> */}
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
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default Login;
