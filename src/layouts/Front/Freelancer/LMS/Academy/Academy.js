import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
import FillvaAcademy from "assets/images/fillvaAcademy/fillva_academy.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { url } from "config";
import CourseDetails from "./Components/CourseDetails";
import FreelancerFooter from "../../FreelancerFooter/FreelancerFooter";
import { Card, CardContent } from "@mui/material";
import { useHistory } from "react-router";
import { Line } from "rc-progress";
import videoposter from "assets/images/fillvaAcademy/fillva_academy.png";
import FillvabottomImg from "../../image/fillva2-10.png";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Academy = () => {
  let history = useHistory();
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
    loadFreelancerDetails();
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
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((result) => {
              // console.log("free",result.data?.freelancerDetails._id);

              setCheckCompletedContent(
                result.data?.freelancerDetails?.coursesEnrolled
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
      // console.log(res.data);
      history.push(`/course/${slug}`);
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
            <FreelancerNavbar style={{ position: "absolute" }} />
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
                                label={c.categoryName}
                                value={i}
                                key={`key${i}`}
                              />
                            );
                          })
                        : null}
                    </TabList>
                  </Box>
                  {courseCategoriesTabList && courseCategoriesTabList.length > 0
                    ? courseCategoriesTabList.map((c, i) => {
                        return (
                          <TabPanel value={i} key={`key${i}`}>
                            <CourseDetails
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
                                                className="img-fluid"
                                                minHeight="100px"
                                                src={
                                                  g?.courseImageUrl
                                                    ? `${url}/${g?.courseImageUrl}`
                                                    : videoposter
                                                }
                                                alt="course"
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
                  items={3}
                  loop
                  center={true}
                  margin={2}
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
                  nav
                  dots={false}
                  autoplay={true}
                  autoplayTimeout={4000}
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
                                src={
                                  g?.courseImageUrl
                                    ? `${url}/${g?.courseImageUrl}`
                                    : videoposter
                                }
                                alt="course"
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
            <FreelancerFooter />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Academy;
