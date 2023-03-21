// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

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
import ProposalsTableData from "layouts/project/data/ProposalsTableData";
import AddProjectDetails from "./AddProjectDetails";

function Proposals() {
  const classes = styles();
  const { columns, rows } = ProposalsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SuiBox>
        <SuiTypography>
          <AddProjectDetails />
        </SuiTypography>
        <Card mt={2}>
          <div>
            {/* <select className="control w-30 h-20">
              <option>Bulk action</option>
              <option>Edit</option>
              <option>Move to Tarsh</option>
            </select>{" "}
            &ensp;
            <Button style={{ textTransform: "none" }}>Apply</Button>
            &ensp; &ensp;
            <select className="control w-30 h-20">
              <option>All Date</option>
              <option>july 2021</option>
            </select>{" "}
            &ensp;
            <Button style={{ textTransform: "none" }}>Filter</Button> */}
          </div>
          <SuiBox pr={1}>
            <SuiInput
              size="medium"
              placeholder="Type here..."
              withIcon={{ icon: "search", direction: "left" }}
              customClass={classes.navbar_input}

            />
            <Button style={{ textTransform: "none" }}>Filter</Button>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns} rows={rows} />
          </SuiBox>
        </Card>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Proposals;
