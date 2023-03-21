import React from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import heartLogo from "../../image/img-03.png";
import { Link } from "react-router-dom";

const CompletedJobs = ({
  completedJobs,
  freelancerId,
  Rating,
  handleOpen,
  setFreelancerReviewId,
}) => {
  return (
    <div className="row">
      <Typography variant="h5" component="div" className="postjob-fontsize">
        Completed Jobs
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: "black",
        }}
      >
        <div className="row">
          <div className="col-12 text-center">
            {completedJobs && completedJobs.length > 0 ? (
              completedJobs.map((i, index) => {
                return (
                  <React.Fragment key={`key${index}`}>
                    <div className="row mt-4">
                      <div className="col-md-12 col-lg-9 text-justify">
                        <b>{i?.jobtitle}</b>
                        <div className="mt-2">
                          <p>{i?.jobdescription}</p>
                        </div>

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
                          {i?.projectStatus?.releasePaymentStatus === true ? (
                            <React.Fragment>
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                :&nbsp;
                              </span>
                              Your payment has been successfully release by the
                              Admin.&nbsp;
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                :&nbsp;
                              </span>
                              You have successfully completed the Project.&nbsp;
                              <span
                                style={{
                                  color: "#339aff",
                                }}
                              >
                                <Link
                                  to={`/freelancer/release/payment/${i?.slug}/${freelancerId}`}
                                >
                                  Click here to release payment.
                                </Link>
                              </span>
                            </React.Fragment>
                          )}
                        </p>
                        {i?.ratings?.freelancerRatingsToEmployer ? (
                          <p>
                            <span
                              style={{
                                color: "black",
                                textDecoration: "underline",
                                fontWeight: "bold",
                              }}
                            >
                              Reviews
                            </span>
                            :&nbsp; "
                            {i?.ratings?.freelancerRatingsToEmployer?.reviews}"
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-12 col-lg-3">
                        {i?.ratings?.freelancerRatingsToEmployer
                          ?.freelancerId ? (
                          <React.Fragment>
                            <label>Your Ratings to Employer</label>
                            <br />
                            <Rating
                              name="size-large"
                              value={
                                i?.ratings?.freelancerRatingsToEmployer?.ratings
                              }
                              size="large"
                              readOnly
                            />
                            <br />
                            <span
                              style={{
                                backgroundColor: "#faaf00",
                                width: "50px",
                                padding: "4px",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              {i?.ratings?.freelancerRatingsToEmployer?.ratings}
                              .0
                            </span>
                          </React.Fragment>
                        ) : (
                          <Button
                            onClick={(e) => {
                              handleOpen();
                              setFreelancerReviewId({
                                jobId: i?._id,
                                email: i?.email,
                              });
                            }}
                            className="accept btn btn-accept w-100 d-flex justify-content-center"
                          >
                            <CheckCircleIcon />
                            &ensp; Write a Review
                          </Button>
                        )}
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
                <p>You don't have any Completed Jobs.</p>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default CompletedJobs;
