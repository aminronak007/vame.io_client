import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { useHistory } from "react-router";
// import { Button } from "@mui/material";

function AddReportsDetails() {
  let history = useHistory();
  // const handleReports = () => {
  //   history.push("/reports");
  // };

  const handleTransection = () => {
    history.push("/transactions");
  };

  return (
    <SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={8} xl={4}>
            <p style={{ cursor: "pointer" }} onClick={() => handleReports()}>
              <MiniStatisticsCard
                title={{ text: "Reports" }}
                icon={{ color: "info", component: "paid" }}
              />
            </p>
          </Grid> */}
          <Grid item xs={12} sm={8} xl={4}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleTransection()}
            >
              <MiniStatisticsCard
                title={{ text: "Transactions" }}
                icon={{ color: "info", component: "public" }}
              />
            </p>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}
export default AddReportsDetails;
