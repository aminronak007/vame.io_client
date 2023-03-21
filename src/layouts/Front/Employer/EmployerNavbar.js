import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { url } from "config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountSetting from "./Menulogo/AccountSetting";
import Inbox from "./Menulogo/Inbox";
import ViewProfile from "./Menulogo/ViewProfile";
import Editprofile from "./Menulogo/Editprofile";
import ManageJob from "./Menulogo/ManageJob";
import SavedItem from "./Menulogo/SavedItem";
import Logout from "./Menulogo/Logout";
import logo from "../../authentication/login/logo/Vlogo.png";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import moment from "moment";

function EmployerNavbar() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isMenuCollapse, setMenuCollapse] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [id, setId] = React.useState(null);
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;
  const [employerDetails, setEmployerDetails] = React.useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          console.log("res", res);
          setId(res.data.id);
          setEmail(res.data.email);
          axios
            .post(`${url}/api/employer/notifications`, {
              email: res.data.email,
            })
            .then((resp) => {
              setNotifications(resp.data.notifications);
            });
          axios
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((resp) => {
              setEmployerDetails(resp.data.employerDetails);
            });
        });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, []);

  let notificationsLength =
    notifications?.length > 0
      ? notifications
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i.seen === false) {
              return elements[index];
            }
          })
          .filter((n) => n).length
      : 0;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuCollapse(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleInbox = () => {
    history.push("/employer/inbox");
  };
  const handleViewProfile = () => {
    history.push("/employer/view-profile");
  };
  const handleEditProfile = () => {
    history.push(`/employer/edit-profile/${id}`);
  };
  const handleAccountSetting = () => {
    history.push("/employer/account-setting");
  };
  const handleManageJobs = () => {
    history.push("/employer/managejobs");
  };
  const handleMyCourses = () => {
    history.push("/employer/courses");
  };
  const handleSavedItems = () => {
    history.push("/employer/saveditems");
  };

  const handleLogut = () => {
    history.push("/");
    localStorage.removeItem("pwd");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      className="user-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleInbox();
        }}
      >
        <Inbox />
        &ensp; Inbox
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleViewProfile();
        }}
      >
        <ViewProfile /> &ensp; View my profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleEditProfile();
        }}
      >
        <AccountSetting />
        &ensp; Edit my profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleAccountSetting();
        }}
      >
        <Editprofile />
        &ensp; Account Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleManageJobs();
        }}
      >
        <ManageJob />
        &ensp; Manage Jobs
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleMyCourses();
        }}
      >
        <LibraryBooksIcon />
        &ensp; My Courses
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleSavedItems();
        }}
      >
        <SavedItem />
        &ensp; Favourites
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogut();
        }}
      >
        <Logout />
        &ensp; Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      className="user-menu"
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={7} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {employerDetails ? (
            <Avatar src={`${url}/${employerDetails?.profilephoto}`} />
          ) : (
            "<AccountCircle />"
          )}
        </IconButton>
        <p style={{ textTransform: "capitalize" }}>
          {employerDetails?.displayname}
        </p>
      </MenuItem>
    </Menu>
  );

  const handleNotifications = async () => {
    await axios.post(`${url}/api/employer/seen/notifications`, { email });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {/* eslint-disable-next-line */}
              <img src={logo} height="50" width="50" />
              {/* eslint-disable-next-line */}
              <a className="navbar-brand">Vame</a>
              <div className="d-flex flex-grow-1 justify-content-end">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded={isMenuCollapse}
                  aria-label="Toggle navigation"
                  onClick={(e) => {
                    setMenuCollapse(!isMenuCollapse);
                    !isMenuCollapse && handleMenuClose();
                  }}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div
                className={`navbar-collapse ${
                  isMenuCollapse ? "" : "collapse"
                }`}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li style={{ cursor: "pointer" }} className={"nav-item"}>
                    <NavLink to="/employer/dashboard" className={"nav-link"}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li style={{ cursor: "pointer" }} className={"nav-item"}>
                    <NavLink to="/employer/postjob" className={"nav-link"}>
                      Post a Job
                    </NavLink>
                  </li>
                  <li style={{ cursor: "pointer" }} className={"nav-item"}>
                    <NavLink className={"nav-link"} to="/employer-dashboard">
                      Our Virtual Assistance
                    </NavLink>
                  </li>
                  <li style={{ cursor: "pointer" }} className={"nav-item"}>
                    <NavLink className={"nav-link"} to="/employer/academy">
                      Vame Academy
                    </NavLink>
                  </li>
                  <li style={{ cursor: "pointer" }} className={"nav-item"}>
                    <NavLink className={"nav-link"} to="/how-its-work">
                      How it works
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link">Pricing</a>
                  </li> */}
                </ul>
              </div>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                <div onClick={() => handleNotifications()} className="dropdown">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    className="dropbtn"
                    onClick={() => setOpen(!open)}
                  >
                    <Badge badgeContent={notificationsLength} color="error">
                      <NotificationsIcon style={{ fontSize: "large" }} />
                    </Badge>
                  </IconButton>
                  {open === true ? (
                    <div className="dropdown-content">
                      <div className="container p-1">
                        {notifications?.length ? (
                          notifications?.map((i, index) => {
                            return (
                              <React.Fragment key={`key${index}`}>
                                {index <= 4 ? (
                                  <div className="border-bottom">
                                    <p style={{ fontSize: "13px" }}>
                                      {i.notificationMessage}{" "}
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "	#808080",
                                        }}
                                      >
                                        (
                                        {moment(i.timeDate)
                                          .startOf("hour")
                                          .fromNow()}
                                        )
                                      </span>
                                    </p>
                                  </div>
                                ) : null}
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <div className="border-bottom">
                            <p style={{ fontSize: "13px" }}>
                              You don't have any unseen Notifications.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <Link
                          style={{ fontSize: "13px" }}
                          to="/employer/notifications"
                        >
                          See More
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>

                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {employerDetails ? (
                    <Avatar src={`${url}/${employerDetails?.profilephoto}`} />
                  ) : (
                    // <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" />
                    <AccountCircle />
                  )}
                  &nbsp;
                  <span
                    style={{ textTransform: "capitalize" }}
                    className="nav-displayname"
                  >
                    {employerDetails?.displayname}
                  </span>
                </IconButton>
              </Box>
              {/* <Box sx={{ display: { xs: "none", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box> */}
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </nav>
    </div>
  );
}
export default EmployerNavbar;
