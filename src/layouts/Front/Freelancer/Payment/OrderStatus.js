import React, { useState, useEffect } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import { useHistory, useLocation, useParams } from "react-router";
import axios from "axios";
import { url } from "config";
import DefaultCourseImg from "assets/images/fillvaAcademy/fillva_academy.png";
import moment from "moment";
import { exportComponentAsJPEG } from "react-component-export-image";

const OrderStatus = () => {
  let { id } = useParams();
  let history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem("pwd");
  const [currentCourse, setCurrentCourse] = useState([]);
  const [freelancer, setFreelancer] = useState([]);
  let certificateRef = React.createRef();

  useEffect(() => {
    loadCurrentUser();
    loadCurrentCourseDetails();
    // eslint-disable-next-line
  }, []);

  let transactionId = new URLSearchParams(location.search).get(
    "PAYPAL_TRANSACTION_ID"
  );
  let accountId = new URLSearchParams(location.search).get("ACCOUNT_ID");
  const loadCurrentUser = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          axios
            .post(`${url}/api/freelancer/paypal/store/details`, {
              courseId: id,
              email: res.data.email,
              transactionId: transactionId,
              accountId: accountId,
            })
            .then(async (result) => {
              if (result.data.success) {
                axios
                  .post(`${url}/api/freelancer-details`, {
                    email: res.data.email,
                  })
                  .then((res) => {
                    setFreelancer(res.data.freelancerDetails);
                    history.push(`/freelancer/order/${id}`);
                  });
              }
            });
          if (res.data) {
            axios
              .post(`${url}/api/freelancer-details`, {
                email: res.data.email,
              })
              .then((res) => {
                setFreelancer(res.data.freelancerDetails);
              });
          }
        });
    } else {
      window.location = "/";
    }
  };

  const loadCurrentCourseDetails = () => {
    axios.get(`${url}/api/payment/course/${id}`).then((res) => {
      setCurrentCourse(res.data.readSingleCourseDetails);
    });
  };

  const purchaseCourse =
    freelancer?.purchaseCourses?.length > 0
      ? freelancer?.purchaseCourses
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i?.courseId._id === currentCourse?._id) {
              return elements[index];
            }
          })
          .filter((n) => n)
      : null;

  return (
    <React.Fragment>
      <FreelancerNavbar />
      <div style={{ marginTop: "40px" }} className="col-12">
        <div className="container white-box mt-4">
          <div className="container" ref={certificateRef}>
            <div className="row">
              <div className="col-md-9">
                <h4>Order Summary</h4>
              </div>

              <div>
                <hr />
              </div>
              <div className="col-md-12">
                <h6>
                  {purchaseCourse?.length > 0
                    ? purchaseCourse?.map((i, index) => {
                        return (
                          <React.Fragment key={`key${index}`}>
                            <span
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              HI,{" "}
                              {i?.transactionDetails?.cardHolderInfo?.firstName}
                            </span>
                            &nbsp;
                            <span
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {i?.transactionDetails?.cardHolderInfo?.lastName}
                            </span>
                          </React.Fragment>
                        );
                      })
                    : null}
                </h6>
                <p>
                  You course has been purchased successfully and also given
                  access to enroll in the course.
                </p>
              </div>
              <div>
                <hr />
              </div>
              <div className="col-md-3">
                <h5>Order Id</h5>
                <div>
                  <p style={{ fontSize: "12px" }}>
                    {purchaseCourse?.length > 0
                      ? purchaseCourse?.map((i, index) => {
                          return (
                            <React.Fragment key={`key${index}`}>
                              {i?.orderId}
                            </React.Fragment>
                          );
                        })
                      : null}
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <h5>Order Date</h5>
                <div>
                  <p style={{ fontSize: "12px" }}>
                    {purchaseCourse?.length > 0
                      ? purchaseCourse?.map((i, index) => {
                          return (
                            <React.Fragment key={`key${index}`}>
                              {moment(i?.orderDate).format("DD-MMM-YYYY")}
                            </React.Fragment>
                          );
                        })
                      : null}
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <h5>Transaction Id</h5>
                <div>
                  <p style={{ fontSize: "12px" }}>
                    {purchaseCourse?.length > 0
                      ? purchaseCourse?.map((i, index) => {
                          return (
                            <React.Fragment key={`key${index}`}>
                              {i?.transactionDetails?.transactionId}
                            </React.Fragment>
                          );
                        })
                      : null}
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <h5>Payment Type</h5>
                <div>
                  <p style={{ fontSize: "12px" }}>
                    {purchaseCourse?.length > 0
                      ? purchaseCourse?.map((i, index) => {
                          return (
                            <React.Fragment key={`key${index}`}>
                              {i?.transactionDetails?.creditCard?.cardType}
                              &nbsp;-&nbsp;
                              {
                                i?.transactionDetails?.creditCard
                                  ?.cardLastFourDigits
                              }
                            </React.Fragment>
                          );
                        })
                      : null}
                  </p>
                </div>
              </div>

              <div>
                <hr />
              </div>
              <div className="col-md-3">
                {purchaseCourse?.length > 0 ? (
                  <img
                    className="img-fluid"
                    style={{ height: 125 }}
                    src={`${url}/${purchaseCourse?.map(
                      (i) => i?.courseId?.courseImageUrl
                    )}`}
                    alt="courseImageUrl"
                  />
                ) : (
                  <img
                    className="img-fluid"
                    style={{ height: 150 }}
                    src={DefaultCourseImg}
                    alt="DefaultCourseImg"
                  />
                )}
              </div>
              <div className="col-md-6">
                <h5>
                  {purchaseCourse?.length > 0
                    ? purchaseCourse?.map((i) => i?.courseId?.courseTitle)
                    : null}
                </h5>
                <p style={{ fontSize: "12px" }}>
                  (<span>courseId:</span>&nbsp;
                  {purchaseCourse?.length > 0
                    ? purchaseCourse?.map((i) => i?.courseId?._id)
                    : null}
                  )
                </p>
              </div>
              <div className="col-md-2 col-6 text-center">
                <h5>Qty</h5>
                <div>
                  <p style={{ fontSize: "12px" }}>
                    {purchaseCourse?.length > 0 ? purchaseCourse?.length : null}
                  </p>
                </div>
              </div>
              <div className="col-md-1 col-6 text-center">
                <h5>&nbsp;</h5>
                <div>
                  <p style={{ fontSize: "12px" }}>
                    {purchaseCourse?.length > 0
                      ? purchaseCourse?.map((i, index) => {
                          return (
                            <React.Fragment key={`key${index}`}>
                              ${i?.courseId?.price}
                            </React.Fragment>
                          );
                        })
                      : null}
                  </p>
                </div>
              </div>

              <div>
                <hr />
              </div>
              <div className="col-md-11 col-6">
                <p>Sub total</p>
                <p>Taxes</p>
                <p>Discount</p>
              </div>
              <div className="col-md-1 col-6 text-center">
                <p style={{ fontSize: "12px" }}>
                  {purchaseCourse?.length > 0
                    ? purchaseCourse?.map((i, index) => {
                        return (
                          <React.Fragment key={`key${index}`}>
                            ${i?.courseId?.price}
                          </React.Fragment>
                        );
                      })
                    : null}
                </p>
                <p style={{ fontSize: "12px" }}>$0.00</p>
                <p style={{ fontSize: "12px" }}>$0.00</p>
              </div>
              <div>
                <hr />
              </div>
              <div className="col-md-11 col-6">
                <h6>Total</h6>
              </div>
              <div className="col-md-1 col-6 text-center">
                <h6 style={{ fontSize: "12px" }}>
                  {purchaseCourse?.length > 0
                    ? purchaseCourse?.map((i, index) => {
                        return (
                          <React.Fragment key={`key${index}`}>
                            ${i?.courseId?.price}
                          </React.Fragment>
                        );
                      })
                    : null}
                </h6>
              </div>
              <div>
                <hr />
              </div>
              <div className="col-md-12">
                <p>
                  Thanks you much for taking part in our course. We appreciate
                  your efforts and hope you enjoy your purchase.
                </p>
                <br />
                <h6>Thank You !</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p> Questions ? Contact our Customer Support.</p>
              </div>
              <div className="col-md-6 text-right">
                <p>© 2022 Vame.io</p>
              </div>
            </div>
            <br />
          </div>
          <div className="row text-center">
            <div className="col-md-12">
              <button
                className="btn btn-primary"
                onClick={() => exportComponentAsJPEG(certificateRef, {})}
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderStatus;
