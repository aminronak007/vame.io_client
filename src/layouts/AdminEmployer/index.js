import React from "react";
// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EmployerList from "layouts/AdminEmployer/component/EmployerList";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import EmployerDash from "layouts/AdminEmployer/component/EmployerDash";

function index() {
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <SuiBox style={{ padding: "15px" }} mt={2}>
                <SuiTypography>
                    <EmployerDash />
                </SuiTypography>
                <EmployerList />
            </SuiBox>
        </DashboardLayout>
    );
}
export default index;
