// @mui material components
import axios from "axios";
import { url } from "config";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { ToastContainer } from "react-toastify";
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
import EmployerDash from "./EmployerDash";

function EmployerTransaction() {
  const classes = styles();

  const [employerDeleteAccounts, setEmployerDeletedAccounts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/employer-all-details`).then((res) => {
        console.log("data", res.data.employerDetails);
        setEmployerDeletedAccounts(res.data?.employerDetails);
        setIsLoading(false);
      });
    } else {
      window.location = "/";
    }
  }, []);

  const columns = [
    { name: "SrNo", align: "center" },
    { name: "Name", align: "center" },
    { name: "Email", align: "center" },
    { name: "OrderID", align: "center" },
    { name: "Amount", align: "center" },
    { name: "TransactionId", align: "center" },

    { name: "description", align: "center" },
  ];

  const rows = [];

  const searched = (key) => (c) => c?.displayname.toLowerCase().includes(key);

  if (employerDeleteAccounts.length > 0) {
    employerDeleteAccounts.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        "Sr No": idx + 1,
        Name: item?.displayname,
        Email: item?.email,
        OrderID:
          item?.projectPaymentDetails.length > 0
            ? item?.projectPaymentDetails?.map((i) => i?.orderId)
            : "-",
        Amount: item?.projectPaymentDetails
          ? item?.projectPaymentDetails?.map(
              (i) => i?.transactionDetails?.amount
            )
          : "-",
        TransactionId: item?.projectPaymentDetails
          ? item?.projectPaymentDetails?.map(
              (i) => i?.transactionDetails?.transactionId
            )
          : "-",
        // description: item?.description !== "" ? item.description : "-",
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

export default EmployerTransaction;
