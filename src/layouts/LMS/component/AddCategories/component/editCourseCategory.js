import { Card, InputLabel, TextareaAutosize } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { url } from "config";
import SideBarImport from "layouts/LMS/SideBarImport";
import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddCategoryDetails from "../../AddCategoryDetails";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import Footer from "examples/Footer";
import { useHistory, useParams } from "react-router";

const EditCourseCategory = () => {
  let history = useHistory();
  const [categoryName, setCategoryName] = useState("");
  const [categoryTagline, setCategoryTagline] = useState("");
  const [description, setDescription] = useState("");
  const [categoryBadge, setCategoryBadge] = useState([]);
  const [courseCategoryDetail, setCourseCategoryDetail] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    axios.get(`${url}/api/read-course/${slug}`).then((res) => {
      setCourseCategoryDetail(res.data.readCourseCategories);
    });

    /* eslint-disable-next-line */
  }, []);

  const handleCategoryBagde = (file) => {
    setCategoryBadge(file);
  };

  const handleEditCourse = () => {
    const data = new FormData();

    data.append(
      "categoryName",
      categoryName ? categoryName : courseCategoryDetail.categoryName
    );
    data.append(
      "categoryTagline",
      categoryTagline ? categoryTagline : courseCategoryDetail.categoryTagline
    );
    data.append(
      "categoryBadge",
      categoryBadge?.name ? categoryBadge : courseCategoryDetail.categoryBadge
    );
    data.append(
      "description",
      description ? description : courseCategoryDetail.description
    );

    axios.put(`${url}/api/edit/category/${slug}`, data).then((result) => {
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
        history.push("/course-categories");
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
      }
    });
  };
  return (
    <React.Fragment>
      <SideBarImport />
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
                  <h6>Edit Course Category</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <InputLabel>Category Title</InputLabel>

                      <input
                        style={{
                          borderRadius: "8px",
                          border: "1px solid lightgrey",
                          width: "100%",
                        }}
                        className="form-control"
                        placeholder="Enter Course Name"
                        type="text"
                        onChange={(e) => setCategoryName(e.target.value)}
                        defaultValue={courseCategoryDetail?.categoryName}
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
                      <input
                        style={{
                          borderRadius: "8px",
                          border: "1px solid lightgrey",
                          width: "100%",
                        }}
                        className="form-control"
                        type="text"
                        placeholder="Enter Course Tagline"
                        onChange={(e) => setCategoryTagline(e.target.value)}
                        defaultValue={courseCategoryDetail?.categoryTagline}
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
                        className="form-control"
                        style={{ width: "100%" }}
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={courseCategoryDetail?.description}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                        }}
                      >
                        The description is not prominent by default; however,
                        some themes may show it.
                      </p>
                    </div>

                    <div className="col-md-6">
                      <InputLabel>Category Badge</InputLabel>

                      <FileUploader
                        handleChange={handleCategoryBagde}
                        name="categoryBadge"
                      />
                    </div>
                    <div className="col-md-6">
                      <br />
                      <div>
                        <SuiButton
                          color="primary"
                          onClick={() => handleEditCourse()}
                        >
                          UPDATE
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

export default EditCourseCategory;
