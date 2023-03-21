import React from "react";
import SideBarImport from "layouts/LMS/SideBarImport";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddCategoryDetails from "../AddCategoryDetails";
import { Card } from "@mui/material";

function LMSSettings() {
  return (
    <React.Fragment>
      <SideBarImport />
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiTypography>
            <AddCategoryDetails />
          </SuiTypography>
        </SuiBox>
        <SuiBox>
          <Card style={{ padding: "15px" }} mt={2}></Card>
        </SuiBox>
      </DashboardLayout>
    </React.Fragment>
  );
}
export default LMSSettings;
