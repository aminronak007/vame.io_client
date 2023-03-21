import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PencileLogo from "../images/img-03.png";

const onGoingJobs = ({
  handleProjectCompleted,
  handleRejectProject,
  history,
  onGoingJobs,
}) => {
  return (
    <div className="row">
      <Typography variant="h5" component="div" className="postjob-fontsize">
        On Going Jobs
      </Typography>
      {/* <hr /> */}
      <Typography
        sx={{
          fontSize: 14,
          color: "black",
        }}
      >
        <div className="row mt-3">
          <div className="col-12 text-center">
            {onGoingJobs && onGoingJobs.length > 0 ? (
              onGoingJobs.map((i, index) => {
                return (
                  <React.Fragment key={`key${index}`}>
                    <div className="row align-items-center mt-2">
                      <div className="col-md-12 col-lg-7 col-xl-8 text-justify">
                        <b
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          {i.jobtitle}
                        </b>
                        &nbsp;
                        {i?.projectStatus?.proStatus ? (
                          <span>
                            (
                            {i?.projectStatus?.proStatus ===
                            "Not Verified by Employer"
                              ? "Not Verified"
                              : i?.projectStatus?.proStatus}
                            )
                          </span>
                        ) : null}
                        <div className="mt-2">
                          <p>{i.jobdescription}</p>
                        </div>
                        {i?.projectStatus?.paymentDetails?.orderId ? (
                          <p className="text-success">
                            <span
                              style={{
                                color: "black",
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Note
                            </span>
                            <span
                              style={{
                                color: "black",
                              }}
                            >
                              :&nbsp;
                            </span>
                            You have successfully pay the full amount of the
                            project to Admin.&nbsp;
                          </p>
                        ) : i?.assign === true &&
                          i?.projectStatus?.freelancerStatus ===
                            "In Progress" ? (
                          <p className="text-danger">
                            <span
                              style={{
                                color: "black",
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Note
                            </span>
                            <span
                              style={{
                                color: "black",
                              }}
                            >
                              :&nbsp;
                            </span>
                            Please pay the project amount for security
                            reasons.&nbsp;
                            <span
                              style={{
                                color: "#339aff",
                              }}
                            >
                              {/* eslint-disable-next-line */}
                              <a
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  history.push(
                                    `/employer/project/payment/${i._id}`
                                  )
                                }
                              >
                                Click here to pay
                              </a>
                            </span>
                          </p>
                        ) : i?.projectStatus?.employerStatus ===
                          "In Progress" ? (
                          <p className="text-danger">
                            <span
                              style={{
                                color: "black",
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Note
                            </span>
                            <span
                              style={{
                                color: "black",
                              }}
                            >
                              :&nbsp;
                            </span>
                            Project Assigned Successfully. Please wait for the
                            confirmation from the freelancer.
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-12 col-lg-5 col-xl-4">
                        {i.assign ? (
                          <React.Fragment>
                            <Button
                              className="reject btn btn-accept w-100 d-flex justify-content-center"
                              onClick={() => handleRejectProject(i._id)}
                              disabled={
                                !i?.projectStatus?.paymentDetails ? true : false
                              }
                            >
                              <CheckCircleIcon /> <span>Cancel Project</span>
                            </Button>
                            <br />
                            <Button
                              className="completed btn btn-accept w-100 d-flex justify-content-center"
                              onClick={() => handleProjectCompleted(i._id)}
                              disabled={
                                !i?.projectStatus?.paymentDetails ? true : false
                              }
                            >
                              <CheckCircleIcon /> <span>Project Completed</span>
                            </Button>
                          </React.Fragment>
                        ) : null}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <div
                className="py-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={PencileLogo} alt="PencileLogo"></img>
                <br />
                <span>You don't have any Current Jobs to Manage.</span>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default onGoingJobs;
