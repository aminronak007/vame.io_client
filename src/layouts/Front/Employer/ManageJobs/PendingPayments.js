import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import { useHistory } from "react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Modal from "@mui/material/Modal";
import PencileLogo from "../images/img-03.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tab1 = ({
  pendingPayments,
  handleSentInvitation,
  handleOpenInvitations,
  openInvitations,
  handleCloseInvitations,
  handleAddHoursButton,
  handleFixPriceButton,
  setNoOfHours,
  showHoursField,
  showFixPriceField,
  setFixedPrice,
}) => {
  const history = useHistory();

  return (
    <div className="row">
      <Typography variant="h5" component="div" className="postjob-fontsize">
        Pending Job Payments
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
            {pendingPayments && pendingPayments.length > 0 ? (
              pendingPayments.map((i, index) => {
                return (
                  <React.Fragment key={`key${index}`}>
                    {!i?.projectStatus?.paymentDetails ? (
                      <React.Fragment>
                        <div className="row align-items-center mt-2">
                          <div className="col-md-9 text-justify">
                            <b
                              style={{
                                fontSize: "16px",
                              }}
                            >
                              {i.jobtitle}
                            </b>
                            {i?.sendInvitation?.freelancerAcceptStatus ===
                            true ? (
                              <span className="text-success">
                                <CheckCircleIcon />
                                Offer Accepted
                              </span>
                            ) : i?.sendInvitation?.freelancerAcceptStatus ===
                              false ? (
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
                            {/* |&nbsp;
                                                                                                <a
                                                                                                    href={`/edit/job/${i.slug}`}
                                                                                                >
                                                                                                    Edit
                                                                                                </a>
                                                                                                &nbsp; */}
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
                              i?.sendInvitation?.freelancerAcceptStatus ===
                                true ? (
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
                            ) : null}
                          </div>

                          <div className="col-md-3 text-left">
                            {i?.sendInvitation?.freelancerAcceptStatus ===
                            false ? (
                              <React.Fragment>
                                <Button
                                  className="accept btn btn-accept w-100 d-flex justify-content-center mt-3"
                                  onClick={() => {
                                    handleOpenInvitations();
                                  }}
                                >
                                  &ensp; Invite Again
                                </Button>
                                <div>
                                  <Modal
                                    open={openInvitations}
                                    onClose={handleCloseInvitations}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                      >
                                        Job / Project:&nbsp;
                                        <span>{i.jobtitle}</span>
                                      </Typography>
                                      <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                      >
                                        Last Offer:
                                        <br />
                                        {i.projectStatus.fixedPrice ? (
                                          <span>
                                            Fixed Price:&nbsp;
                                            {i.projectStatus.fixedPrice}
                                          </span>
                                        ) : (
                                          <span>
                                            No of Hours:&nbsp;
                                            {
                                              i.projectStatus
                                                .projectDurationHours
                                            }
                                          </span>
                                        )}
                                      </Typography>
                                      <Button
                                        onClick={handleAddHoursButton}
                                        className="btn btn-primary mt-2"
                                      >
                                        Add Hours
                                      </Button>
                                      &nbsp;
                                      <Button
                                        onClick={handleFixPriceButton}
                                        className="btn btn-primary mt-2"
                                      >
                                        Fixed Price
                                      </Button>
                                      &nbsp;
                                      <Button
                                        onClick={handleCloseInvitations}
                                        className="btn btn-danger mt-2"
                                      >
                                        Cancel
                                      </Button>
                                      <div className="row">
                                        {showHoursField === true ? (
                                          <React.Fragment>
                                            <div className="col-md-9 mt-2 pr-1">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="No. Of Hours"
                                                onChange={(e) =>
                                                  setNoOfHours(e.target.value)
                                                }
                                              />
                                            </div>
                                            <div className="col-md-3 mt-2 pl-1">
                                              <button
                                                style={{
                                                  color: "white",
                                                }}
                                                className="btn btn-primary mb-1"
                                                onClick={() =>
                                                  handleSentInvitation(
                                                    i._id,
                                                    i.sendInvitation
                                                      .freelancerId
                                                  )
                                                }
                                              >
                                                Send
                                              </button>
                                            </div>
                                          </React.Fragment>
                                        ) : null}

                                        {showFixPriceField === true ? (
                                          <div className="row">
                                            <div className="col-md-10 mt-2 pr-1">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="$ Fixed Price"
                                                onChange={(e) =>
                                                  setFixedPrice(e.target.value)
                                                }
                                              />
                                            </div>

                                            <div className="col-md-2 mt-2 pl-1">
                                              <button
                                                style={{
                                                  color: "white",
                                                }}
                                                className="btn btn-primary mb-1"
                                                onClick={() =>
                                                  handleSentInvitation(
                                                    i._id,
                                                    i.sendInvitation
                                                      .freelancerId
                                                  )
                                                }
                                              >
                                                Send
                                              </button>
                                            </div>
                                          </div>
                                        ) : null}
                                      </div>
                                    </Box>
                                  </Modal>
                                </div>
                              </React.Fragment>
                            ) : null}
                          </div>
                        </div>
                      </React.Fragment>
                    ) : null}
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
                <img src={PencileLogo} alt="PencileLogo" />
                <br />
                <span>You don't have any Pending Job Invitations.</span>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default Tab1;
