import React, { Fragment } from "react";
import "./message.css";
import { format } from "timeago.js";
import axios from "axios";
import { url } from "config";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Message = ({ message, own, getMessages }) => {
  const handleAcceptProject = (
    jobId,
    freelancerId,
    employerId,
    fixedPrice,
    noOfHours,
    messageId
  ) => {
    axios
      .post(`${url}/api/accept/project`, {
        jobId,
        freelancerId,
        employerId,
        fixedPrice,
        noOfHours,
        messageId,
        seen: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          getMessages();
        } else if (res.data.error) {
          toast.error(res.data.error, {
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

  const handleRejectProject = (jobId, messageId) => {
    axios
      .post(`${url}/api/reject/offer`, {
        jobId,
        messageId,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          getMessages();
        } else if (res.data.error) {
          toast.error(res.data.error, {
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
    <Fragment>
      {message.text ? (
        <div className={own ? "message own" : "message"}>
          <div className="messageTop">
            <p className="messageText">{message.text}</p>
          </div>
          <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
      ) : (
        <div className={own ? "message own" : "message"}>
          {own ? (
            <div className="offer-Box-Own">
              <p>
                Offer&nbsp;
                {message.fixedPrice !== null ? (
                  <span style={{ fontSize: "10px" }}>( Fixed Price )</span>
                ) : (
                  <span style={{ fontSize: "10px" }}>( No. Of Hours )</span>
                )}
              </p>
              <p>
                {message.fixedPrice !== null
                  ? `$ ${message.fixedPrice} `
                  : message.noOfHours}
              </p>
              <div className="row">
                {message.employerAccept === true ? (
                  <div className="col-md-8">
                    <p style={{ fontSize: "12px" }}>
                      <span className="text-success">
                        <CheckCircleIcon />
                      </span>
                      Accepted
                    </p>
                  </div>
                ) : message.employerAccept === false ? (
                  <div className="col-md-8">
                    <p style={{ fontSize: "12px" }}>
                      <span className="text-danger">
                        <CancelIcon />
                      </span>
                      Rejected
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="offer-Box">
              <p>
                Offer&nbsp;
                {message.fixedPrice !== null ? (
                  <span style={{ fontSize: "10px" }}>( Fixed Price )</span>
                ) : (
                  <span style={{ fontSize: "10px" }}>( No. Of Hours )</span>
                )}
              </p>
              <p>
                {message.fixedPrice !== null
                  ? `$ ${message.fixedPrice} `
                  : message.noOfHours}
              </p>
              <div className="row">
                {message.employerAccept === true ? (
                  <div className="col-md-12">
                    <p style={{ fontSize: "12px" }}>
                      <span className="text-success">
                        <CheckCircleIcon />
                      </span>
                      Offer Accepted
                    </p>
                  </div>
                ) : message.employerAccept === false ? (
                  <div className="col-md-12">
                    <p style={{ fontSize: "12px" }}>
                      <span className="text-danger">
                        <CancelIcon />
                      </span>
                      Offer Rejected
                    </p>
                  </div>
                ) : (
                  <Fragment>
                    {!message.jobId ? null : (
                      <Fragment>
                        <div className="col-md-6 pr-1">
                          <button
                            style={{
                              fontSize: "12px",
                            }}
                            className="btn btn-success"
                            onClick={() =>
                              handleAcceptProject(
                                message.jobId,
                                message.freelancerId,
                                message.employerId,
                                message.fixedPrice,
                                message.noOfHours,
                                message._id
                              )
                            }
                          >
                            Accept
                          </button>
                        </div>
                        <div className="col-md-6 mt-1 mt-md-0">
                          <button
                            style={{
                              fontSize: "12px",
                            }}
                            className="btn btn-danger"
                            onClick={() =>
                              handleRejectProject(message.jobId, message._id)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          )}

          <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
      )}
    </Fragment>
  );
};

export default Message;
