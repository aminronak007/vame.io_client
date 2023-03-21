import React, { useEffect, useState } from "react";
import FreelancerFooter from "../../FreelancerFooter/FreelancerFooter";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";
import axios from "axios";
import { url } from "config";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

function SingleQuiz() {
  const { qslug } = useParams();
  const [quizData, setQuizData] = useState({});
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email, setEmail] = useState("");
  const [freelancerQuizData, setFreelancerQuizData] = useState([]);
  const [answer, setAnswer] = useState("");

  const [firstQuestion, setFirstQuestion] = useState([]);
  const [quesNo, setQuesNo] = useState(1);
  const [showQuestion, setShowQuestion] = useState(true);

  let currentFreelancerQuiz =
    freelancerQuizData?.length > 0
      ? freelancerQuizData
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i?.quizId === quizData._id) {
              return elements[index];
            }
          })
          .filter((n) => n)
      : null;

  let nextQuestion = [
    quizData?.quizContent?.length > 0
      ? quizData?.quizContent[
          currentFreelancerQuiz?.map((i) => i?.quizContent?.length + 1)
        ]
      : null,
  ];

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          // console.log("res", res);
          setEmail(res.data.email);
        });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, [email]);

  useEffect(() => {
    loadQuizDetails();
    loadFreelancerDetails();
    // eslint-disable-next-line
  }, [email]);

  const loadFreelancerDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .post(`${url}/api/freelancer-details`, { email: email })
        .then((res) => {
          setFreelancerQuizData(
            res.data?.freelancerDetails?.coursesEnrolled?.map((i) => i?.quiz)
          );
        });
    } else {
      window.location = "/";
    }
  };
  const loadQuizDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/quiz/details/${qslug}`).then((res) => {
        setQuizData(res.data.quizDetails);
        setFirstQuestion(res.data?.quizDetails?.quizContent?.slice(0, 1));
      });
    } else {
      window.location = "/";
    }
  };

  const handleStartButton = (quizId) => {
    // console.log(quizId);
    setShowQuestion(false);
    axios
      .put(`${url}/api/freelancer/quiz/start`, {
        email: email,
        courseId: quizData?.courseId?._id,
        quizId: quizId,
      })
      .then((res) => {
        if (res.data.success) {
          loadFreelancerDetails();
        }
      });
  };
  const handleNextButton = () => {
    axios
      .put(`${url}/api/freelancer/quiz/apply`, {
        email: email,
        courseId: quizData?.courseId?._id,
        questionId:
          firstQuestion && firstQuestion?.length > 0
            ? firstQuestion?.map((i) => i?._id).toString()
            : null,
        answer: answer,
      })
      .then((res) => {
        if (res.data.error) {
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
        } else {
          setQuesNo(quesNo + 1);
          setFirstQuestion(nextQuestion);
          setAnswer("");
          loadFreelancerDetails();
        }
      });
  };

  let length = parseInt(
    currentFreelancerQuiz?.length > 0
      ? currentFreelancerQuiz?.map((i) => i?.quizContent?.length)
      : 0
  );

  let check = quizData?.quizContent?.length === length;

  const handleSubmit = () => {
    axios
      .put(`${url}/api/freelancer/quiz/submit`, {
        email: email,
        courseId: quizData?.courseId?._id,
        quizId: quizData?._id,
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
          window.location.href = `/freelancer/quizzes/${qslug}`;
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
      <div>
        <FreelancerNavbar />
      </div>
      <div className="container white-box" style={{ marginTop: "40px" }}>
        <h3> Final Exam: {quizData?.quizName} </h3>

        <div>
          <div className="course-heading">
            <span>
              {quizData?.courseId?.courseTitle}

              <span style={{ color: "black" }}>{" > "}</span>
              <span>{quizData?.quizName}</span>
            </span>
          </div>

          <br />
          <div>
            <div className="row">
              {showQuestion === true ? (
                <div className="col-md-12">
                  {currentFreelancerQuiz?.length > 0 ? (
                    currentFreelancerQuiz?.map((i, index) =>
                      i?.quizStatus === true ? (
                        <React.Fragment key={`key${index}`}>
                          {(i.quizMarks / i?.quizContent.length) * 100 < 35 ? (
                            <React.Fragment>
                              <h4
                                style={{
                                  color: "#339aff",
                                }}
                              >
                                Sorry, you didn't passed the Exam. You will be
                                able to try again after 24 Hours.
                              </h4>
                              <h6>
                                Result:
                                <span className="text-danger">&nbsp;FAIL</span>
                              </h6>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <h4
                                style={{
                                  color: "#339aff",
                                }}
                              >
                                Congratulations, you have passed the exam
                                successfully. Please go to course to view and
                                download your Certificate...
                              </h4>
                              <h6>
                                Result:
                                <span className="text-success">&nbsp;PASS</span>
                              </h6>
                            </React.Fragment>
                          )}
                          <span>
                            Scores:&nbsp;
                            {i.quizMarks} out of&nbsp;
                            {i?.quizContent.length} answers are correct.
                          </span>
                        </React.Fragment>
                      ) : (
                        <button
                          className="btn btn-accept"
                          onClick={() => handleStartButton(quizData?._id)}
                        >
                          Start Quiz
                        </button>
                      )
                    )
                  ) : (
                    <button
                      className="btn btn-accept"
                      onClick={() => handleStartButton(quizData?._id)}
                    >
                      Start Quiz
                    </button>
                  )}
                </div>
              ) : check === false ? (
                firstQuestion && firstQuestion?.length > 0 ? (
                  firstQuestion?.map((i, index) => {
                    return (
                      <React.Fragment key={`key${index}`}>
                        {i?.question !== undefined ? (
                          <React.Fragment>
                            <h2>
                              <span>{quesNo}.</span>
                              &nbsp;
                              {i?.question}
                            </h2>
                            <div className="row pl-3">
                              <FormControl component="fieldset">
                                <RadioGroup
                                  aria-label="gender"
                                  name="radio-buttons-group"
                                  onChange={(e) => setAnswer(e.target.value)}
                                >
                                  <FormControlLabel
                                    value={i?.option1}
                                    control={<Radio />}
                                    label={i?.option1}
                                  />
                                  <FormControlLabel
                                    value={i?.option2}
                                    control={<Radio />}
                                    label={i?.option2}
                                  />
                                  <FormControlLabel
                                    value={i?.option3}
                                    control={<Radio />}
                                    label={i?.option3}
                                  />
                                  <FormControlLabel
                                    value={i?.option4}
                                    control={<Radio />}
                                    label={i?.option4}
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </React.Fragment>
                        ) : null}
                      </React.Fragment>
                    );
                  })
                ) : (
                  ""
                )
              ) : (
                <h3>
                  <span style={{ color: "red" }}>
                    Click on submit button to submit the Quiz...
                  </span>
                </h3>
              )}

              <div className="row align-items-center text-center mt-4">
                <div className="col-md-12 text-right">
                  {check === false ? (
                    <button
                      className="btn btn-accept"
                      onClick={handleNextButton}
                    >
                      Next <ArrowForwardIcon />
                    </button>
                  ) : (
                    <button className="btn btn-accept" onClick={handleSubmit}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FreelancerFooter />
      </div>
    </React.Fragment>
  );
}
export default SingleQuiz;
