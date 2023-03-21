import { Button, Card, InputLabel } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { url } from "config";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SideBar from "../../../SideBarImport";
import AddCategoryDetails from "../../AddCategoryDetails";
import Footer from "examples/Footer";
import Form from "react-bootstrap/Form";

const EditQuiz = () => {
  const { slug } = useParams();
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [id, setId] = useState("");
  const [assidnCourses, setAssignCourses] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizPerentCourse, setQuizPerentCourse] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [quizContent, setQuizContent] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      rightAnswer: "",
    },
  ]);
  const [courseDefault, setCourseDefault] = useState("");
  const [singleQuizData, setSingleQuizData] = useState({});

  const handlequizContentChange = (e, index) => {
    const { name, value } = e.target;

    for (let i = quizContent.length; i <= quizContent.length; i++) {
      const data = [...quizContent];

      if (name === "question") {
        data[index][name] = value;
        setQuizContent(data);
      } else if (name === "rightAnswer") {
        data[index][name] = value;
        setQuizContent(data);
      } else if (name === "option1") {
        data[index][name] = value;
        setQuizContent(data);
      } else if (name === "option2") {
        data[index][name] = value;
        setQuizContent(data);
      } else if (name === "option3") {
        data[index][name] = value;
        setQuizContent(data);
      } else if (name === "option4") {
        data[index][name] = value;
        setQuizContent(data);
      }
    }
  };

  const handleContentAddClick = () => {
    setQuizContent([
      ...quizContent,
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        rightAnswer: "",
      },
    ]);
  };
  const handleContentRemoveClick = (index) => {
    const data = [...quizContent];
    data.splice(index, 1);
    setQuizContent(data);
  };

  useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        // console.log("auth", res.data);
        setId(res.data.id);
      });
    axios.get(`${url}/api/list/courses`).then((res) => {
      // console.log(res.data.listCoursesDetails);
      setAssignCourses(res.data.listCoursesDetails);
    });

    editQuizdata();

    /* eslint-disable-next-line */
  }, []);

  const editQuizdata = () => {
    axios.get(`${url}/api/read/quiz/details/${slug}`).then((resp) => {
      // console.log(resp.data.quizDetails);
      setSingleQuizData(resp.data.quizDetails);
      setQuizContent(resp.data.quizDetails.quizContent);
      setCourseDefault(resp.data.quizDetails.courseId.courseTitle);
    });
  };

  const handleEditQuiz = (quizId) => {
    axios
      .put(`${url}/api/edit/quiz/${quizId}`, {
        authorId: id,
        quizName: quizTitle ? quizTitle : singleQuizData?.quizName,
        courseId: quizPerentCourse
          ? quizPerentCourse
          : singleQuizData?.courseId?._id,
        quizContent: quizContent,
      })
      .then((result) => {
        // console.log("res", result.data);
        if (result.data.success) {
          toast.success(result.data.success, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // history.push("/view-add/courses");
          editQuizdata();
        } else {
          toast.error(result.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          editQuizdata();
        }
      });
  };

  return (
    <React.Fragment>
      <SideBar />
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiTypography>
            <AddCategoryDetails />
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <SuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={5}
            >
              <SuiTypography pt={2} variant="h4">
                <form>
                  <h6>Edit Quiz</h6>
                  <div>
                    <InputLabel>Quiz Title</InputLabel>
                    <input
                      className="form-control"
                      size="small"
                      defaultValue={singleQuizData?.quizName}
                      placeholder="Enter Quiz Name"
                      onChange={(e) => setQuizTitle(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mt-2">
                      <InputLabel>Select Assign Quiz Course </InputLabel>
                      <Form.Select
                        id="course-name"
                        aria-label="Default select example"
                        name="course-name"
                        defaultValue={courseDefault}
                        className="form-control"
                        placeholder="Select Course"
                        onChange={(e) => setQuizPerentCourse(e.target.value)}
                      >
                        <option selected disabled>
                          Select Course
                        </option>
                        {assidnCourses && assidnCourses.length > 0
                          ? assidnCourses.map((c, id) => {
                              return (
                                <option value={c._id} key={c._id}>
                                  {c.courseTitle}
                                </option>
                              );
                            })
                          : null}
                      </Form.Select>
                    </div>
                    <div className="col-md-12 mt-4">
                      <InputLabel>Quiz Questions</InputLabel>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        {quizContent.map((x, i) => {
                          return (
                            <React.Fragment>
                              <div
                                className={
                                  i === 0 ? `col-lg-12 pt-3` : "col-lg-12 mb-2"
                                }
                              >
                                <div className="question-heading">
                                  <InputLabel className="questions-headnig-title mb-0">
                                    Question &nbsp;
                                    {i === 0 ? i + 1 : i + 1}
                                  </InputLabel>
                                  <div className="text-right remove-content">
                                    <p
                                      className="remove-content mb-0"
                                      onClick={() =>
                                        handleContentRemoveClick(i)
                                      }
                                    >
                                      Remove
                                    </p>
                                  </div>
                                </div>
                                <textarea
                                  size="small"
                                  type="text"
                                  placeholder="Enter Question"
                                  defaultValue={x.question}
                                  onChange={(e) => {
                                    handlequizContentChange(e, i);
                                  }}
                                  name="question"
                                  className="form-control"
                                />
                              </div>
                              <div
                                className={
                                  i === 0
                                    ? `col-lg-6 pt-3  form-group`
                                    : "col-lg-6 form-group"
                                }
                              >
                                <InputLabel className="mb-2">
                                  Option 1
                                </InputLabel>
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Your Answer"
                                    defaultValue={x.option1}
                                    onChange={(e) => {
                                      handlequizContentChange(e, i);
                                      setOption1(e.target.value);
                                    }}
                                    name="option1"
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  i === 0
                                    ? `col-lg-6 pt-3  form-group`
                                    : "col-lg-6 form-group"
                                }
                              >
                                <InputLabel className="mb-2">
                                  Option 2
                                </InputLabel>
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Your Answer"
                                    defaultValue={x.option2}
                                    onChange={(e) => {
                                      handlequizContentChange(e, i);
                                      setOption2(e.target.value);
                                    }}
                                    name="option2"
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  i === 0
                                    ? `col-lg-6 pt-3  form-group`
                                    : "col-lg-6 form-group"
                                }
                              >
                                <InputLabel className="mb-2">
                                  Option 3
                                </InputLabel>
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Your Answer"
                                    defaultValue={x.option3}
                                    onChange={(e) => {
                                      handlequizContentChange(e, i);
                                      setOption3(e.target.value);
                                    }}
                                    name="option3"
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  i === 0
                                    ? `col-lg-6 pt-3  form-group`
                                    : "col-lg-6 form-group"
                                }
                              >
                                <InputLabel className="mb-2">
                                  Option 4
                                </InputLabel>
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter Your Answer"
                                    defaultValue={x.option4}
                                    onChange={(e) => {
                                      handlequizContentChange(e, i);
                                      setOption4(e.target.value);
                                    }}
                                    name="option4"
                                  />
                                </div>
                              </div>
                              <div className="mb-4">
                                <InputLabel className="mb-2">
                                  Correct Answer
                                </InputLabel>
                                <Form.Select
                                  className="form-control"
                                  value={x.rightAnswer}
                                  placeholder="Select your Answer"
                                  onChange={(e) => {
                                    handlequizContentChange(e, i);
                                  }}
                                  name="rightAnswer"
                                >
                                  <option
                                    value={
                                      x.option1
                                        ? x.option1
                                        : "" || option1
                                        ? option1
                                        : ""
                                    }
                                  >
                                    {x.option1
                                      ? x.option1
                                      : "" || option1
                                      ? option1
                                      : ""}
                                  </option>
                                  <option
                                    value={
                                      option2
                                        ? option2
                                        : "" || x.option2
                                        ? x.option2
                                        : ""
                                    }
                                  >
                                    {option2
                                      ? option2
                                      : "" || x.option2
                                      ? x.option2
                                      : ""}
                                  </option>
                                  <option
                                    value={
                                      option3
                                        ? option3
                                        : "" || x.option3
                                        ? x.option3
                                        : ""
                                    }
                                  >
                                    {option3
                                      ? option3
                                      : "" || x.option3
                                      ? x.option3
                                      : ""}
                                  </option>
                                  <option
                                    value={
                                      option4
                                        ? option4
                                        : "" || x.option4
                                        ? x.option4
                                        : ""
                                    }
                                  >
                                    {option4
                                      ? option4
                                      : "" || x.option4
                                      ? x.option4
                                      : ""}
                                  </option>
                                </Form.Select>
                              </div>
                            </React.Fragment>
                          );
                        })}
                        <Button
                          style={{
                            textTransform: "none",
                          }}
                          className="btn btn-add-quetion text-align-left"
                          onClick={handleContentAddClick}
                        >
                          + Add Quiz Questions
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <br />
                      <div>
                        <SuiButton
                          color="primary"
                          onClick={() => handleEditQuiz(singleQuizData?._id)}
                        >
                          Update Quiz
                        </SuiButton>
                      </div>
                    </div>
                  </div>
                </form>
              </SuiTypography>
            </SuiBox>
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    </React.Fragment>
  );
};

export default EditQuiz;
