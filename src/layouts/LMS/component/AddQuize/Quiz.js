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
import AddQuiz from "./component/AddQuiz";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function Quiz() {
  let history = useHistory();
  const classes = styles();
  const [keyword, setKeyword] = useState("");

  const columns = [
    { name: "SrNo", align: "center" },
    { name: "quiz_name", align: "center" },
    { name: "Assigned_Course", align: "center" },
    { name: "Author", align: "center" },
    { name: "date", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = [];

  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    loadQuizdata();
  }, [quizData]);

  const loadQuizdata = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/read/quiz/details`).then((res) => {
        setQuizData(res.data.quizDetails);
      });
    } else {
      window.location = "/";
    }
  };

  const searched = (key) => (c) => c.quizName?.toLowerCase().includes(key);

  if (quizData.length > 0) {
    quizData.filter(searched(keyword))?.map((item, i) =>
      rows?.push({
        SrNo: i + 1,
        quiz_name: item.quizName,
        Assigned_Course: item.courseId.courseTitle,
        Author: item.authorId?.firstname || item.authorId?.lastname,
        date: item.createdAt,
        action: (
          <React.Fragment>
            <button
              type="button"
              onClick={() => {
                handleEditQuiz(item.slug);
              }}
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

  const handleEditQuiz = (slug) => {
    history.push(`/edit/quiz/${slug}`);
  };

  const handleDeleteCourse = (quiz_id) => {
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
        axios.delete(`${url}/api/delete/quiz/${quiz_id}`).then((res) => {
          if (res.data.success) {
            toast.success(res.data.success, {
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
            toast.error(res.data.error, {
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
        <AddQuiz loadCoursesDetails={loadQuizdata} />
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

export default Quiz;
