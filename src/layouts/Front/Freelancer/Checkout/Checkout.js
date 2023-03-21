import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import axios from "axios";
import { url } from "config";

const Checkout = () => {
  let { slug } = useParams();
  let history = useHistory();
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    loadCourseDetails();
    // eslint-disable-next-line
  }, []);

  const loadCourseDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/course/${slug}`).then((res) => {
        setCourseDetails(res.data.readSingleCourseDetails);
      });
    } else {
      window.location = "/";
    }
  };

  return (
    <React.Fragment>
      <FreelancerNavbar />
      <div style={{ marginTop: "40px" }} className="col-12">
        <div className="container">
          <div className="white-box mt-4">
            <div className="row mt-4">
              <div className="pb-4">
                <h4>Purchase Details</h4>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-3">
                    <p style={{ fontWeight: "bold" }}>Item: </p>
                  </div>
                  <div className="col-9">
                    <p>{courseDetails.courseTitle}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-3">
                    <p style={{ fontWeight: "bold" }}>Price:</p>
                  </div>
                  <div className="col-9">
                    <p>${courseDetails.price} USD</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <img
                  className="img-fluid"
                  src={`${url}/${courseDetails.courseImageUrl}`}
                  alt="courseImageUrl"
                />
              </div>
              <div>
                <hr />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-3">
                    <p style={{ fontWeight: "bold" }}>Total:</p>
                  </div>
                  <div className="col-9">
                    <p>${courseDetails.price} USD</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <button
                  onClick={() =>
                    history.push(`/freelancer/payment/${courseDetails._id}`)
                  }
                  className="btn btn-accept"
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
