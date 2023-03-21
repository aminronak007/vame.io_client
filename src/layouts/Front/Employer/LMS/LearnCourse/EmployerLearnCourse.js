import React, { Fragment, useEffect, useState } from "react";
import EmployerNavbar from "../../EmployerNavbar";
import EmployerFooter from "../../EmployerFooter";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { url } from "config";
import { useHistory, useParams } from "react-router";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import videoposter from "assets/images/fillvaAcademy/fillva_academy.png";
import { toast } from "react-toastify";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function EmployerLearnCourse() {
  let history = useHistory();
  const { cslug, slug } = useParams();
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };
  const [loading, setLoading] = useState(true);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email, setEmail] = useState("");
  const [employerLeanrCourseDetails, setEmployerLearnCourseDetails] = useState(
    []
  );
  const [employerLeanrCourseContentID, setEmployerLearnCourseContentID] =
    useState([]);
  const [employerLeanrCourseId, setEmployerLearnCourseId] = useState([]);
  const [checkCompletedContent, setCheckCompletedContent] = useState([]);
  const [employerCourseDetails, setEmployerCourseDetails] = useState([]);

  let nextLesson = employerCourseDetails?.courseContent?.map(
    (i, index, elements) => {
      if (i?.slug === slug) {
        return elements[index + 1]?.slug;
      } else {
        return "";
      }
    }
  );

  let nextLessonSlug = nextLesson?.filter((n) => n).toString();

  let prevLesson = employerCourseDetails?.courseContent?.map(
    (i, index, elements) => {
      if (i?.slug === slug) {
        return elements[index - 1]?.slug;
      } else {
        return "";
      }
    }
  );

  let prevLesson2 = employerCourseDetails?.courseContent?.map(
    (i, index, elements) => {
      if (i?.slug === slug) {
        return elements[index - 1];
      } else {
        return "";
      }
    }
  );

  let lastLessonId = prevLesson2
    ?.filter((n) => n)
    .map((i) => i._id)
    .toString();

  let checkLastLessonComplete = checkCompletedContent?.map((i) =>
    i?.courseContent?.find((e) => e.contentId === lastLessonId)
  );

  let getCompletedData = checkLastLessonComplete?.filter((n) => n);
  // console.log(
  //     "prev1",
  //     checkCompletedContent?.map((i) =>
  //         i?.courseContent?.find((e) => e.contentId === lastLessonId)
  //     ),
  //     checkLastLessonComplete?.filter((n) => n)
  // );

  let previousLessonSlug = prevLesson?.filter((n) => n).toString();

  useEffect(() => {
    loadEmployerDetails();
    loadDetails();
    // eslint-disable-next-line
  }, [employerLeanrCourseContentID]);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/course/${cslug}`).then((res) => {
        setEmployerLearnCourseContentID(
          res.data.readSingleCourseDetails?.courseContent
            ?.map((i) => i)
            ?.find((e) => (e.slug === slug ? e._id : ""))?._id
        );

        setLoading(false);
      });
    } else {
      window.location = "/";
    }
  });

  let currentCourseContentLength = checkCompletedContent?.find(
    (element) => element?.courseId === employerCourseDetails?._id
  );

  const loadDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/course/${cslug}`).then((res) => {
        setEmployerCourseDetails(res.data.readSingleCourseDetails);
        setEmployerLearnCourseDetails(res.data.readSingleCourseDetails);

        setEmployerLearnCourseId(res.data.readSingleCourseDetails._id);

        setLoading(false);
      });
    } else {
      window.location = "/";
    }
  };
  const loadEmployerDetails = () => {
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
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((result) => {
              setCheckCompletedContent(
                result.data?.employerDetails?.coursesEnrolled
              );
            });
        });
    } else {
      window.location = "/";
    }
  };

  const handleMarkComplete = () => {
    axios
      .post(`${url}/api/employer/mark/content/status`, {
        courseContentId: employerLeanrCourseContentID,
        contentStatus: true,
        courseId: employerLeanrCourseId,
        email: email,
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
          loadEmployerDetails();
        } else {
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
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <Fragment>
          <div>
            <EmployerNavbar />
          </div>
          <div className="container white-box" style={{ marginTop: "40px" }}>
            <h3> {employerLeanrCourseDetails?.courseTitle} </h3>

            <div>
              {employerLeanrCourseDetails?.courseContent &&
              employerLeanrCourseDetails?.courseContent.length > 0
                ? employerLeanrCourseDetails?.courseContent.map((i, index) => {
                    return (
                      <React.Fragment key={`key${index}`}>
                        {i.slug === slug ? (
                          <React.Fragment>
                            <div className="course-heading">
                              <span>
                                {employerLeanrCourseDetails?.courseTitle}
                                <ArrowForwardOutlinedIcon /> {i.contentTopic}
                              </span>
                              {currentCourseContentLength?.courseContent
                                .map((i, index) => i?.contentId)
                                .find((element) => element === i?._id) ? (
                                <React.Fragment key={`key${index}`}>
                                  {getCompletedData
                                    ?.map((i) => i.contentStatus)
                                    .toString() === "true" || index === 0 ? (
                                    <span className="progressStatusCompleted">
                                      Completed
                                    </span>
                                  ) : null}
                                </React.Fragment>
                              ) : (
                                <Fragment>
                                  {getCompletedData
                                    ?.map((i) => i.contentStatus)
                                    .toString() === "true" || index === 0 ? (
                                    <span className="progressStatus">
                                      In progress
                                    </span>
                                  ) : null}
                                </Fragment>
                              )}
                            </div>
                            {getCompletedData
                              ?.map((i) => i.contentStatus)
                              .toString() === "true" || index === 0 ? (
                              <div>
                                {i?.url?.length > 0 &&
                                i?.description?.length > 0 ? (
                                  <React.Fragment>
                                    <video
                                      width="100%"
                                      height={
                                        employerLeanrCourseDetails?.courseImageUrl
                                          ? null
                                          : "100%"
                                      }
                                      id="my-player"
                                      className="video-js"
                                      controls
                                      preload="auto"
                                      poster={
                                        employerLeanrCourseDetails?.courseImageUrl
                                          ? `${url}/${employerLeanrCourseDetails?.courseImageUrl}`
                                          : videoposter
                                      }
                                      data-setup="{}"
                                    >
                                      <source
                                        src={`${url}/${i?.url}`}
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                    <div className="learn-course-description mt-3">
                                      {i.description ? i?.description : ""}
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    {i?.url ? (
                                      <video
                                        width="100%"
                                        height={
                                          employerLeanrCourseDetails?.courseImageUrl
                                            ? null
                                            : "100%"
                                        }
                                        id="my-player"
                                        className="video-js"
                                        controls
                                        preload="auto"
                                        poster={
                                          employerLeanrCourseDetails?.courseImageUrl
                                            ? `${url}/${employerLeanrCourseDetails?.courseImageUrl}`
                                            : videoposter
                                        }
                                        data-setup="{}"
                                      >
                                        <source
                                          src={`${url}/${i?.url}`}
                                          type="video/mp4"
                                        ></source>
                                      </video>
                                    ) : (
                                      <div className="learn-course-description">
                                        {i.description ? i?.description : ""}
                                      </div>
                                    )}
                                  </React.Fragment>
                                )}
                              </div>
                            ) : (
                              //   "no"
                              <div className="complete-priveous-lesson-warning">
                                <div className="priveous-lesson-warning">
                                  <p
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    <span className="material-icons warning-material-icons">
                                      error_outline
                                    </span>{" "}
                                    Please go back and complete the previous
                                    lesson.
                                  </p>
                                  <button
                                    className="warning-back-btn"
                                    onClick={() =>
                                      history.push(`/employer/course/${cslug}`)
                                    }
                                  >
                                    {" "}
                                    <ArrowBackRoundedIcon /> Back
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="row align-items-center text-center mt-4">
                              <div className="col-md-4">
                                {index !== 0 ? (
                                  <p
                                    onClick={() =>
                                      history.push(
                                        `/employer/lessons/${cslug}/${previousLessonSlug}`
                                      )
                                    }
                                    className="back-course-link"
                                  >
                                    <span
                                      style={{
                                        fontSize: "large",
                                      }}
                                    >
                                      <ArrowBackRoundedIcon />
                                    </span>
                                    Previous Lesson
                                  </p>
                                ) : null}
                              </div>
                              <div className="col-md-4">
                                <p
                                  className="back-course-link"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    history.push(`/employer/course/${cslug}`)
                                  }
                                >
                                  Back to course
                                </p>
                              </div>

                              <div className="col-md-4">
                                {currentCourseContentLength?.courseContent
                                  .map((i) => i?.contentId)
                                  .find((element) => element === i._id) ? (
                                  <React.Fragment>
                                    {employerCourseDetails?.courseContent
                                      .length -
                                      1 ===
                                    index ? null : (
                                      <p
                                        className="back-course-link"
                                        onClick={() => {
                                          history.push(
                                            `/employer/lessons/${cslug}/${nextLessonSlug}`
                                          );
                                        }}
                                      >
                                        Next Lesson <ArrowForwardIcon />
                                      </p>
                                    )}
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    {getCompletedData
                                      ?.map((i) => i.contentStatus)
                                      .toString() === "true" || index === 0 ? (
                                      <p
                                        className="back-course-link"
                                        onClick={() => handleMarkComplete()}
                                      >
                                        Mark Complete
                                        <span
                                          style={{
                                            fontSize: "large",
                                          }}
                                        >
                                          <AddTaskRoundedIcon />
                                        </span>
                                      </p>
                                    ) : null}
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : null}
                      </React.Fragment>
                    );
                  })
                : null}
            </div>
          </div>
          <div>
            <EmployerFooter />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default EmployerLearnCourse;
