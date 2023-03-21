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

function AddCategoryDetails() {
  let history = useHistory();
  const handleCategoires = () => {
    history.push("/course-categories");
  };

  const handleCourses = () => {
    history.push("/view-add/courses");
  };

  const handleQuizzes = () => {
    history.push("/quiz");
  };

  const handleReports = () => {
    history.push("/reports");
  };

  const handleGroups = () => {
    history.push("/groups");
  };

  return (
    <SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleCategoires()}>
              <MiniStatisticsCard
                title={{ text: "Categories" }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleCourses()}>
              <MiniStatisticsCard
                title={{ text: "Courses " }}
                icon={{ color: "info", component: "public" }}
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleQuizzes()}>
              <MiniStatisticsCard
                title={{ text: "Quizzes " }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleReports()}>
              <MiniStatisticsCard
                title={{ text: "Reports" }}
                icon={{ color: "info", component: "public" }}
              />
            </a>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleGroups()}>
              <MiniStatisticsCard
                title={{ text: "Groups" }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid>
          {/* <Grid item xs={12} sm={6} xl={3}>
            <a style={{ cursor: "pointer" }} onClick={() => handleSettings()}>
              <MiniStatisticsCard
                title={{ text: "Settings" }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid> */}
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}
export default AddCategoryDetails;
