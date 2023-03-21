import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import AccountSetting from "../FreelancerNavbar/Menulogo/AccountSetting";
import Inbox from "../FreelancerNavbar//Menulogo/Inbox";
import ViewProfile from "../FreelancerNavbar//Menulogo/ViewProfile";
import Editprofile from "../FreelancerNavbar//Menulogo/Editprofile";
import ManageJob from "../FreelancerNavbar/Menulogo/ManageJob";
import SavedItem from "../FreelancerNavbar//Menulogo/SavedItem";
import Logout from "../FreelancerNavbar//Menulogo/Logout";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { url } from "config";
import ReactTooltip from "react-tooltip";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function FreelancerSideber() {
  const [id, setId] = React.useState(null);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [freelancerDetails, setFreelancerDetails] = React.useState("");

  const handlelogout = () => {
    localStorage.removeItem("pwd");
  };

  React.useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setId(res.data.id);
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((resp) => {
              // console.log("free-sidebar", resp.data.freelancerDetails);
              setFreelancerDetails(resp.data.freelancerDetails);
            });
        });
    } else {
      window.location = "/";
    }

    /* eslint-disable-next-line */
  }, []);

  return (
    <div>
      <CDBSidebar
        position="fixed"
        top="0"
        textColor="#fff"
        backgroundColor="#000"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {freelancerDetails ? (
              <Avatar src={`${url}/${freelancerDetails?.profilephoto}`} />
            ) : (
              <Avatar />
            )}
            <a
              href={`/freelancer/view-profile/${id}`}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              {freelancerDetails?.displayname}
            </a>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              className="text-decoration-none"
              exact
              to="/freelancer/inbox"
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="Inbox">
                  <Inbox />
                  Inbox
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to={`/freelancer/view-profile/${id}`}
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="View my Profile">
                  <ViewProfile /> View my Profile
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to={`/freelancer/edit-profile/${id}`}
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="Edit my Profile">
                  <AccountSetting />
                  Edit my Profile
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to="/freelancer/account-setting"
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="Account Setting">
                  <Editprofile />
                  Account Setting
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to="/freelancer/myprojects"
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="My Project">
                  <ManageJob />
                  My Project
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to="/freelancer/courses"
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="My Courses">
                  <LibraryBooksIcon />
                  My Courses
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to="/freelancer/saveditems"
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem data-tip="Favourites">
                  <SavedItem />
                  Favourites
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <NavLink
              className="text-decoration-none"
              exact
              to="/"
              activeClassName="activeClicked"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CDBSidebarMenuItem
                  onClick={() => handlelogout()}
                  data-tip="Logout"
                >
                  <Logout />
                  Logout
                </CDBSidebarMenuItem>
              </div>
            </NavLink>
            <ReactTooltip textColor="black" type="light" effect="float" />
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}
export default FreelancerSideber;
