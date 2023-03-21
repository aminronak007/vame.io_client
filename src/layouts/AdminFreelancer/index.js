import React from "react";
// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBox from "components/SuiBox";
import FreelancerList from "layouts/AdminFreelancer/component/FreelancerList";
import FreelancerDash from "./component/FreelancerDash";
import SuiTypography from "components/SuiTypography";

function index() {
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <SuiBox style={{ padding: "15px" }} mt={2}>
                <SuiTypography>
                    <FreelancerDash />
                </SuiTypography>
                <FreelancerList />
            </SuiBox>
        </DashboardLayout>
    );
}
export default index;
