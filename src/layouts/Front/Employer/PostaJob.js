import React, { Fragment, useEffect, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import EmployerSidebar from "./EmployerSidebar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { url } from "config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router";

function PostaJob() {
  const [categoryData, setCategoryData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [jobtitle, setJobTitle] = useState("");
  const [jobdescription, setJobDescription] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [yearExperience, setYearExperience] = useState("");
  const [price, setPrice] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [dailyHour, setDailyHour] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [fileUploader, setFileUploder] = useState("");
  const [postDate, setPostDate] = useState("");
  const [faqList, setFaqList] = useState([
    {
      question: "",
    },
  ]);
  const [skillsList, setSkillsList] = useState([]);
  const [userId, setUserId] = useState("");
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email, setEmail] = useState({
    email: "",
  });
  let [loading, setLoading] = useState(true);
  const history = useHistory();

  // console.log("skills", skillsList);

  const handleAddClick = () => {
    setFaqList([
      ...faqList,
      {
        question: "",
      },
    ]);
  };

  const handleSkillsClick = () => {
    setSkillsList([
      ...skillsList,
      {
        skills: "",
      },
    ]);
  };

  const handleSkillsRemoveClick = (index) => {
    const list = [...skillsList];
    list.splice(index, 1);
    setSkillsList(list);
  };

  const handleSkillsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skillsList];
    list[index][name] = value;
    setSkillsList(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...faqList];
    list.splice(index, 1);
    setFaqList(list);
  };

  const handleFaqChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...faqList];
    list[index][name] = value;
    setFaqList(list);
  };

  const handlePostDate = (e) => {
    setPostDate(e.target.value);
    // console.log("dare", e.target.value)
  };

  useEffect(() => {
    axios
      .get(`${url}/api/categories`)
      .then((res) => {
        setCategoryData(res.data.categoryData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${url}/api/skill`)
      .then((res) => {
        setSkillData(res.data.skillsData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          // console.log(res);
          setUserId(res.data.id);
          setEmail({ email: res.data.email });
          setLoading(false);
        });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    const email1 = email.email;
    const data = new FormData();
    data.append("jobtitle", jobtitle);
    data.append("jobdescription", jobdescription);
    data.append("englishlevel", englishLevel);
    data.append("yearofexperience", yearExperience);
    data.append("price", price);
    data.append("hourrate", hourlyRate);
    data.append("dailyrate", dailyHour);
    data.append("selectCategory", selectCategory);
    data.append("date", postDate);
    data.append("skills", JSON.stringify(skillsList));
    data.append("file", fileUploader);
    data.append("email", email1);
    data.append("faqlist", JSON.stringify(faqList));
    data.append("current_userID", userId);

    axios.post(`${url}/api/job-post`, data).then((res) => {
      setLoading(true);
      if (res.data.success) {
        // console.log(res.data.success);
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
        setLoading(false);
        history.push("/employer-dashboard");
      } else if (res.data.error) {
        // console.log(res.data.error);
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
        setLoading(false);
      }
      console.log(res.data);
    });
  };

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
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
          <div className="padding-left">
            <EmployerNavbar style={{ position: "absolute" }} />
          </div>
          <div className="row mx-0">
            <div className="col-1">
              <EmployerSidebar />
            </div>
            <div className="col-12 right-content mt-20">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <Card sx={{ margin: "40px 0" }}>
                    <CardContent className="p-30">
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "black",
                        }}
                      >
                        <div>
                          <h2 className="page-title">Post a Job</h2>
                          <hr />
                          <div>
                            <div>
                              <span className="postjob-fontsize">
                                Job Description
                              </span>
                              <p>
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  placeholder="Job Description"
                                  onChange={(e) => setJobTitle(e.target.value)}
                                />
                              </p>
                              <div className="row">
                                <div className="col-md form-group">
                                  <span className="postjob-fontsize">
                                    Language
                                  </span>
                                  <select
                                    className=" form-control form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                    placeholder="Select english level"
                                    onChange={(e) =>
                                      setEnglishLevel(e.target.value)
                                    }
                                  >
                                    <option selected disabled>
                                      Select English Level
                                    </option>
                                    <option value="Conversational">
                                      Conversational
                                    </option>
                                    <option value="Fulent">Fluent</option>
                                    <option value="Native or Bilingual">
                                      Native or Bilingual
                                    </option>
                                    <option value="Profee">Professional</option>
                                  </select>
                                </div>
                                <div className="col-md">
                                  <span className="postjob-fontsize">
                                    Years of Experience
                                  </span>
                                  <input
                                    type="number"
                                    className=" form-control"
                                    placeholder="Year of Experience Preferred"
                                    onChange={(e) =>
                                      setYearExperience(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div>
                              <span className="postjob-fontsize">Type</span>
                              <div className="row">
                                <div className="col-md-4 col-sm-12">
                                  <div className="form-group">
                                    <select
                                      className=" form-control form-select form-select-sm"
                                      aria-label=".form-select-sm example"
                                      placeholder="Select Time"
                                      onChange={(e) => setPrice(e.target.value)}
                                    >
                                      <option selected disabled>
                                        Select Time
                                      </option>
                                      <option value="Full Time">
                                        Full Time
                                      </option>
                                      <option value="Part Time">
                                        Part Time
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                  <div className="form-group">
                                    <input
                                      fullWidth
                                      className="form-control"
                                      type="number"
                                      min="0"
                                      id="number"
                                      placeholder="Hourly Rate(1-8$/hr)"
                                      onChange={(e) =>
                                        setHourlyRate(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                  <div className="form-group">
                                    <input
                                      fullWidth
                                      className="form-control"
                                      // variant="outlined"
                                      type="number"
                                      min="0"
                                      id="number"
                                      placeholder="Daily Hours(1-8)"
                                      onChange={(e) =>
                                        setDailyHour(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div>
                                <span className="postjob-fontsize">
                                  Job Categories
                                </span>
                                <div className="form-group">
                                  <select
                                    placeholder="Select Categorory"
                                    onChange={(e) =>
                                      setSelectCategory(e.target.value)
                                    }
                                    className=" form-control form-select form-select-sm"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option selected disabled>
                                      Select Category
                                    </option>
                                    {categoryData.map((i, index) => (
                                      <option
                                        key={`key${index}`}
                                        value={i.name}
                                      >
                                        {i.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="postjob-fontsize">
                                Job Details
                              </span>
                              <div>
                                <p>
                                  <textarea
                                    name="answer"
                                    placeholder="Job Details..."
                                    className="form-control"
                                    onChange={(e) =>
                                      setJobDescription(e.target.value)
                                    }
                                    rows="8"
                                  />
                                </p>
                                {/* <CKEditor
                              editor={ClassicEditor}
                              // data="<p>Hello from CKEditor 5!</p>"
                              onReady={(editor) => {
                                // console.log(editor);
                              }}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                // console.log({ event, editor, data });
                                // console.log("123121",ReactHtmlParser(data) );
                                // setJobDescription(data);
                              }}
                              onBlur={(event, editor) => {
                                .log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            /> */}
                                <br />
                                {/* {jobdescription ? renderHTML(jobdescription) : ""} */}
                                <div>
                                  <span className="postjob-fontsize">
                                    Project Expiry Date (optional)
                                  </span>

                                  <input
                                    min={moment(new Date()).format(
                                      "YYYY-MM-DD"
                                    )}
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    onChange={(e) => handlePostDate(e)}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            {/* <div>
                                                    <span className="postjob-fontsize">
                                                        Skills Required
                                                    </span>
                                                    <div class="form-group">
                                                        <select
                                                            placeholder="Select Skills"
                                                            onChange={(e) =>
                                                                setSkill(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className=" form-control form-select form-select-sm"
                                                aria-label=".form-select-sm example"
                                                        >
                                                            <option
                                                                selected
                                                                disabled
                                                            >
                                                                Select Skills
                                                            </option>
                                                            {skillData &&
                                                            skillData.length > 0
                                                                ? skillData.map(
                                                                      (i) => (
                                                                          <option
                                                                              value={
                                                                                  i.name
                                                                              }
                                                                          >
                                                                              {
                                                                                  i.name
                                                                              }
                                                                          </option>
                                                                      )
                                                                  )
                                                                : null}
                                                        </select>
                                                    </div>
                                                </div> */}
                            <div className="row">
                              <div className="col-md-7">
                                <Typography
                                  className="postjob-fontsize"
                                  variant="h5"
                                  component="div"
                                >
                                  Skills Required
                                </Typography>
                              </div>
                              <div className="col-md-5 text-right">
                                <Button
                                  onClick={handleSkillsClick}
                                  className="justify-end"
                                >
                                  +Add Skills
                                </Button>
                              </div>
                            </div>

                            {skillsList.map((x, i) => {
                              return (
                                <div className="row" key={`key${i}`}>
                                  <div className="btn-box">
                                    {skillsList.length !== 0 && (
                                      <div className="form-box1 form-box-border">
                                        <p className="job-title">
                                          Add or Remove Skills
                                        </p>

                                        <Button
                                          onClick={() =>
                                            handleSkillsRemoveClick(i)
                                          }
                                        >
                                          <DeleteOutlineIcon
                                            style={{
                                              color: "red",
                                              fontSize: 30,
                                              marginRight: 10,
                                            }}
                                          />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  <Fragment>
                                    <div className="col-lg-12 pt-3 form-group">
                                      <select
                                        className=" form-control form-select form-select-sm"
                                        aria-label=".form-select-sm example"
                                        placeholder="Select Skills"
                                        name="skills"
                                        onChange={(e) =>
                                          handleSkillsChange(e, i)
                                        }
                                        id="exampleFormControlSelect1"
                                      >
                                        <option selected disabled>
                                          Select Skills
                                        </option>
                                        {skillData.map((i, index) => {
                                          return (
                                            <option
                                              key={`key${index}`}
                                              value={i.name}
                                            >
                                              {i.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </Fragment>
                                </div>
                              );
                            })}
                            <div>
                              <span className="postjob-fontsize">
                                Upload Relevant Project Files
                              </span>
                              <div>
                                <FileUploader
                                  fullWidth
                                  handleChange={(e) => setFileUploder(e)}
                                  name="file"
                                  // types={fileTypes}
                                />
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col-md-7">
                                <span className="postjob-fontsize">
                                  Add your Frequently asked questions
                                </span>
                              </div>
                              <div className="col-md-5 text-right">
                                <Button
                                  onClick={handleAddClick}
                                  className="justify-end"
                                >
                                  +Add Frequently asked questions
                                </Button>
                              </div>
                            </div>

                            {faqList.map((x, i) => {
                              return (
                                <div className="row pt-3" key={`key${i}`}>
                                  <div className="btn-box">
                                    {faqList.length !== 0 && (
                                      <div className="form-box1">
                                        <p className="job-title">Question</p>
                                        <Button
                                          onClick={() => handleRemoveClick(i)}
                                        >
                                          <DeleteOutlineIcon
                                            style={{
                                              color: "red",
                                            }}
                                          />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  <Fragment>
                                    <div className="col-md-12">
                                      <input
                                        name="question"
                                        placeholder="Question"
                                        // value={x.firstName}
                                        className="form-control"
                                        onChange={(e) => handleFaqChange(e, i)}
                                      />
                                    </div>
                                  </Fragment>
                                </div>
                              );
                            })}
                            <br />
                            <div>
                              <span>
                                Update all the latest changes made by you, by
                                just clicking on “Save & Update" button.
                              </span>
                              <br />
                              <br />
                              <Button
                                className="btn btn-blue"
                                onClick={() => handleSubmit()}
                              >
                                Save & Update
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
}
export default PostaJob;
