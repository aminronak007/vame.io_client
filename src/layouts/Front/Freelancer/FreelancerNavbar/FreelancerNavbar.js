import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ManageJob from "./Menulogo/ManageJob";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import AccountSetting from "./Menulogo/AccountSetting";
import Inbox from "./Menulogo/Inbox";
import ViewProfile from "./Menulogo/ViewProfile";
import Editprofile from "./Menulogo/Editprofile";
import SavedItem from "./Menulogo/SavedItem";
import Logout from "./Menulogo/Logout";
import logo from "../../../authentication/login/logo/Vlogo.png";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "config";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import moment from "moment";

function FreelancerNavbar() {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [isMenuCollapse, setMenuCollapse] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState("");
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [freelancerDetails, setFreelancerDetails] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setId(res.data.id);
          setEmail(res.data.email);
          axios
            .post(`${url}/api/freelancer/notifications1`, {
              email: res.data.email,
            })
            .then((resp) => {
              setNotifications(resp.data.notifications);
            });
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((resp) => {
              setFreelancerDetails(resp.data.freelancerDetails);
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
    history.push("/freelancer/inbox");
  };
  const handleViewProfile = () => {
    history.push(`/freelancer/view-profile/${id}`);
  };
  const handleEditProfile = () => {
    history.push(`/freelancer/edit-profile/${id}`);
  };
  const handleAccountSetting = () => {
    history.push("/freelancer/account-setting");
  };
  const handleMyProjects = () => {
    history.push("/freelancer/myprojects");
  };
  const handleMyCourses = () => {
    history.push("/freelancer/courses");
  };
  const handleSavedItems = () => {
    history.push("/freelancer/saveditems");
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
          handleMyProjects();
        }}
      >
        <ManageJob />
        &ensp; My Project
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
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
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
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {freelancerDetails ? (
            <Avatar src={`${url}/${freelancerDetails?.profilephoto}`} />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <p style={{ textTransform: "capitalize" }}>
          {freelancerDetails?.displayname}
        </p>
      </MenuItem>
    </Menu>
  );

  const handleNotifications = async () => {
    await axios.post(`${url}/api/freelancer/notifications`, { email });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <img src={logo} height="50" width="50" alt="logo" />
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
              {/* <div className="navBarDisplay"> */}
              <div
                className={`navbar-collapse ${
                  isMenuCollapse ? "" : "collapse"
                }`}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink to="/freelancer/dashboard" className={"nav-link"}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/freelancer/search-projects"
                      className={"nav-link"}
                    >
                      Check our Job
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/freelancer/academy" className={"nav-link"}>
                      Get Certified
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    {/* <a className="nav-link">Invite Friends</a> */}
                  </li>
                  <li className="nav-item">
                    <NavLink to="/how-its-work" className={"nav-link"}>
                      How it works
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Box sx={{ display: { xs: "flex", md: "flex" } }}>
                {/* <div className="dropdown">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={
                      notificationsCount === 0 ? null : handleNotifications
                    }
                    // data-tip="You don't have Notifications."
                  >
                    <Badge badgeContent={notificationsCount} color="error">
                      <NotificationsIcon style={{ fontSize: "large" }} />
                    </Badge>
                    <div className="dropdown-content">
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                      <a href="#">Link 3</a>
                    </div>
                  </IconButton>
                </div> */}

                <div onClick={() => handleNotifications()} className="dropdown">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    className="dropbtn"
                    onClick={() => {
                      setOpen(!open);
                    }}
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
                              <React.Fragment>
                                {index <= 4 ? (
                                  <div
                                    className="border-bottom"
                                    key={`key${index}`}
                                  >
                                    <p style={{ fontSize: "13px" }}>
                                      {i.notificationMessage}
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
                              You don't have any Notifications.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <Link
                          style={{ fontSize: "13px" }}
                          to="/freelancer/notifications"
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
                  {freelancerDetails ? (
                    <Avatar src={`${url}/${freelancerDetails?.profilephoto}`} />
                  ) : (
                    <AccountCircle />
                  )}{" "}
                  &nbsp;
                  <span
                    style={{ textTransform: "capitalize" }}
                    className="nav-displayname"
                  >
                    {" "}
                    {freelancerDetails?.displayname}
                  </span>
                </IconButton>
              </Box>

              {/* </div> */}
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
export default FreelancerNavbar;
