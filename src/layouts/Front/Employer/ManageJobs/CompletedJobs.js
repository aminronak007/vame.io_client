import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PencileLogo from "../images/img-03.png";

const CompletedJobs = ({
  completedJobs,
  handleOpen,
  Rating,
  setFreelancerId,
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
                    <div className="row mt-4 mt-lg-0">
                      <div className="col-md-12 col-lg-8 text-justify">
                        <b>{i.jobtitle}</b>
                        <div className="mt-2">
                          <p>{i.jobdescription}</p>
                          {i?.ratings?.employerRatingsToFreelancer ? (
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
                              {i?.ratings?.employerRatingsToFreelancer?.reviews}
                              "
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-4">
                        {i?.ratings?.employerRatingsToFreelancer?.employerId ? (
                          <React.Fragment>
                            <label>Your Ratings to Freelancer</label>
                            <br />
                            <Rating
                              name="size-large"
                              value={
                                i?.ratings?.employerRatingsToFreelancer?.ratings
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
                              {i?.ratings?.employerRatingsToFreelancer?.ratings}
                              .0
                            </span>
                          </React.Fragment>
                        ) : (
                          <Button
                            onClick={(e) => {
                              handleOpen();
                              setFreelancerId({
                                _id: i._id,
                                assignedFreelancer:
                                  i.projectStatus.assignedFreelancer,
                              });
                            }}
                            className="accept btn btn-accept w-100 d-flex justify-content-center"
                          >
                            <CheckCircleIcon /> <span> Write a Review</span>
                          </Button>
                        )}
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
                <span>You don't have any Completed Jobs.</span>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default CompletedJobs;
