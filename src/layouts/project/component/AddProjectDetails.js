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

function AddProjectDetails() {
  let history = useHistory();

  const handleProject = () => {
    history.push("/project");
  };
  const handleCategories = () => {
    history.push("/categories");
  };
  const handleSkills = () => {
    history.push("/skills");
  };
  const handleLocation = () => {
    history.push("/location");
  };
  const handleLanguages = () => {
    history.push("/languages");
  };
  const handleProjectLevels = () => {
    history.push("/projectlevals");
  };
  const handleProjectExperience = () => {
    history.push("/projectexperience");
  };
  const handleProjectDuration = () => {
    history.push("/projectduration");
  };
  const handleFreelancerType = () => {
    history.push("/freelancertype");
  };
  const handleProposals = () => {
    history.push("/proposals");
  };
  return (
    <SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <p style={{ cursor: "pointer" }} onClick={() => handleProject()}>
              <MiniStatisticsCard
                title={{ text: "Projects" }}
                icon={{ color: "info", component: "paid" }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p style={{ cursor: "pointer" }} onClick={() => handleCategories()}>
              <MiniStatisticsCard
                title={{ text: "Categories" }}
                icon={{ color: "info", component: "public" }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p style={{ cursor: "pointer" }} onClick={() => handleSkills()}>
              <MiniStatisticsCard
                title={{ text: "Skills" }}
                icon={{
                  color: "info",
                 component: "emoji_events",
                }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p style={{ cursor: "pointer" }} onClick={() => handleLocation()}>
              <MiniStatisticsCard
                title={{ text: "Locations" }}
                icon={{
                  color: "info",
                  component: "L",
                }}
              />
            </p>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <p style={{ cursor: "pointer" }} onClick={() => handleLanguages()}>
              <MiniStatisticsCard
                title={{ text: "Languages" }}
                icon={{ color: "info", component: "paid" }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleProjectLevels()}
            >
              <MiniStatisticsCard
                title={{ text: "Project levels" }}
                icon={{ color: "info", component: "public" }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleProjectExperience()}
            >
              <MiniStatisticsCard
                title={{ text: "Project Experience" }}
                icon={{
                  color: "info",
                  component: "emoji_events",
                }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleProjectDuration()}
            >
              <MiniStatisticsCard
                title={{ text: "Project duration" }}
                icon={{
                  color: "info",
                  component: "L",
                }}
              />
            </p>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleFreelancerType()}
            >
              <MiniStatisticsCard
                title={{ text: "Freelancer Type" }}
                icon={{ color: "info", component: "paid" }}
              />
            </p>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <p style={{ cursor: "pointer" }} onClick={() => handleProposals()}>
              <MiniStatisticsCard
                title={{ text: "Proposals" }}
                icon={{ color: "info", component: "public" }}
              />
            </p>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}
export default AddProjectDetails;
