import React, { useContext } from "react";
import axios from "axios";
import logo from "assets/defaultImages/Vamelogo.png";
import { GlobalState } from "../../../contextState/GlobalState";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import { url } from "config";

function ResetPage() {
  let history = useHistory();
  const { sendemail, setSendEmail, user_id, setUser_Id } =
    useContext(GlobalState);

  const handleEmail = (e) => {
    setSendEmail(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/forgotpassword`, {
        email: sendemail,
        id: user_id,
      })
      .then((result) => {
        setUser_Id(result.data.userEmail.map((i) => i._id));
        history.push("/");
      });
  };

  return (
    <div
      className="vh-100"
      style={{ backgroundColor: "#20a6df", textAlign: "center" }}
    >
      <div>
        <div
          className="page-padding"
          style={{
            paddingTop: "60px",
            paddingBottom: "60px",
            alignContent: "center",
          }}
        >
          <div className="row mx-0 justify-content-center align-items-center">
            <div className="col-sm-7 col-lg-5">
              <div className="card">
                <div className="card-body card-pedding">
                  <form>
                    <div className="row justify-content-center no-gutters">
                      <div className="col-12">
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
                        <br />
                        <br />
                        <div>
                          <h4 className="fw-bold">Forgot password</h4>
                          <p>
                            If you have an account?{" "}
                            <a className="text-decoration-none" href="/">
                              Sign In
                            </a>
                          </p>
                        </div>
                        <div>
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Email"
                            onChange={(e) => handleEmail(e)}
                          />
                        </div>{" "}
                        <br />
                        <br />
                        <Button
                          className="w-100 btn btn-lg"
                          type="submit"
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
                          onClick={(e) => handleResetPassword(e)}
                        >
                          Get Password
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPage;
