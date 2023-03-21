import React, { useEffect, useState } from "react";
import FreelancerFooter from "../../FreelancerFooter/FreelancerFooter";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
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

function LearnCourse() {
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
  const [leanrCourseDetails, setLearnCourseDetails] = useState([]);
  const [leanrCourseContentID, setLearnCourseContentID] = useState([]);
  const [leanrCourseId, setLearnCourseId] = useState([]);
  const [checkCompletedContent, setCheckCompletedContent] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);

  let nextLesson = courseDetails?.courseContent?.map((i, index, elements) => {
    if (i?.slug === slug) {
      return elements[index + 1]?.slug;
    } else {
      return "";
    }
  });

  let nextLessonSlug = nextLesson?.filter((n) => n).toString();

  let prevLesson = courseDetails?.courseContent?.map((i, index, elements) => {
    if (i?.slug === slug) {
      return elements[index - 1]?.slug;
    } else {
      return "";
    }
  });

  let prevLesson2 = courseDetails?.courseContent?.map((i, index, elements) => {
    if (i?.slug === slug) {
      return elements[index - 1];
    } else {
      return "";
    }
  });

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
    loadFreelancerDetails();
    loadDetails();
    // eslint-disable-next-line
  }, [leanrCourseContentID]);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/course/${cslug}`).then((res) => {
        setLearnCourseContentID(
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
    (element) => element?.courseId === courseDetails?._id
  );

  const loadDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/course/${cslug}`).then((res) => {
        setCourseDetails(res.data.readSingleCourseDetails);
        setLearnCourseDetails(res.data.readSingleCourseDetails);

        setLearnCourseId(res.data.readSingleCourseDetails._id);

        setLoading(false);
      });
    } else {
      window.location = "/";
    }
  };
  const loadFreelancerDetails = () => {
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
            setCheckCompletedContent(
              result.data?.freelancerDetails?.coursesEnrolled
            );
          });
      });
  };

  const handleMarkComplete = () => {
    axios
      .post(`${url}/api/freelancer/mark/content/status`, {
        courseContentId: leanrCourseContentID,
        contentStatus: true,
        courseId: leanrCourseId,
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
          loadFreelancerDetails();
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
          <div className="container white-box" style={{ marginTop: "40px" }}>
            <h3> {leanrCourseDetails?.courseTitle} </h3>

            <div>
              {leanrCourseDetails?.courseContent &&
              leanrCourseDetails?.courseContent.length > 0
                ? leanrCourseDetails?.courseContent.map((i, index) => {
                    return (
                      <React.Fragment key={`key${index}`}>
                        {i.slug === slug ? (
                          <React.Fragment>
                            <div className="course-heading">
                              <span>
                                {leanrCourseDetails?.courseTitle}
                                <ArrowForwardOutlinedIcon /> {i.contentTopic}
                              </span>
                              {currentCourseContentLength?.courseContent
                                .map((i) => i?.contentId)
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
                              ) : getCompletedData
                                  ?.map((i) => i.contentStatus)
                                  .toString() === "true" || index === 0 ? (
                                <span
                                  key={`key${index}`}
                                  className="progressStatus"
                                >
                                  In progress
                                </span>
                              ) : null}
                            </div>
                            {getCompletedData
                              ?.map((i, index) => i.contentStatus)
                              .toString() === "true" || index === 0 ? (
                              <div key={`key${index}`}>
                                {i?.url?.length > 0 &&
                                i?.description?.length > 0 ? (
                                  <React.Fragment>
                                    <video
                                      width="100%"
                                      height={
                                        leanrCourseDetails?.courseImageUrl
                                          ? null
                                          : "100%"
                                      }
                                      id="my-player"
                                      className="video-js"
                                      controls
                                      preload="auto"
                                      poster={
                                        leanrCourseDetails?.courseImageUrl
                                          ? `${url}/${leanrCourseDetails?.courseImageUrl}`
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
                                ) : i.url ? (
                                  <video
                                    width="100%"
                                    height={
                                      leanrCourseDetails?.courseImageUrl
                                        ? null
                                        : "100%"
                                    }
                                    id="my-player"
                                    className="video-js"
                                    controls
                                    preload="auto"
                                    poster={
                                      leanrCourseDetails?.courseImageUrl
                                        ? `${url}/${leanrCourseDetails?.courseImageUrl}`
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
                                )
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
                                      history.push(`/course/${cslug}`)
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
                                        `/lessons/${cslug}/${previousLessonSlug}`
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
                                    history.push(`/course/${cslug}`)
                                  }
                                >
                                  Back to course
                                </p>
                              </div>

                              <div className="col-md-4">
                                {currentCourseContentLength?.courseContent
                                  .map((i, index) => i?.contentId)
                                  .find((element) => element === i._id) ? (
                                  <React.Fragment key={`key${index}`}>
                                    {courseDetails?.courseContent.length - 1 ===
                                    index ? null : (
                                      <p
                                        className="back-course-link"
                                        onClick={() => {
                                          history.push(
                                            `/lessons/${cslug}/${nextLessonSlug}`
                                          );
                                        }}
                                      >
                                        Next Lesson <ArrowForwardIcon />
                                      </p>
                                    )}
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment key={`key${index}`}>
                                    {getCompletedData
                                      ?.map((i, index) => i.contentStatus)
                                      .toString() === "true" || index === 0 ? (
                                      <p
                                        className="back-course-link"
                                        onClick={() => handleMarkComplete()}
                                        key={`key${index}`}
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
            <FreelancerFooter />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default LearnCourse;
