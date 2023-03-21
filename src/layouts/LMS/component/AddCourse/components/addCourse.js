import { Button, Card, InputLabel, TextareaAutosize } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { url } from "config";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const AddSubCourse = ({ courseCategoryDetail, loadCoursesDetails }) => {
  let history = useHistory();
  const [parentCategory, setParentCategory] = useState("");
  const [courseName, setCourseName] = useState("");
  const [feature, setFeature] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [courseImage, setCourseImage] = useState([]);
  const [contentData, setContentData] = useState([
    {
      contentTopic: "",
      description: "",
      url: {},
    },
  ]);

  const handleCourseImage = (file) => {
    setCourseImage(file);
  };

  const handleContentDataChange = (e, index) => {
    const { name, value } = e.target;
    let file = "";
    if (name === "url") {
      file = e.target.files;
    }
    const data = [...contentData];
    if (name === "url") {
      data[index][name] = file;
      setContentData(data);
    } else {
      data[index][name] = value;
      setContentData(data);
    }
  };

  const handleContentAddClick = () => {
    setContentData([
      ...contentData,
      { contentTopic: "", description: "", url: {} },
    ]);
  };
  const handleContentRemoveClick = (index) => {
    const data = [...contentData];
    data.splice(index, 1);
    setContentData(data);
  };

  const handleAddNewCourse = () => {
    const data = new FormData();

    data.append("parentCategory", parentCategory);
    data.append("courseName", courseName);
    data.append("feature", feature);
    data.append("price", price);
    data.append("description", description);
    data.append("courseImage", courseImage);
    data.append("contentData", JSON.stringify(contentData));

    for (let i = 0; i < contentData.length; i++) {
      data.append("url", contentData[i].url[0]);
    }

    axios.post(`${url}/api/add/courses`, data).then((result) => {
      // console.log("res", result);
      if (result.data.success) {
        toast.success(result.data.success, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history.push("/view-add/courses");
        loadCoursesDetails();
      } else {
        toast.error(result.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        loadCoursesDetails();
      }
    });
  };

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
              <h6>Add New Courses</h6>
              <div className="row">
                <div className="col-md-6">
                  <InputLabel>Course Title</InputLabel>
                  <input
                    size="small"
                    placeholder="Enter Course Name"
                    onChange={(e) => setCourseName(e.target.value)}
                    className="form-control"
                  />

                  <p
                    style={{
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    The Course Name is how it appears on your site.
                  </p>
                </div>
                <div className="col-md-6">
                  <InputLabel>Select Course Category</InputLabel>
                  <select
                    onChange={(e) => setParentCategory(e.target.value)}
                    className=" form-control form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option disabled>Select Course Category</option>
                    {courseCategoryDetail && courseCategoryDetail.length > 0
                      ? courseCategoryDetail.map((c) => {
                          return (
                            <option value={c._id} key={c._id}>
                              {c.categoryName}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    The Course Category is how it appears on your site.
                  </p>
                </div>
                <div className="col-md-6">
                  <InputLabel>Course Description</InputLabel>
                  <TextareaAutosize
                    minRows="3"
                    style={{ width: "100%" }}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    The description is not prominent by default; however, some
                    themes may show it.
                  </p>
                </div>
                <div className="col-md-6">
                  <InputLabel>Feature Category Course</InputLabel>

                  <RadioGroup
                    aria-label="gender"
                    name="radio-buttons-group"
                    onChange={(e) => setFeature(e.target.value)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    This is used for creating the "Slideshow of Featureds
                    Courses"
                  </p>
                </div>
                <div className="col-md-6">
                  <InputLabel>Course Price</InputLabel>
                  <input
                    size="small"
                    min="0"
                    type="number"
                    placeholder="Enter Price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <InputLabel>Course Image</InputLabel>

                  <FileUploader
                    handleChange={handleCourseImage}
                    name="courseImage"
                  />
                </div>
                <div className="col-md-6">
                  <InputLabel>Course Content</InputLabel>
                  <Button
                    className="btn btn-primary"
                    onClick={handleContentAddClick}
                  >
                    + Add Course Content
                  </Button>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    {contentData.map((x, i) => {
                      return (
                        <React.Fragment key={`key${i}`}>
                          <div
                            className={i === 0 ? `col-lg-6 pt-3` : "col-lg-6"}
                          >
                            <InputLabel>Content Topic</InputLabel>
                            <input
                              size="small"
                              type="text"
                              placeholder="Enter Content Topic"
                              onChange={(e) => handleContentDataChange(e, i)}
                              name="contentTopic"
                              className="form-control"
                            />
                          </div>
                          <div
                            className={i === 0 ? `col-lg-6 pt-3 ` : "col-lg-6 "}
                          >
                            <InputLabel>Content Video</InputLabel>
                            <input
                              className="form-control"
                              type="file"
                              onChange={(e) => handleContentDataChange(e, i)}
                              name="url"
                            />
                          </div>
                          <div
                            className={
                              i === 0 ? `col-lg-12  pt-3 ` : "col-lg-12 "
                            }
                          >
                            <InputLabel>Content Description</InputLabel>
                            <textarea
                              size="small"
                              type="text"
                              placeholder="Enter Content Description"
                              onChange={(e) => handleContentDataChange(e, i)}
                              name="description"
                              className="form-control"
                            />
                            <div className="text-right remove-content">
                              <p
                                className="remove-content"
                                onClick={() => handleContentRemoveClick(i)}
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-6">
                  <br />
                  <div>
                    <SuiButton color="primary" onClick={handleAddNewCourse}>
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

export default AddSubCourse;
