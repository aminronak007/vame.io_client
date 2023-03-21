// @mui material components
import axios from "axios";
import { url } from "config";
import { useEffect, useState } from "react";
// import { Grid, InputLabel, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
// import SuiButton from "components/SuiButton";
import Table from "examples/Table";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// Custom styles for the Tables
import styles from "layouts/project/styles";

// Data
import EmployerDash from "./EmployerDash";

// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 900,
//     bgcolor: "background.paper",
//     border: "2px solid #fff",
//     borderRadius: "4px",
//     boxShadow: 24,
//     p: 4,
// };

function DeletedAccounts() {
  const classes = styles();

  const [employerDeleteAccounts, setEmployerDeletedAccounts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/employer/read/user/deleted-account`).then((res) => {
        // console.log(res);
        setEmployerDeletedAccounts(res.data?.deleteEmployerDetails);
        setIsLoading(false);
      });
    } else {
      window.location = "/";
    }
  }, []);

  const columns = [
    { name: "Sr No", align: "center" },
    { name: "email", align: "center" },
    { name: "reason", align: "center" },
    { name: "description", align: "center" },
  ];

  const rows = [];

  const searched = (key) => (c) => c?.email.toLowerCase().includes(key);

  if (employerDeleteAccounts.length > 0) {
    employerDeleteAccounts.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        "Sr No": idx + 1,
        email: item?.email,
        reason: item?.reasonToDelete,
        description: item?.description !== "" ? item.description : "-",
      })
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiTypography>
          <EmployerDash />
        </SuiTypography>

        <Card style={{ padding: "15px" }} mt={2}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <div></div>
            <div>
              <SuiInput
                size="medium"
                placeholder="Type here..."
                withIcon={{ icon: "search", direction: "left" }}
                customClass={classes.navbar_input}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <SuiBox customClass={classes.tables_table}>
            {isLoading ? (
              <div className="text-center">
                <i className="spinner-border"></i>
              </div>
            ) : (
              <Table columns={columns} rows={rows} />
            )}
          </SuiBox>
        </Card>
        <ToastContainer />
      </SuiBox>
    </DashboardLayout>
  );
}

export default DeletedAccounts;
