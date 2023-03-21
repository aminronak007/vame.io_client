import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { Link } from "react-router-dom";

// import { Button } from "@mui/material";

function FreelancerDash() {
  return (
    <SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={4}>
            <Link to="/freelancer">
              <MiniStatisticsCard
                title={{ text: "Freelancers" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Link>
          </Grid>
          {/* <Grid item xs={12} sm={6} xl={4}>
            <Link to="/freelancer/transaction-history">
              <MiniStatisticsCard
                title={{ text: "Freelancers Transaction" }}
                icon={{ color: "info", component: "public" }}
              />
            </Link>
          </Grid> */}
          <Grid item xs={12} sm={6} xl={4}>
            <Link to="/freelancer/deleted">
              <MiniStatisticsCard
                title={{ text: "Deleted Accounts" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Link>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}
export default FreelancerDash;
