// @mui material components
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import Table from "examples/Table";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Footer from "examples/Footer";

// Custom styles for the Tables
import styles from "layouts/project/styles";

// Data
import { url } from "config";
import Footer from "examples/Footer";
import AddCategoryDetails from "../AddCategoryDetails";
import AddCourseCategory from "./component/addCourseCategory";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function CourseCategories() {
  let history = useHistory();
  const classes = styles();
  const [coursesCategories, setCoursesCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const columns = [
    { name: "Sr No", align: "center" },
    { name: "category_Name", align: "center" },
    { name: "tagline", align: "center" },
    { name: "bagde", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = [];

  useEffect(() => {
    loadCourseCategoryDetails();
  }, []);

  const loadCourseCategoryDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/list-courses`).then((result) => {
        // console.log(result);
        setCoursesCategories(result.data.listCoursesCategories);
      });
    } else {
      window.location = "/";
    }
  };

  const searched = (key) => (c) => c.categoryName.toLowerCase().includes(key);

  const handleDeleteCourse = (category_id) => {
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
        axios
          .delete(`${url}/api/delete/category/${category_id}`)
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
              loadCourseCategoryDetails();
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
              loadCourseCategoryDetails();
            }
          });
      }
    });
  };

  if (coursesCategories.length > 0) {
    coursesCategories.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        "Sr No": idx + 1,
        category_Name: item.categoryName,
        tagline: item.categoryTagline,
        bagde: (
          <img
            width={40}
            alt={`${!item.categoryBadge ? "" : item.categoryName}`}
            src={`${url}/${item.categoryBadge}`}
          />
        ),
        actions: (
          <React.Fragment>
            <button
              type="button"
              onClick={() => history.push(`/edit/course-category/${item.slug}`)}
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
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiTypography>
          <AddCategoryDetails />
        </SuiTypography>
      </SuiBox>
      <AddCourseCategory
        loadCourseCategoryDetails={loadCourseCategoryDetails}
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
        <ToastContainer />
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CourseCategories;
