import React, { useState } from "react";
import axios from "axios";
import logo from "assets/defaultImages/Vamelogo.png";
// import { GlobalState } from "../context/GlobalState";
import { useHistory, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "config";

function ResetPassword() {
  // const { sendemail, user_id } = useContext(GlobalState);
  let history = useHistory();
  const id = useParams();
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [updatedPassword, setUpdatedPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handdleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetNewPassword = (e) => {
    e.preventDefault();
    if (confirmPassword !== newpassword) {
      toast.error("Password does not Match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      axios
        .post(`${url}/api/resetpassword/${id.id}`, {
          newPassword: newpassword,
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
          history.push("/");
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#20a6df" }} className="h-100">
      <div
        className="page-padding"
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
          alignContent: "center",
        }}
      >
        <div className="row">
          <div className="col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
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
                        <h4 className="fw-bold">New Password</h4>
                      </div>
                      <div>
                        <input
                          type="password"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Password"
                          onChange={(e) => handleNewPassword(e)}
                        />
                      </div>{" "}
                      <br />
                      <div>
                        <input
                          type="password"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Confirm Password"
                          onChange={(e) => handdleConfirmPassword(e)}
                        />
                      </div>{" "}
                      <button
                        className="w-100 btn btn-lg"
                        type="submit"
                        onClick={(e) => handleResetNewPassword(e)}
                      >
                        Set New Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
