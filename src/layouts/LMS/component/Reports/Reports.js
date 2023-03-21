import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SideBarImport from "layouts/LMS/SideBarImport";
import SuiBox from "components/SuiBox";
// import AddReportsDetails from "./AddReportsDetails";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import { url } from "config";
import axios from "axios";
import Table from "examples/Table";
import styles from "layouts/project/styles";
import moment from "moment";
import SuiInput from "components/SuiInput";

function Reports() {
  const classes = styles();
  const columns = [
    { name: "SrNo", align: "center" },
    { name: "Enrolled_Course", align: "center" },
    { name: "orderId", align: "center" },
    { name: "date", align: "center" },
    { name: "transaction_type", align: "center" },
    { name: "user", align: "center" },
  ];

  const rows = [];

  const [transactionData, setTransactionData] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    loadTransactionData();
  }, []);

  const loadTransactionData = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/all-transactions`).then((res) => {
        setTransactionData(res.data.transactionDetails);
      });
    } else {
      window.location = "/";
    }
  };

  const searched = (key) => (c) =>
    c.courseId?.courseTitle?.toLowerCase().includes(key);

  if (transactionData.length > 0) {
    transactionData.filter(searched(keyword))?.map((i, idx) =>
      rows?.push({
        SrNo: idx + 1,
        Enrolled_Course: i?.courseId?.courseTitle,
        orderId: i?.orderId,
        date: moment(i?.orderDate).format("MMMM DD,YYYY"),
        transaction_type: i?.transactionDetails?.cardTransactionType,
        user: i?.transactionDetails?.cardHolderInfo?.firstName,
      })
    );
  }
  return (
    <React.Fragment>
      <SideBarImport />
      <DashboardLayout>
        <DashboardNavbar />
        {/* <SuiBox py={3}>
          <SuiTypography>
            <AddReportsDetails />
          </SuiTypography>
        </SuiBox> */}
        <Card style={{ padding: "15px" }} mt={2}>
          <div className="transaction-search align-items-end ">
            <SuiInput
              size="medium"
              placeholder="Type here..."
              withIcon={{
                icon: "search",
                direction: "left",
              }}
              // customClass={classes.navbar_input}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns} rows={rows} />
          </SuiBox>
        </Card>
        <Footer />
      </DashboardLayout>
    </React.Fragment>
  );
}
export default Reports;
