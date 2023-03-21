import { Button, Card, InputLabel } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { url } from "config";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Quiz = ({ loadQuizdata }) => {
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [id, setId] = useState("");
  const [assidnCourses, setAssignCourses] = useState([]);
  const [quizCourseCategories, setQuizCourseCategories] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizPerentCourseCategory, setQuizPerentCourseCategory] = useState("");
  const [quizPerentCourse, setQuizPerentCourse] = useState("");

  /* eslint-disable-next-line */
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  /* eslint-disable-next-line */
  const [correctOption, setCorrectOption] = useState("");
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

  const handlequizContentChange = (e, index) => {
    const { name, value } = e.target;

    for (let i = quizContent.length; i <= quizContent.length; i++) {
      // quizContent.map((i, index) => {
      // if (quizContent.length === index + 1) {
      //   if (name === "question") {
      //     i.question = value;
      //   }
      //   if (name === "rightAnswer") {
      //     i.rightAnswer = value;
      //   }
      //   if (name === "option1") {
      //     i.options.option1 = value;
      //   }
      //   if (name === "option2") {
      //     i.options.option2 = value;
      //   }
      //   if (name === "option3") {
      //     i.options.option3 = value;
      //   }
      //   if (name === "option4") {
      //     i.options.option4 = value;
      //   }
      //   i++;
      // }

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
      // });
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

  // console.log("hello", quizContent);

  useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        // console.log("auth", res.data.id);
        setId(res.data.id);
      });
    axios.get(`${url}/api/list/courses`).then((res) => {
      // console.log(res.data.listCoursesDetails);
      setAssignCourses(res.data.listCoursesDetails);
    });

    axios.get(`${url}/api/list-courses`).then((resp) => {
      // console.log("c-cate", resp.data.listCoursesCategories);
      setQuizCourseCategories(resp.data.listCoursesCategories);
    });

    /* eslint-disable-next-line */
  }, [id]);

  const handleAddNewQuiz = () => {
    axios
      .post(`${url}/api/add/quiz`, {
        courseId: quizPerentCourse,
        quizName: quizTitle,
        quizContent: quizContent,
        authorId: id,
      })
      .then((result) => {
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
          loadQuizdata();
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
          loadQuizdata();
        }
      });
  };

  const fcourse = assidnCourses
    ?.map((i, index, elements) => {
      if (i?.courseCategory?._id === quizPerentCourseCategory) {
        return elements[index];
      } else {
        return "";
      }
    })
    .filter((n) => n);
  return (
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
              <h6>Add New Quiz</h6>
              <div>
                <InputLabel>Quiz Title</InputLabel>
                <input
                  size="small"
                  placeholder="Enter Quiz Name"
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="row">
                <div className="col-md-6 mt-2">
                  <InputLabel>Select Assign Quiz Course Categories </InputLabel>
                  <select
                    aria-label="Default select example .form-select-sm example"
                    onChange={(e) =>
                      setQuizPerentCourseCategory(e.target.value)
                    }
                    className=" form-control form-select form-select-sm"
                  >
                    <option selected disabled>
                      Select Course Categories of Quiz
                    </option>
                    {quizCourseCategories && quizCourseCategories.length > 0
                      ? quizCourseCategories.map((c) => {
                          return (
                            <option value={c._id} key={c._id}>
                              {c.categoryName}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div className="col-md-6 mt-2">
                  <InputLabel>Select Assign Quiz Course </InputLabel>
                  <select
                    onChange={(e) => setQuizPerentCourse(e.target.value)}
                    className=" form-control form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected disabled>
                      Select Course of Quiz
                    </option>
                    {fcourse && fcourse.length > 0
                      ? fcourse.map((c) => {
                          return (
                            <option value={c._id} key={c._id}>
                              {c.courseTitle}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div className="col-md-6 mt-4">
                  <InputLabel>Quiz Questions</InputLabel>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    {quizContent.map((x, i) => {
                      return (
                        <React.Fragment key={`key${i}`}>
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
                                  onClick={() => handleContentRemoveClick(i)}
                                >
                                  Remove
                                </p>
                              </div>
                            </div>

                            <textarea
                              size="small"
                              type="text"
                              placeholder="Enter Question"
                              onChange={(e) => {
                                handlequizContentChange(e, i);
                                setQuestion(e.target.value);
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
                            <InputLabel className="mb-2">Option 1</InputLabel>
                            <div className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Your Answer"
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
                            <InputLabel className="mb-2">Option 2</InputLabel>
                            <div className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Your Answer"
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
                            <InputLabel className="mb-2">Option 3</InputLabel>
                            <div className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Your Answer"
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
                            <InputLabel className="mb-2">Option 4</InputLabel>
                            <div className="form-group">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Your Answer"
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

                            {/* <Form.Control
                              as="select"
                              name="state"
                              defaultValue="shmfbvdhmfgjhdg"
                              onChange={(e) => {
                                handlequizContentChange(e, i);
                                setCorrectOption(e, i);
                              }}
                            >
                              <option value="AL">Alabama</option>
                              <option value="AK">Alaska</option>
                              <option value="AZ">Arizona</option>
                              <option value="AR">Arkansas</option>
                              <option value="CA">California</option>
                              <option value="CO">Colorado</option>
                            </Form.Control> */}

                            <select
                              className=" form-control form-select form-select-sm"
                              aria-label=".form-select-sm example"
                              placeholder="Select Your Answer"
                              onChange={(e) => {
                                handlequizContentChange(e, i);
                                setCorrectOption(e, i);
                              }}
                              name="rightAnswer"
                            >
                              <option selected disabled>
                                Select Correct Option
                              </option>
                              <option value={option1}> {option1} </option>
                              <option value={option2}> {option2} </option>
                              <option value={option3}> {option3} </option>
                              <option value={option4}> {option4} </option>
                            </select>
                          </div>
                        </React.Fragment>
                      );
                    })}
                    <Button
                      style={{ textTransform: "none" }}
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
                    <SuiButton color="primary" onClick={handleAddNewQuiz}>
                      PUBLISH
                    </SuiButton>
                  </div>
                </div>
              </div>
            </form>
          </SuiTypography>
        </SuiBox>
      </Card>
    </SuiBox>
  );
};

export default Quiz;
