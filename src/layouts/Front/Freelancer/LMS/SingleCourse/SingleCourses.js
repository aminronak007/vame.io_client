import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
import FreelancerFooter from "../../FreelancerFooter/FreelancerFooter";
import axios from "axios";
import { url } from "config";
import { useHistory, useParams } from "react-router";
import { Box } from "@mui/system";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { GlobalState } from "contextState/GlobalState";
import ReactTooltip from "react-tooltip";
import videoposter from "assets/images/fillvaAcademy/fillva_academy.png";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import moment from "moment";

function SingleCourses() {
  let history = useHistory();
  const { slug } = useParams();
  const { courseDetails, setCourseDetails } = useContext(GlobalState);
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339AFF",
    marginTop: "20%",
  };

  const [loading, setLoading] = useState(true);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email, setEmail] = useState("");
  const [freelancerId, setFreelancerId] = useState("");
  const [data, setData] = useState([]);
  const [checkCompletedContent, setCheckCompletedContent] = useState([]);
  const [courseDetailsId, setCourseDetailsId] = useState([]);
  const [quizDetails, setQuizDetails] = useState([]);
  const [freelancerQuizData, setFreelancerQuizData] = useState([]);
  const [purchaseCourses, setPurchaseCourses] = useState([]);

  const currentQuiz = quizDetails
    // eslint-disable-next-line
    ?.map((i, index, elements) => {
      if (i?.courseId?.slug === slug) {
        return elements[index];
      }
    })
    .filter((n) => n);

  let currentCourseContentLength = checkCompletedContent?.find(
    (element) => element?.courseId === courseDetails?._id
  );
  const progress =
    (currentCourseContentLength?.courseContent?.length * 100) /
    courseDetails?.courseContent?.length;

  useEffect(() => {
    loadFreelancerDetails();
    loadQuizDetails();
    // eslint-disable-next-line
  }, []);

  const loadFreelancerDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setEmail(res.data.email);
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((result) => {
              // console.log(result);
              setCheckCompletedContent(
                result.data?.freelancerDetails?.coursesEnrolled
              );
              setFreelancerId(result.data.freelancerDetails?._id);
              setData(
                result.data.freelancerDetails?.coursesEnrolled?.map(
                  (c) => c?.courseId
                )
              );
              setFreelancerQuizData(
                result.data?.freelancerDetails?.coursesEnrolled?.map(
                  (i) => i?.quiz
                )
              );
              setPurchaseCourses(
                result.data?.freelancerDetails?.purchaseCourses
              );
            });
        });
    } else {
      window.location = "/";
    }
  };

  let currentFreelancerQuiz =
    freelancerQuizData?.length > 0
      ? freelancerQuizData
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i?.quizId === currentQuiz.map((i) => i._id).toString()) {
              return elements[index];
            }
          })
          .filter((n) => n)
      : null;

  const loadQuizDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/quiz/details`).then((res) => {
        // console.log("quiz", res.data.quizDetails);
        setQuizDetails(res.data.quizDetails);
      });
    } else {
      window.location = "/";
    }
  };

  const handleLearnCourse = (slug, cslug) => {
    history.push(`/lessons/${cslug}/${slug}`);
  };

  const handleTakeCourse = (courseId) => {
    axios
      .post(`${url}/api/freelancer/course/enrollment`, {
        freelancerId: freelancerId,
        email: email,
        courseId: courseId,
      })
      .then((res) => {
        loadFreelancerDetails();
      });
  };
  useEffect(() => {
    axios.get(`${url}/api/read/course/${slug}`).then((res) => {
      // console.log(res.data.readSingleCourseDetails);
      setCourseDetails(res.data.readSingleCourseDetails);
      setCourseDetailsId(res.data.readSingleCourseDetails._id);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  let checkPurchaseCourse =
    purchaseCourses?.length > 0
      ? purchaseCourses
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i?.courseId._id === courseDetailsId) {
              return elements[index];
            }
          })
          .filter((n) => n)
      : null;

  let lastQuizSubmitedDate =
    currentFreelancerQuiz?.length > 0
      ? currentFreelancerQuiz?.map((i) => i?.quizCompletedDate).toString()
      : null;

  let check24HoursCompleted = moment().diff(
    moment(lastQuizSubmitedDate),
    "hours"
  );

  const loadFailedQuizAgain = async (slug) => {
    let marks =
      currentFreelancerQuiz?.length > 0
        ? currentFreelancerQuiz
            ?.map((i) => (i?.quizMarks / i?.quizContent.length) * 100 < 35)
            .toString()
        : null;

    if (marks === "true") {
      if (check24HoursCompleted > 24) {
        axios
          .put(`${url}/api/freelancer/quiz/reset`, {
            email: email,
            courseId: currentQuiz?.map((i) => i?.courseId?._id).toString(),
            quizId: currentQuiz?.map((i) => i?._id).toString(),
          })
          .then((res) => {});
      }
    }
    history.push(`/freelancer/quizzes/${slug}`);
  };

  return (
    <React.Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div>
            <FreelancerNavbar />
          </div>
          <div className="container">
            <div className="white-box" style={{ marginTop: "40px" }}>
              <div className="row single-course">
                <div className="col-md-7">
                  <p className="course-Title">{courseDetails?.courseTitle}</p>
                  <p className="text-justify">
                    {courseDetails?.courseDescription}
                  </p>
                </div>
                <div className="col-md-5 d-flex flex-column justify-content-center">
                  <img
                    className="img-fluid"
                    alt="course"
                    src={
                      courseDetails?.courseImageUrl
                        ? `${url}/${courseDetails?.courseImageUrl}`
                        : videoposter
                    }
                  />
                </div>
              </div>
            </div>
            <div className="white-box" style={{ marginTop: "20px" }}>
              {data?.find((e) => e === courseDetails?._id) ? (
                <React.Fragment>
                  {progress === 100 ? (
                    <div className="row">
                      {currentQuiz?.length === 0 ? (
                        <div className="col-md-9 pe-0">
                          <h6 style={{ color: "#339aff" }}>
                            Quiz for this course will be come soon.
                          </h6>
                        </div>
                      ) : (
                        <React.Fragment>
                          {currentFreelancerQuiz?.length > 0 ? (
                            currentFreelancerQuiz?.map((i, index) =>
                              (i?.quizMarks / i?.quizContent.length) * 100 <
                              35 ? (
                                <React.Fragment key={`key${index}`}>
                                  <div className="col-md-9">
                                    <h6
                                      style={{
                                        color: "#339aff",
                                      }}
                                    >
                                      Please Pass the quiz to earn the
                                      certificate and get certified.
                                    </h6>
                                  </div>
                                  <div className="col-md-3 text-right">
                                    <button
                                      onClick={() =>
                                        history.push(
                                          `/freelancer/quizzes/${currentQuiz?.map(
                                            (i) => i?.slug
                                          )}`
                                        )
                                      }
                                      className="btn btn-blue"
                                    >
                                      Go to Quiz
                                    </button>
                                  </div>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <div className="col-md-9">
                                    <h6
                                      style={{
                                        color: "#339aff",
                                      }}
                                    >
                                      Congratulations, you have completed the
                                      course successfully. Please click on Get
                                      Certificate Button to view and download
                                      your Certificate
                                    </h6>
                                  </div>
                                  <div className="col-md-3 text-right">
                                    {currentFreelancerQuiz?.length > 0 ? (
                                      currentFreelancerQuiz.map((i, index) =>
                                        i.quizId ? (
                                          <React.Fragment key={`key${index}`}>
                                            {i.quizStatus === true ? (
                                              <React.Fragment>
                                                <button className="progressStatusCompleted">
                                                  Quiz Completed
                                                </button>
                                                &nbsp;
                                                <button
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                  className="progressStatus"
                                                  onClick={() =>
                                                    history.push(
                                                      `/freelancer/certificate/${courseDetailsId}`
                                                    )
                                                  }
                                                >
                                                  Get Certificate
                                                </button>
                                              </React.Fragment>
                                            ) : (
                                              <button className="progressStatus">
                                                In progress
                                              </button>
                                            )}
                                          </React.Fragment>
                                        ) : (
                                          ""
                                        )
                                      )
                                    ) : (
                                      <button
                                        onClick={() =>
                                          history.push(
                                            `/freelancer/quizzes/${currentQuiz?.map(
                                              (i) => i?.slug
                                            )}`
                                          )
                                        }
                                        className="btn btn-blue"
                                      >
                                        Go to Quiz
                                      </button>
                                    )}
                                  </div>
                                </React.Fragment>
                              )
                            )
                          ) : (
                            <React.Fragment>
                              <div className="col-md-9">
                                <h6
                                  style={{
                                    color: "#339aff",
                                  }}
                                >
                                  Please Pass the quiz to earn the certificate
                                  and get certified.
                                </h6>
                              </div>
                              <div className="col-md-3 text-right">
                                <button
                                  onClick={() =>
                                    history.push(
                                      `/freelancer/quizzes/${currentQuiz?.map(
                                        (i) => i?.slug
                                      )}`
                                    )
                                  }
                                  className="btn btn-blue"
                                >
                                  Go to Quiz
                                </button>
                              </div>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-12 pe-0">
                        <Box
                          sx={{
                            width: "100%",
                            marginTop: "10px",
                          }}
                        >
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>
                        </Box>
                      </div>
                      <div className="col-md-12 mt-3 text-right">
                        <span className="academy-progress-text">
                          {Math.round(progress)}% Completed
                        </span>
                        &ensp;
                        <span
                          style={{
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          {currentCourseContentLength?.courseContent?.length}/
                          {courseDetails?.courseContent?.length}
                          steps
                        </span>
                        &ensp;
                        <button className="progressStatus">In progress</button>
                        {/* <span className="btn-blue"> In progress</span> */}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="row text-center">
                    <div className="col-md-4 mt-3 p-0">
                      <span className="enroll-course-heading">
                        Current Status
                      </span>
                      <br />
                      <button className="not-enrolled">Not Enrolled</button>
                    </div>
                    <div className="col-md-4 mt-3 p-0 border-right border-left">
                      <span className="enroll-course-heading">Price</span>
                      <br />
                      {checkPurchaseCourse?.length > 0 ? (
                        <span
                          style={{
                            fontSize: "20px",
                            color: "#339aff",
                          }}
                          className="course-price"
                        >
                          Please Enroll to start the Course
                        </span>
                      ) : courseDetails?.price === 0 ? (
                        <span
                          style={{
                            fontSize: "20px",
                            color: "#339aff",
                          }}
                          className="course-price"
                        >
                          Free
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "20px",
                            color: "#339aff",
                          }}
                          className="course-price"
                        >
                          ${courseDetails.price}
                          &nbsp;USD
                        </span>
                      )}
                    </div>
                    <div className="col-md-4 mt-3 p-0 border-left">
                      <span className="enroll-course-heading">Get Started</span>
                      <br />
                      {courseDetails.price === 0 ? (
                        <button
                          className="btn btn-blue"
                          onClick={() => handleTakeCourse(courseDetails?._id)}
                        >
                          Take this Course
                        </button>
                      ) : checkPurchaseCourse?.length > 0 ? (
                        <button
                          className="btn btn-blue"
                          onClick={() => handleTakeCourse(courseDetails?._id)}
                        >
                          Take this Course
                        </button>
                      ) : (
                        <button
                          className="btn btn-blue"
                          onClick={() =>
                            history.push(
                              `/freelancer/checkout/${courseDetails.slug}`
                            )
                          }
                        >
                          Buy this Course
                        </button>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="white-box" style={{ marginTop: "20px" }}>
              <div className="row">
                <div className="col-md-8">
                  <h4>Course Content</h4>
                  <div>
                    {courseDetails?.courseContent &&
                    courseDetails?.courseContent?.length > 0
                      ? courseDetails?.courseContent?.map((i, idx) => {
                          return (
                            <React.Fragment key={`key${idx}`}>
                              <div
                                data-tip="You are not eligible to see this Content"
                                className="list-content"
                              >
                                <span
                                  className={
                                    data?.find((e) => e) ===
                                      courseDetails?._id ||
                                    currentCourseContentLength?.courseContent
                                      .map((i) => i?.contentId)
                                      .find((element) => element === i?._id)
                                      ? ""
                                      : currentCourseContentLength?.courseContent.map(
                                          (i) => i?.courseId
                                        )
                                      ? ""
                                      : "disabled-content"
                                  }
                                  onClick={() =>
                                    handleLearnCourse(i?.slug, slug)
                                  }
                                >
                                  <div className="list-content-title">
                                    {currentCourseContentLength?.courseContent
                                      .map((i) => i?.contentId)
                                      .find((element) => element === i?._id) ? (
                                      <CheckCircleRoundedIcon
                                        style={{
                                          color: "#019E7C",
                                        }}
                                      />
                                    ) : (
                                      <CircleOutlinedIcon
                                        style={{
                                          color: "#e2e7ed",
                                        }}
                                      />
                                    )}
                                    &ensp;
                                    <span> {i?.contentTopic} </span>
                                    {data?.find(
                                      (e) => e === courseDetails?._id
                                    ) ? null : (
                                      <ReactTooltip
                                        textColor="black"
                                        type="warning"
                                      />
                                    )}
                                  </div>
                                </span>
                              </div>
                            </React.Fragment>
                          );
                        })
                      : null}

                    {progress === 100
                      ? currentQuiz && currentQuiz.length > 0
                        ? currentQuiz.map((i, index) => (
                            <div
                              data-tip="You are not eligible to see this Content"
                              className="list-content"
                              key={`key${index}`}
                            >
                              <span onClick={() => loadFailedQuizAgain(i.slug)}>
                                <div className="list-content-title">
                                  <span class="quizIcon">
                                    <QuizOutlinedIcon />
                                  </span>
                                  &ensp;
                                  {i?.quizName}
                                </div>
                              </span>
                            </div>
                          ))
                        : null
                      : null}
                  </div>
                </div>
                <div className="col-md-4 mt-3 text-justify">
                  <h4>Fillva Academy</h4>
                  <p>
                    First of all, the courses we offer are for FREE. You cannot
                    see such features in any other job sites platform online.
                    Even if you are a newbie in this virtual world, still you
                    get the chance to be prepared upon employment.
                  </p>
                  <p>
                    All you need to do is to watch and learn on all those
                    courses on our site, get your completion certificate, and
                    apply it to your work with clients.
                  </p>
                  <p>
                    With all those learnings you can land a different job post
                    as a Virtual Assistant. You can either be a Graphic
                    Designer, Dropshipping Expert, Market Researcher, Great
                    Customer Agent, or even an all-around VA. You can be what
                    you want to be by just taking the step of learning new
                    skills absolutely for FREE.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <FreelancerFooter />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default SingleCourses;
