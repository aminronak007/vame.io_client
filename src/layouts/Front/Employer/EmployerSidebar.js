import React, { useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import AccountSetting from "./Menulogo/AccountSetting";
import Inbox from "./Menulogo/Inbox";
import ViewProfile from "./Menulogo/ViewProfile";
import Editprofile from "./Menulogo/Editprofile";
import ManageJob from "./Menulogo/ManageJob";
import SavedItem from "./Menulogo/SavedItem";
import Logout from "./Menulogo/Logout";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { url } from "config";
import ReactTooltip from "react-tooltip";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function EmployerSidebar() {
  const [id, setId] = React.useState(null);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [employerDetails, setEmployerDetails] = React.useState("");

  const handlelogout = () => {
    localStorage.removeItem("pwd");
  };

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, []);

  const loadDetails = () => {
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
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((resp) => {
              // console.log("emplo-sidebar", resp.data.employerDetails);
              setEmployerDetails(resp.data.employerDetails);
            });
        });
    } else {
      window.location = "/";
    }
  };

  return (
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
          className="text-decoration-none"
        >
          {employerDetails ? (
            <Avatar src={`${url}/${employerDetails?.profilephoto}`} />
          ) : (
            <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" />
          )}
          <a href="/admin/dashboard" style={{ color: "inherit" }}>
            {employerDetails?.displayname}
          </a>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink
            className="text-decoration-none"
            exact
            to="/employer/inbox"
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
            to="/employer/view-profile"
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
            to={`/employer/edit-profile/${id}`}
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
            to="/employer/account-setting"
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
            to="/employer/managejobs"
            activeClassName="activeClicked"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <CDBSidebarMenuItem data-tip="Manage Job">
                <ManageJob />
                Manage Job
              </CDBSidebarMenuItem>
            </div>
          </NavLink>
          <NavLink
            className="text-decoration-none"
            exact
            to="/employer/courses"
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
            to="/employer/saveditems"
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
          {/* <NavLink
                        className="text-decoration-none"
                        exact
                        to="https://vame.io/pricing/"
                        activeClassName="activeClicked"
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <CDBSidebarMenuItem data-tip="Subscription">
                                <Subscription />
                                Subscription
                            </CDBSidebarMenuItem>
                        </div>
                    </NavLink> */}
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
  );
}
export default EmployerSidebar;
