// @mui material components
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import Table from "examples/Table";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SideBar from "../../SideBarImport";

// import Footer from "examples/Footer";

// Custom styles for the Tables
import styles from "layouts/project/styles";

// Data
import { url } from "config";
import Footer from "examples/Footer";
import AddCategoryDetails from "../AddCategoryDetails";
import AddCourses from "./components/addCourse";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function AddSubCourse() {
  let history = useHistory();
  const classes = styles();
  const [keyword, setKeyword] = useState("");
  const [courseCategoryDetail, setCourseCategoryDetail] = useState({});

  const columns = [
    { name: "srno", align: "center" },
    { name: "coursename", align: "center" },
    { name: "category", align: "center" },
    { name: "feature", align: "center" },
    { name: "price", align: "center" },
    { name: "course_Image", align: "center" },
    { name: "enrolled", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = [];

  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    loadCourseCategoriesDetails();
    loadCoursesDetails();
  }, []);

  const loadCoursesDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/list/courses`).then((res) => {
        // console.log(res);
        setCourseDetails(res.data.listCoursesDetails);
      });
    } else {
      window.location = "/";
    }
  };

  const loadCourseCategoriesDetails = () => {
    axios.get(`${url}/api/list-courses`).then((result) => {
      // console.log(result);
      setCourseCategoryDetail(result.data.listCoursesCategories);
    });
  };

  const searched = (key) => (c) => c.courseTitle.toLowerCase().includes(key);

  const handleDeleteCourse = (course_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "All the data will be Deleted Permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      // console.log("result", result);
      if (result.value) {
        axios.delete(`${url}/api/delete/course/${course_id}`).then((res) => {
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
            loadCourseCategoriesDetails();
            loadCoursesDetails();
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
            loadCourseCategoriesDetails();
            loadCoursesDetails();
          }
        });
      }
    });
  };

  if (courseDetails.length > 0) {
    courseDetails.filter(searched(keyword)).map((item, i) =>
      rows.push({
        srno: i + 1,
        coursename: item.courseTitle,
        category: item.courseCategory.categoryName,
        feature: item.feature,
        price: item.price,
        enrolled: item.enrolled?.length,
        course_Image: (
          <img
            width={40}
            alt={`${!item.courseImageUrl ? "" : item.courseTitle}`}
            src={`${url}/${item.courseImageUrl}`}
          />
        ),
        actions: (
          <React.Fragment>
            <button
              type="button"
              onClick={() => history.push(`/edit/course/${item.slug}`)}
              className="btn btn-blue"
            >
              Edit
            </button>
            &nbsp;
            <button
              type="button"
              onClick={() => handleDeleteCourse(item._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </React.Fragment>
        ),
      })
    );
  }

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

        <AddCourses
          courseCategoryDetail={courseCategoryDetail}
          loadCoursesDetails={loadCoursesDetails}
        />

        <SuiBox>
          <Card style={{ padding: "15px" }} mt={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              <div>
                {/* <select className="control w-30 h-20">
                  <option>Bulk action</option>
                  <option>Edit</option>
                  <option>Move to Tarsh</option>
                </select>
                &ensp;
                <Button style={{ textTransform: "none" }}>Apply</Button> */}
              </div>
              <div>
                <SuiInput
                  size="medium"
                  placeholder="Type here..."
                  withIcon={{
                    icon: "search",
                    direction: "left",
                  }}
                  customClass={classes.navbar_input}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    </React.Fragment>
  );
}

export default AddSubCourse;
