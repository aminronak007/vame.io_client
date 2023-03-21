import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import heartLogo from "../../image/img-03.png";

const PendingInvitations = ({
  invitations,
  handleAcceptInvitation,
  handleRejectInvitation,
}) => {
  return (
    <div className="row">
      <Typography variant="h5" component="div" className="postjob-fontsize">
        Pending Job Invitations
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: "black",
        }}
      >
        <div className="row mt-3">
          <div className="col-12 text-center">
            {invitations && invitations.length > 0 ? (
              invitations.map((i, index) => {
                return (
                  <React.Fragment key={`key${index}`}>
                    {!i?.jobId?.sendInvitation?.freelancerAcceptStatus ===
                    true ? (
                      <div
                        key={`key${index}`}
                        className="row align-items-center"
                      >
                        <div className="col-md-12 col-lg-8 col-xl-9 text-justify">
                          <b
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {i?.jobId?.jobtitle}
                          </b>
                          &nbsp;
                          {i?.jobId?.sendInvitation?.freelancerAcceptStatus ===
                          true ? (
                            <span className="text-success">
                              <CheckCircleIcon />
                              Offer Accepted
                            </span>
                          ) : i.jobId?.sendInvitation
                              ?.freelancerAcceptStatus === false ? (
                            <span className="text-danger">
                              <CancelIcon />
                              Offer Rejected
                            </span>
                          ) : (
                            <span className="text-info">
                              <PendingIcon />
                              Offer Pending
                            </span>
                          )}
                          &nbsp;
                          <div className="mt-2">
                            <p>{i?.jobId?.jobdescription}</p>
                          </div>
                          {i?.fixedPrice ? (
                            <div className="mt-2">
                              <p>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Fixed Price:&nbsp;
                                </span>

                                <span>{i?.fixedPrice}</span>
                              </p>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <p>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  Project Completion Hours:&nbsp;
                                </span>

                                <span>{i?.noOfHours}</span>
                              </p>
                            </div>
                          )}
                          {i?.jobId?.projectStatus?.paymentDetails ? (
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
                              Payment has been done by the Employer. You can
                              start the work & complete the project to release
                              your payment.
                            </p>
                          ) : i?.jobId?.sendInvitation
                              ?.freelancerAcceptStatus === false ? (
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
                              Please wait for the next offer from the Employer.
                            </p>
                          ) : i?.jobId?.sendInvitation
                              ?.freelancerAcceptStatus !== true ? (
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
                              Please accept the project if you are agree with
                              the Employer offer.
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

                        <div className="col-md-12 col-lg-4 col-xl-3">
                          {i.jobId?.sendInvitation?.freelancerAcceptStatus ===
                            true ||
                          i.jobId?.sendInvitation?.freelancerAcceptStatus ===
                            false ? null : (
                            <Button
                              className="accept btn btn-accept w-100 d-flex justify-content-center mt-3"
                              onClick={() => {
                                handleAcceptInvitation(
                                  i.jobId._id,
                                  i.employerId,
                                  i?.fixedPrice,
                                  i.noOfHours
                                );
                              }}
                            >
                              <CheckCircleIcon />
                              &ensp; Accept Offer
                            </Button>
                          )}

                          <br />
                          {i.jobId?.sendInvitation?.freelancerAcceptStatus ===
                            true ||
                          i.jobId?.sendInvitation?.freelancerAcceptStatus ===
                            false ? null : (
                            <Button
                              className="reject btn btn-accept w-100 d-flex justify-content-center"
                              onClick={() => {
                                handleRejectInvitation(
                                  i.jobId._id,
                                  i.employerId,
                                  i?.fixedPrice,
                                  i.noOfHours
                                );
                              }}
                            >
                              <CheckCircleIcon />
                              &ensp; Reject Offer
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : null}
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
                <p>You don't have any Job Invitations.</p>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default PendingInvitations;
