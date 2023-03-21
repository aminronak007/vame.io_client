import React from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import heartLogo from "../../image/img-03.png";

const OnGoingJobs = ({
  onGoingJobs,
  handleProjectCompleted,
  setNumberOfHours,
  handleAcceptByFreelancer,
  handleRejectByFreelancer,
}) => {
  return (
    <div className="row">
      <Typography variant="h5" component="div" className="postjob-fontsize">
        On Going Jobs
      </Typography>
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
                      <div className="col-md-9 text-justify">
                        <b
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          {i?.jobtitle}
                        </b>
                        &nbsp;
                        {i?.projectStatus?.proStatus ? (
                          <span>
                            ({""}
                            {i?.projectStatus?.proStatus}
                            {""})
                          </span>
                        ) : null}
                        <div className="mt-2">
                          <p>{i?.jobdescription}</p>
                        </div>
                        {i?.projectStatus?.paymentDetails ? (
                          <p className="text-info">
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
                            Payment has been done by the Employer. You can start
                            the work & complete the project to release your
                            payment.
                          </p>
                        ) : (
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
                            Please wait for the payment confirmation status by
                            the Admin to start the work.&ensp;
                          </p>
                        )}
                      </div>

                      <div className="col-md-3">
                        {i?.projectStatus?.freelancerStatus ===
                        "In Progress" ? (
                          <Button
                            className="completed btn btn-accept w-100 d-flex justify-content-center"
                            onClick={() => {
                              handleProjectCompleted(i?._id);
                            }}
                            disabled={
                              i?.projectStatus?.freelancerStatus ===
                                "Project Successfully Completed" ||
                              i?.projectStatus?.freelancerStatus ===
                                "Cancelled" ||
                              i?.projectStatus?.proStatus === "Cancelled" ||
                              !i?.projectStatus?.paymentDetails
                                ? true
                                : false
                            }
                          >
                            <CheckCircleIcon />
                            &ensp; Project Completed
                          </Button>
                        ) : i?.projectStatus?.freelancerStatus ===
                          "Project Successfully Completed" ? null : (
                          <React.Fragment>
                            <input
                              className="freelancer-projects-input-hour"
                              min="0"
                              type="number"
                              placeholder=" No. of Hours"
                              onChange={(e) => setNumberOfHours(e.target.value)}
                            />
                            <Button
                              className="accept btn btn-accept w-100 d-flex justify-content-center mt-3"
                              onClick={() => {
                                handleAcceptByFreelancer(i?._id);
                              }}
                              disabled={
                                i?.projectStatus?.freelancerStatus ===
                                  "In Progress" ||
                                i?.projectStatus?.freelancerStatus ===
                                  "Cancelled" ||
                                i?.projectStatus?.proStatus === "Cancelled"
                                  ? true
                                  : false
                              }
                            >
                              <CheckCircleIcon />
                              &ensp; Accept Project
                            </Button>
                          </React.Fragment>
                        )}

                        <br />
                        {i?.projectStatus?.freelancerStatus !==
                        "Project Successfully Completed" ? (
                          <Button
                            className="reject btn btn-accept w-100 d-flex justify-content-center"
                            onClick={() => {
                              handleRejectByFreelancer(i?._id);
                            }}
                            disabled={
                              !i?.projectStatus?.paymentDetails ? true : false
                            }
                          >
                            <CheckCircleIcon />
                            &ensp; Cancel Project
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <div
                className="pb-4"
                style={{
                  justifyContent: "center",
                  // height: "800px",
                }}
              >
                <img src={heartLogo} alt="logo" />
                <p>You don't have any Current Jobs to Manage.</p>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default OnGoingJobs;
