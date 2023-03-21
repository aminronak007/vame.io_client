import { Card, InputLabel, TextareaAutosize } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { url } from "config";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

const AddCourseCategory = ({ loadCourseCategoryDetails }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryTagline, setCategoryTagline] = useState("");
  const [description, setDescription] = useState("");
  const [categoryBadge, setCategoryBadge] = useState([]);

  const handleBagde = (file) => {
    setCategoryBadge(file);
  };
  const handleAddNewCourse = () => {
    const data = new FormData();

    data.append("categoryName", categoryName);
    data.append("categoryTagline", categoryTagline);
    data.append("categoryBadge", categoryBadge);
    data.append("description", description);

    axios.post(`${url}/api/add/course-category`, data).then((result) => {
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
        loadCourseCategoryDetails();
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
        loadCourseCategoryDetails();
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
              <h6>Add New Course Category</h6>
              <div className="row">
                <div className="col-md-6">
                  <InputLabel>Category Title</InputLabel>
                  <SuiInput
                    size="small"
                    placeholder="Enter Course Category Name"
                    onChange={(e) => setCategoryName(e.target.value)}
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
                  <InputLabel>Tag Line</InputLabel>
                  <SuiInput
                    size="small"
                    placeholder="Enter Course Category Tagline"
                    onChange={(e) => setCategoryTagline(e.target.value)}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    The Course Tagline is how it appears on your site.
                  </p>
                </div>
                <div className="col-md-6">
                  <InputLabel>Category Description</InputLabel>
                  <TextareaAutosize
                    minRows="3"
                    style={{ width: "100%" }}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    placeholder="Enter Category Description"
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
                  <InputLabel>Category Badge</InputLabel>

                  <FileUploader
                    handleChange={handleBagde}
                    name="categoryBadge"
                  />
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

export default AddCourseCategory;
