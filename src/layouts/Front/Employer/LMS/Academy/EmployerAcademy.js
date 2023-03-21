import React, { Fragment, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FillvaAcademy from "assets/images/fillvaAcademy/fillva_academy.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Box from "@mui/material/Box";
// import { makeStyles } from "@material-ui/core";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { url } from "config";
import EmployerCourseDetails from "./component/EmployerCourseDetails";
import { Card, CardContent } from "@mui/material";
import { useHistory } from "react-router";
import { Line } from "rc-progress";
import videoposter from "assets/images/fillvaAcademy/fillva_academy.png";
import FillvabottomImg from "../../images/fillva2-10.png";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import EmployerNavbar from "../../EmployerNavbar";
import EmployerFooter from "../../EmployerFooter";

// const useStyle = makeStyles({
//     component: {
//         margin: 20,
//         background: "white",
//     },
//     deal: {
//         padding: "15px 20px",
//         display: "flex",
//     },
//     dealText: {
//         fontSize: 22,
//         fontWeight: 600,
//         lineHeight: "32px",
//         marginRight: 25,
//     },
//     timer: {
//         marginLeft: "10px",
//         display: "flex",
//         alignItems: "center",
//     },
//     image: {
//         height: 150,
//         justifyContent: "space-between",
//     },
//     button: {
//         marginLeft: "auto",
//         background: "black",
//         borderRadius: 2,
//         fontSize: "13px",
//     },
//     text: {
//         fontSize: "14px",
//         marginTop: 5,
//     },
//     wrapper: {
//         padding: "35px 15px",
//         // width: "50px 50px",
//     },
// });

const EmployerAcademy = () => {
  let history = useHistory();
  // const classes = useStyle();
  const [value, setValue] = useState(0);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courseCategoriesTabList, setCourseCategoriesTabList] = useState([]);
  const [featureCourses, setFeatureCourses] = useState([]);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;

  const [checkCompletedContent, setCheckCompletedContent] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339AFF",
    marginTop: "20%",
  };

  useEffect(() => {
    loadEmployerDetails();
    // eslint-disable-next-line
  }, []);

  const loadEmployerDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          axios
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((result) => {
              console.log("emoloyer", result.data?.employerDetails._id);
              // console.log("free",result.data?.employerDetails._id);

              setCheckCompletedContent(
                result.data?.employerDetails?.coursesEnrolled
              );
            });
        });
    } else {
      window.location = "/";
    }
  };
  useEffect(() => {
    axios.get(`${url}/api/list-courses`).then((res) => {
      //   console.log("lms", res.data.listCoursesCategories);
      setCourseCategoriesTabList(res.data.listCoursesCategories);
      setLoading(false);
    });
    axios.get(`${url}/api/list/courses`).then((res) => {
      // console.log("academy-list", res.data.listCoursesDetails);
      setCourseCategories(res.data.listCoursesDetails);
      setLoading(false);
    });
    axios.get(`${url}/api/feature/course`).then((res) => {
      setFeatureCourses(res.data.featureCourses);
    });
  }, []);

  const handleSeefullCourse = (slug) => {
    axios.get(`${url}/api/read/course/${slug}`).then((res) => {
      history.push(`/employer/course/${slug}`);
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
            <EmployerNavbar style={{ position: "absolute" }} />
          </div>
          <div className="row mx-0" style={{ backgroundColor: "white" }}>
            <img className="img-fluid" src={FillvaAcademy} alt="fillva" />
          </div>
          <div style={{ marginTop: "40px" }} className="col-12">
            <div className="container white-box">
              <div className="mb-5">
                <h4>Huge amount of online courses.</h4>
                <p style={{ color: "grey" }}>
                  Choose from thousands online video courses; new courses are
                  added to Fillva every month.
                </p>
              </div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      {courseCategoriesTabList &&
                      courseCategoriesTabList.length > 0
                        ? courseCategoriesTabList.map((c, i) => {
                            return (
                              <Tab
                                key={`key${i}`}
                                label={c.categoryName}
                                value={i}
                              />
                            );
                          })
                        : null}
                    </TabList>
                  </Box>
                  {courseCategoriesTabList && courseCategoriesTabList.length > 0
                    ? courseCategoriesTabList.map((c, i) => {
                        return (
                          <TabPanel key={`key${i}`} value={i}>
                            <EmployerCourseDetails
                              categoryName={c?.categoryName}
                              tagline={c?.categoryTagline}
                              description={c?.description}
                              badge={c?.categoryBadge}
                            />
                            <div className="row">
                              {courseCategories && courseCategories.length > 0
                                ? courseCategories.map((g, index) => {
                                    return (
                                      <React.Fragment key={`key${index}`}>
                                        {c?.categoryName ===
                                        g?.courseCategory?.categoryName ? (
                                          <Card className="academy-course-card m-md-1">
                                            <CardContent>
                                              <img
                                                alt="course"
                                                className="img-fluid"
                                                minHeight="100px"
                                                src={
                                                  g?.courseImageUrl
                                                    ? `${url}/${g?.courseImageUrl}`
                                                    : videoposter
                                                }
                                              />
                                              <p>
                                                {" "}
                                                {g?.courseTitle.length > 30
                                                  ? g?.courseTitle.slice(
                                                      0,
                                                      29
                                                    ) + "..."
                                                  : g?.courseTitle}{" "}
                                              </p>
                                            </CardContent>
                                            <CardContent className="card-progress-bar">
                                              <div>
                                                <button
                                                  className="btn btn-blue w-100"
                                                  onClick={() =>
                                                    handleSeefullCourse(g.slug)
                                                  }
                                                >
                                                  See more...
                                                </button>
                                              </div>
                                              {checkCompletedContent?.find(
                                                (element) =>
                                                  element?.courseId === g._id
                                              ) ? (
                                                (checkCompletedContent?.find(
                                                  (element) =>
                                                    element?.courseId === g._id
                                                )?.courseContent?.length *
                                                  100) /
                                                  g?.courseContent?.length !==
                                                100 ? (
                                                  <Line
                                                    percent={
                                                      checkCompletedContent?.find(
                                                        (element) =>
                                                          element?.courseId ===
                                                          g._id
                                                      )
                                                        ? (checkCompletedContent?.find(
                                                            (element) =>
                                                              element?.courseId ===
                                                              g._id
                                                          )?.courseContent
                                                            ?.length *
                                                            100) /
                                                          g?.courseContent
                                                            ?.length
                                                        : 0
                                                    }
                                                    strokeWidth="4"
                                                    strokeColor="#339AFF"
                                                  />
                                                ) : (
                                                  <Line
                                                    percent={100}
                                                    strokeWidth="4"
                                                    strokeColor="#339AFF"
                                                  />
                                                )
                                              ) : (
                                                <Line
                                                  percent={
                                                    checkCompletedContent?.find(
                                                      (element) =>
                                                        element?.courseId ===
                                                        g._id
                                                    )
                                                      ? (checkCompletedContent?.find(
                                                          (element) =>
                                                            element?.courseId ===
                                                            g._id
                                                        )?.courseContent
                                                          ?.length *
                                                          100) /
                                                        g?.courseContent?.length
                                                      : 0
                                                  }
                                                  strokeWidth="4"
                                                  strokeColor="#339AFF"
                                                />
                                              )}

                                              <div className="text-center">
                                                <span className="academy-progress-text">
                                                  {checkCompletedContent?.find(
                                                    (element) =>
                                                      element?.courseId ===
                                                      g._id
                                                  )
                                                    ? Math.round(
                                                        (checkCompletedContent?.find(
                                                          (element) =>
                                                            element?.courseId ===
                                                            g._id
                                                        )?.courseContent
                                                          ?.length *
                                                          100) /
                                                          g?.courseContent
                                                            ?.length !==
                                                          100
                                                          ? Math.round(
                                                              (checkCompletedContent?.find(
                                                                (element) =>
                                                                  element?.courseId ===
                                                                  g._id
                                                              )?.courseContent
                                                                ?.length *
                                                                100) /
                                                                g?.courseContent
                                                                  ?.length
                                                            )
                                                          : 100
                                                      )
                                                    : 0}{" "}
                                                  % Completed{" "}
                                                </span>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ) : null}
                                      </React.Fragment>
                                    );
                                  })
                                : null}
                              {/* </Grid>
                                </Grid> */}
                            </div>
                          </TabPanel>
                        );
                      })
                    : null}
                </TabContext>
              </Box>
            </div>
          </div>
          <div className="container white-box mt-4">
            <div>
              <h4>Featured Courses Text Here(Slider)</h4>
              <div>
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={2}
                  nav
                  dots={false}
                  autoplay={true}
                  autoplayTimeout={4000}
                  responsive={{
                    0: {
                      items: 1,
                    },
                    700: {
                      items: 2,
                    },
                    1000: {
                      items: 3,
                    },
                  }}
                >
                  {featureCourses && featureCourses.length > 0
                    ? featureCourses?.map((g, index) => {
                        return (
                          <Card
                            key={`key${index}`}
                            className="academy-course-card"
                          >
                            <CardContent>
                              <img
                                className="img-fluid"
                                alt="course"
                                src={
                                  g?.courseImageUrl
                                    ? `${url}/${g?.courseImageUrl}`
                                    : videoposter
                                }
                              />
                              <p>
                                {" "}
                                {g?.courseTitle.length > 30
                                  ? g?.courseTitle.slice(0, 29) + "..."
                                  : g?.courseTitle}{" "}
                              </p>
                            </CardContent>
                            <CardContent className="card-progress-bar">
                              <div>
                                <button
                                  className="btn btn-blue w-100"
                                  onClick={() => handleSeefullCourse(g.slug)}
                                >
                                  See more...
                                </button>
                              </div>
                              {checkCompletedContent?.find(
                                (element) => element?.courseId === g._id
                              ) ? (
                                (checkCompletedContent?.find(
                                  (element) => element?.courseId === g._id
                                )?.courseContent?.length *
                                  100) /
                                  g?.courseContent?.length !==
                                100 ? (
                                  <Line
                                    percent={
                                      checkCompletedContent?.find(
                                        (element) => element?.courseId === g._id
                                      )
                                        ? (checkCompletedContent?.find(
                                            (element) =>
                                              element?.courseId === g._id
                                          )?.courseContent?.length *
                                            100) /
                                          g?.courseContent?.length
                                        : 0
                                    }
                                    strokeWidth="4"
                                    strokeColor="#339AFF"
                                  />
                                ) : (
                                  <Line
                                    percent={100}
                                    strokeWidth="4"
                                    strokeColor="#339AFF"
                                  />
                                )
                              ) : (
                                <Line
                                  percent={
                                    checkCompletedContent?.find(
                                      (element) => element?.courseId === g._id
                                    )
                                      ? (checkCompletedContent?.find(
                                          (element) =>
                                            element?.courseId === g._id
                                        )?.courseContent?.length *
                                          100) /
                                        g?.courseContent?.length
                                      : 0
                                  }
                                  strokeWidth="4"
                                  strokeColor="#339AFF"
                                />
                              )}

                              <div className="text-center">
                                <span className="academy-progress-text">
                                  {checkCompletedContent?.find(
                                    (element) => element?.courseId === g._id
                                  )
                                    ? Math.round(
                                        (checkCompletedContent?.find(
                                          (element) =>
                                            element?.courseId === g._id
                                        )?.courseContent?.length *
                                          100) /
                                          g?.courseContent?.length !==
                                          100
                                          ? Math.round(
                                              (checkCompletedContent?.find(
                                                (element) =>
                                                  element?.courseId === g._id
                                              )?.courseContent?.length *
                                                100) /
                                                g?.courseContent?.length
                                            )
                                          : 100
                                      )
                                    : 0}{" "}
                                  % Completed{" "}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    : ""}
                </OwlCarousel>
              </div>
            </div>
          </div>
          <div className="container white-box mt-4 mb-4">
            <Card>
              <CardActionArea>
                <CardMedia
                  className="zoom"
                  component="img"
                  // height="140"
                  image={FillvabottomImg}
                  alt="green iguana"
                />
                <CardContent className="text-center">
                  <Typography gutterBottom variant="h5" component="div">
                    Get certified right now!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Increase your chances of getting hired for more than 50%!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Certified applicants get 60% more jobs in average, don't
                    miss your chance!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div>
            <EmployerFooter />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default EmployerAcademy;
