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

function AddGroupdDetails() {
  let history = useHistory();

  const handleAddNewGroup = () => {
    history.push("/add-group");
  };

  const handleGroupCategoires = () => {
    history.push("/groups/group-categories");
  };

  const handleGruopTags = () => {
    history.push("/groups/group-tags");
  };

  const handleCategoires = () => {
    history.push("/groups/categories");
  };

  // const handleTags = () => {
  //   history.push("/groups/tags");
  // };

  return (
    <SuiBox>
      <SuiBox mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a
              style={{ cursor: "pointer" }}
              onClick={() => handleAddNewGroup()}
            >
              <MiniStatisticsCard
                title={{ text: "Add New Group" }}
                icon={{ color: "info", component: "public" }}
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a
              style={{ cursor: "pointer" }}
              onClick={() => handleGroupCategoires()}
            >
              <MiniStatisticsCard
                title={{ text: "Group Categories" }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleGruopTags()}>
              <MiniStatisticsCard
                title={{ text: "Group Tags " }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            {/* eslint-disable-next-line */}
            <a style={{ cursor: "pointer" }} onClick={() => handleCategoires()}>
              <MiniStatisticsCard
                title={{ text: "Categories" }}
                icon={{ color: "info", component: "paid" }}
              />
            </a>
          </Grid>
          {/* <Grid item xs={12} sm={6} xl={3}>
            <a style={{ cursor: "pointer" }} onClick={() => handleTags()}>
              <MiniStatisticsCard
                title={{ text: "Tags" }}
                icon={{ color: "info", component: "public" }}
              />
            </a>
          </Grid> */}
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}
export default AddGroupdDetails;
