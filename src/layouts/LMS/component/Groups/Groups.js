// @mui material components
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "react-toastify/dist/ReactToastify.css";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SideBar from "../../SideBarImport";

// Data
import { url } from "config";
import AddGrupsDetails from "./AddGroupsDetails";
import { useHistory } from "react-router";
import groupImg from "../../../../assets/images/gruop-img.jpg";
import { Link } from "react-router-dom";
// import AddGroup from "./component/AddGroup";

function Groups() {
  let history = useHistory();
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    loadGroupData();
  }, [groupData]);

  const loadGroupData = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/group/details`).then((res) => {
        setGroupData(res.data.allGroupData);
      });
    } else {
      window.location = "/";
    }
  };

  const handleUserDocument = () => {
    window.location = "https://www.learndash.com/support/docs/users-groups/";
  };

  return (
    <React.Fragment>
      <SideBar />
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiTypography>
            <AddGrupsDetails />
          </SuiTypography>
          <h4>Groups</h4>
          <div className="group-home-page">
            <span className="material-icons">group_add</span>

            <h3>You don't have any Groups yet</h3>
            <h4>
              Users can be placed into Groups and assigned a Group Leader who
              can
            </h4>
            <h4>
              track the progress and performance of any user in the Groups.
            </h4>
            <button
              className="btn-group align-items-center"
              onClick={() => history.push("/add-group")}
            >
              <span className="group material-icons">group_add</span> &ensp; Add
              your Group
            </button>
          </div>

          <div>
            <Card className="group-documentation">
              <div className="row">
                <div className="col-md-6">
                  <h4>Creating a Group</h4>
                  <img className="img-fluid" alt="groupImg" src={groupImg} />
                </div>
                <div className="col-md-6">
                  <h4>Related help and documentation</h4>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUserDocument()}
                  >
                    User & Group Documentation (only available in English)
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </SuiBox>
        {/* <Footer /> */}
      </DashboardLayout>
    </React.Fragment>
  );
}

export default Groups;
