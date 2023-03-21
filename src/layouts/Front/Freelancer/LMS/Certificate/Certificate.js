import React, { useState, useEffect } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import AcademyLogo from "assets/images/fillvaAcademy/fillva_academy_logo.png";
import { url } from "config";
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment";
import DefaultCourseImage from "assets/images/fillvaAcademy/fillva_academy.png";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";

const FreelancerCertificate = () => {
  const { id } = useParams();
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;
  let certificateRef = React.createRef();
  const [courseDetails, setCourseDetails] = useState({});
  const [freelancerDetails, setFreelancerDetails] = useState([]);

  const fileType = {
    PNG: "image/png",
    JPEG: "image/jpeg",
    PDF: "application/pdf",
  };

  const DEFAULT_JPEG = {
    fileName: "certificate.jpg",
    type: fileType.JPEG,
  };

  useEffect(() => {
    loadCurrentUser();
    loadCourseDetails();
    // eslint-disable-next-line
  }, []);

  const loadCurrentUser = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((res) => {
              setFreelancerDetails(res.data.freelancerDetails);
            });
        });
    } else {
      window.location = "/";
    }
  };

  const loadCourseDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/payment/course/${id}`).then((res) => {
        // console.log(res);
        setCourseDetails(res.data.readSingleCourseDetails);
      });
    } else {
      window.location = "/";
    }
  };

  let currentFreelancerCourse =
    freelancerDetails?.coursesEnrolled?.length > 0
      ? freelancerDetails?.coursesEnrolled
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i.courseId === id) {
              return elements[index];
            }
          })
          .filter((n) => n)
      : null;

  return (
    <React.Fragment>
      <FreelancerNavbar />
      <div className="container white-box" style={{ marginTop: "40px" }}>
        <div className="row" ref={certificateRef} style={{ padding: "80px" }}>
          <div className="row">
            <div className="col-md-4">
              <img
                className="img-fluid"
                style={{ height: 70 }}
                src={AcademyLogo}
                alt="AcademyLogo"
              />
            </div>
            <div className="col-md-8 text-right">
              <p style={{ fontSize: "14px" }}>
                Course Id:&nbsp;
                {courseDetails._id}
              </p>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-md-12">
              <h6 style={{ color: "lightgrey" }}>CERTIFICATE OF COMPLETION</h6>
            </div>
            <div className="col-md-6">
              <h1 style={{ textTransform: "capitalize" }}>
                {courseDetails.courseTitle}
              </h1>
            </div>
            <div className="col-md-6 text-right">
              {courseDetails.courseImageUrl ? (
                <img
                  className="img-fluid"
                  src={`${url}/${courseDetails.courseImageUrl}`}
                  alt="courseImageUrl"
                />
              ) : (
                <img
                  style={{ width: 250 }}
                  className="img-fluid"
                  src={DefaultCourseImage}
                  alt="DefaultCourseImage"
                />
              )}
            </div>
          </div>
          <div style={{ marginTop: "200px" }} className="row">
            <div className="col-md-12">
              <h1 style={{ textTransform: "capitalize" }}>
                {freelancerDetails?.displayname}
              </h1>
            </div>
            <div className="col-md-6">
              <p style={{ textTransform: "capitalize" }}>
                <span style={{ fontWeight: "bold" }}>Date:&nbsp;</span>
                {currentFreelancerCourse?.length > 0
                  ? currentFreelancerCourse?.map((i) =>
                      moment(i.quiz.quizCompletedDate).format("DD MMM YYYY")
                    )
                  : null}
              </p>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-5"></div>
          <div className="col-md-2">
            <button
              className="form-control"
              onClick={() =>
                exportComponentAsJPEG(certificateRef, {
                  ...DEFAULT_JPEG,
                })
              }
            >
              Download Certificate
            </button>
          </div>
          <div className="col-md-5"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FreelancerCertificate;
