import React from "react";
import { useState, useEffect } from "react";

// react-router components
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

// @mui material components
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Dashboard from "layouts/dashboard";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from "context";

// import FreelancerNavbar from "layouts/Front/Freelancer/FreelancerNavbar/FreelancerNavbar";
// import EmployerNavbar from "layouts/Front/Employer/EmployerNavbar";
import Categories from "layouts/project/component/Categories";
import FreelancerTypes from "layouts/project/component/FreelancerTypes";
import Languages from "layouts/project/component/Languages";
import Locations from "layouts/project/component/Locations";
import Projectduration from "layouts/project/component/Projectduration";
import Projectlevels from "layouts/project/component/Projectlevels";
import Proposals from "layouts/project/component/Proposals";
import Skills from "layouts/project/component/Skills";
import ProjectExperience from "layouts/project/component/ProjectExperience";
import { GlobalState } from "./contextState/GlobalState";
import Login from "layouts/authentication/login/Login";
import Authentication from "layouts/authentication/login/Authentication";
import ResetPage from "layouts/authentication/login/ResetPage";
import OurVirtualAssistance from "layouts/Front/Employer/OurVirtualAssistance";
import PostaJob from "layouts/Front/Employer/PostaJob";
import EmployerViewProfile from "layouts/Front/Employer/EmployerViewProfile";
import SavedItems from "layouts/Front/Employer/SavedItems";
import FreelancerHome from "layouts/Front/Freelancer/FreelancerHome/FreelancerHome";
import EditProfile from "layouts/Front/Freelancer/EditProfile/EditProfile";
import ViewProfiles from "layouts/Front/Freelancer/ViewProfile/ViewProfiles";
import SavedItem from "layouts/Front/Freelancer/SavedItem/SavedItems";
import FreelancerAccountSetting from "layouts/Front/Freelancer/AccountSeting/FreelancerAccountSetting";
import EmployerAccountSetting from "layouts/Front/Employer/EmployerAccountSetting";
import EmployerEditProfile from "layouts/Front/Employer/EmployerEditProfile";
import ResetPassword from "layouts/authentication/login/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FreelancerProfilePage from "layouts/Front/Employer/FeelancerProfilePage";
import "./App.css";
import ManageJobs from "layouts/Front/Employer/ManageJobs";
import { SingleJobPage } from "layouts/Front/Freelancer/SingleJobsPage/SingleJobPage";
import Messenger from "layouts/Chat/messenger/Messenger";
import FreelancerProject from "layouts/Front/Freelancer/MyProject/FreelancerProjects";
import EmployerDeletedAccounts from "layouts/AdminEmployer/component/DeletedAccounts";
import FreelancerDeletedAccounts from "layouts/AdminFreelancer/component/DeletedAccounts";
import Academy from "layouts/Front/Freelancer/LMS/Academy/Academy";
import Course from "layouts/LMS/component/AddCourse/Courses";
import EditCourseCategory from "layouts/LMS/component/AddCategories/component/editCourseCategory";
import EditCourse from "layouts/LMS/component/AddCourse/components/editCourse";
import SingleCourses from "layouts/Front/Freelancer/LMS/SingleCourse/SingleCourses";
import LearnCourse from "layouts/Front/Freelancer/LMS/LearnCourse/LearnCourse";
import Privacy from "layouts/Front/Freelancer/FreelancerFooter/UsefulLink/Privacy";
import TermandCondition from "layouts/Front/Freelancer/FreelancerFooter/UsefulLink/TermandCondition";
import Quiz from "layouts/LMS/component/AddQuize/Quiz";
import EditQuiz from "layouts/LMS/component/AddQuize/component/EditQuiz";
import EmployerAcademy from "layouts/Front/Employer/LMS/Academy/EmployerAcademy";
import EmployerSingleCourse from "layouts/Front/Employer/LMS/SingleCourse/EmployerSingleCourse";
import EmployerLearnCourse from "layouts/Front/Employer/LMS/LearnCourse/EmployerLearnCourse";
import FreelancerSingleQuiz from "layouts/Front/Freelancer/LMS/SingleQuiz/SingleQuiz";
import EmployerSingleQuiz from "layouts/Front/Employer/LMS/SingleQuiz/SingleQuiz";
import EmployerCheckout from "layouts/Front/Employer/Checkout/Checkout";
import EmployerPayment from "./layouts/Front/Employer/Payment/Payment";
import EmployerOrderStatus from "./layouts/Front/Employer/Payment/OrderStatus";

import FreelancerCheckout from "layouts/Front/Freelancer/Checkout/Checkout";
import FreelancerPayment from "./layouts/Front/Freelancer/Payment/Payment";
import FreelancerOrderStatus from "./layouts/Front/Freelancer/Payment/OrderStatus";
import EmployerCoursePurchases from "./layouts/Front/Employer/LMS/CoursePurchases/CoursePurchases";
import FreelancerCoursePurchases from "./layouts/Front/Freelancer/LMS/CoursePurchases/CoursePurchases";
import Reports from "./layouts/LMS/component/Reports/Reports";
import Transaction from "layouts/LMS/component/Reports/Transaction/Transaction";
import Groups from "layouts/LMS/component/Groups/Groups";
import EmployerCertificate from "layouts/Front/Employer/LMS/Certificate/Certificate";
import FreelancerCertificate from "layouts/Front/Freelancer/LMS/Certificate/Certificate";
import GroupCategory from "layouts/LMS/component/Groups/component/GroupCategory";
import GroupsTags from "layouts/LMS/component/Groups/component/GroupsTags";
import CategoriesOfGroup from "layouts/LMS/component/Groups/component/CategoriesOfGroup";
import ProjectPayment from "layouts/Front/Employer/ProjectPayment/ProjectPayment";
import ReleaseProjectPayment from "layouts/Front/Freelancer/ReleaseProjectPayment/ReleaseProjectPayment";
import AddGroup from "layouts/LMS/component/Groups/component/AddGroup";
import EmployerTransaction from "layouts/AdminEmployer/component/EmployerTransaction";
import FreelancerTransaction from "layouts/AdminFreelancer/component/FreelancerTransaction";
import LMSSettings from "layouts/LMS/component/Setting/LMSSettings";
import FreelancerPaypalCancel from "layouts/Front/Freelancer/Payment/Components/PaypalCancel";
import EmployerPaypalCancel from "layouts/Front/Employer/Payment/Components/PaypalCancel";
import HowItsWork from "layouts/Front/HowitWorks/HowItsWork";
import FreelancerDashboard from "layouts/Front/Freelancer/Dashboard/FreelancerDashboard";
import EmployerDashboard from "layouts/Front/Employer/Dashboard/EmployerDashboard";
import FreelancerNotifications from "layouts/Front/Freelancer/Notifications/Notifications";
import EmployerNotifications from "layouts/Front/Employer/Notifications/Notifications";
// import axios from "axios";
// import { url } from "config";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { direction, layout, openConfigurator } = controller;
  // let token = localStorage.getItem("pwd");
  // let authorization = `Bearer ${token}`;
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   loadUser();
  //   // eslint-disable-next-line
  // }, []);

  // const loadUser = () => {
  //   axios
  //     .get(`${url}`, {
  //       headers: {
  //         authorization,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //     });
  // };
  const { pathname } = useLocation();

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const [sendemail, setSendEmail] = useState("");
  const [user_id, setUser_Id] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [employerCourseDetails, setEmployerCourseDetails] = useState({});

  const [cname, setCName] = useState("");
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            component={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      backgroundColor="white"
      boxShadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      customClass="cursor-pointer"
      onClick={handleConfiguratorOpen}
    >
      <Icon className=" text-dark" fontSize="default">
        settings
      </Icon>
    </SuiBox>
  );
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <React.Fragment>
            {pathname === "/project" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/categories" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/skills" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/location" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/languages" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/projectlevals" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/projectexperience" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/projectduration" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/freelancertype" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/proposals" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/employer" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/employers/deleted" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/freelancer" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/freelancer/deleted" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/add-group" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/groups/group-categories" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/groups/group-tags" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/groups/categories" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/employer/transaction-history" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/freelancer/transaction-history" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : pathname === "/lms/settings" ? (
              <React.Fragment>
                <Sidenav routes={routes} />
                {configsButton}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
        <Switch>
          <GlobalState.Provider
            value={{
              sendemail,
              setSendEmail,
              user_id,
              setUser_Id,
              cname,
              setCName,
              courseDetails,
              setCourseDetails,
              employerCourseDetails,
              setEmployerCourseDetails,
            }}
          >
            {getRoutes(routes)}
            <Route exact path="/soft-ui-dashboard-react">
              <Redirect from="/soft-ui-dashboard-react" to="/" />
            </Route>
            {/* {user.startas === "Virtual Assistant" ? (
              <FreelancerNavbar />
            ) : user.startas === "Employer" ? (
              <EmployerNavbar />
            ) : null} */}
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/authentication">
              <Authentication />
            </Route>
            <Route exact path="/resetpage">
              <ResetPage />
            </Route>
            <Route exact path="/resetpassword/:id">
              <ResetPassword />
            </Route>
            {/* -----------------------------------------admin routes------------------ */}
            <Route exact path="/dashboard">
              {localStorage.getItem("pwd") ? <Dashboard /> : <Login />}
            </Route>
            <Route exact path="/categories">
              <Categories />
            </Route>
            <Route exact path="/freelancertype">
              <FreelancerTypes />
            </Route>
            <Route exact path="/languages">
              <Languages />
            </Route>
            <Route exact path="/location">
              <Locations />
            </Route>
            <Route exact path="/proposals">
              <Proposals />
            </Route>
            <Route exact path="/projectduration">
              <Projectduration />
            </Route>
            <Route exact path="/projectlevals">
              <Projectlevels />
            </Route>
            <Route exact path="/projectexperience">
              <ProjectExperience />
            </Route>
            <Route exact path="/skills">
              <Skills />
            </Route>
            <Route exact path="/employer/transaction-history">
              <EmployerTransaction />
            </Route>
            <Route exact path="/freelancer/transaction-history">
              <FreelancerTransaction />
            </Route>
            <Route exact path="/employers/deleted">
              <EmployerDeletedAccounts />
            </Route>
            <Route exact path="/freelancer/deleted">
              <FreelancerDeletedAccounts />
            </Route>
            {/* -------------------------------------------Courses Routes--------- */}
            <Route exact path="/view-add/courses">
              <Course />
            </Route>
            <Route exact path="/edit/course-category/:slug">
              <EditCourseCategory />
            </Route>
            <Route exact path="/edit/course/:slug">
              <EditCourse />
            </Route>
            {/* -------------------------------------------Courses Routes--------- */}
            {/* ---------------------------Repotrs routes------------------------------ */}
            <Route exact path="/reports">
              <Reports />
            </Route>
            <Route exact path="/transactions">
              <Transaction />
            </Route>
            {/* ---------------------------Repotrs routes------------------------------ */}

            {/* ---------------------------settings routes------------------------------ */}
            <Route exact path="/lms/settings">
              <LMSSettings />
            </Route>
            {/* ---------------------------settings routes------------------------------ */}

            {/* -------------------------------Gruop routes------------------------------- */}
            <Route exact path="/groups">
              <Groups />
            </Route>
            <Route exact path="/add-group">
              <AddGroup />
            </Route>
            <Route exact path="/groups/group-categories">
              <GroupCategory />
            </Route>
            <Route exact path="/groups/group-tags">
              <GroupsTags />
            </Route>
            <Route exact path="/groups/categories">
              <CategoriesOfGroup />
            </Route>
            <Route exact path="/groups/tags">
              <Groups />
            </Route>

            {/* -------------------------------Gruop routes------------------------------- */}
            {/* -------------------------------------------employer router--------- */}

            <Route exact path="/employer-dashboard">
              <OurVirtualAssistance />
            </Route>
            <Route exact path="/employer/postjob">
              <PostaJob />
            </Route>
            <Route exact path="/employer/managejobs">
              <ManageJobs />
            </Route>
            <Route exact path="/employer/inbox">
              <Messenger />
            </Route>
            <Route exact path="/employer/edit-profile/:id">
              <EmployerEditProfile />
            </Route>
            <Route exact path="/employer/account-setting">
              <EmployerAccountSetting />
            </Route>
            <Route exact path="/employer/courses">
              <EmployerCoursePurchases />
            </Route>
            <Route exact path="/employer/saveditems">
              <SavedItems />
            </Route>
            <Route exact path="/employer/view-profile">
              <EmployerViewProfile />
            </Route>
            <Route exact path="/employer/FreelancerProfilePage/:id">
              <FreelancerProfilePage />
            </Route>
            <Route exact path="/edit/job/:id"></Route>
            <Route exact path="/employer/academy">
              <EmployerAcademy />
            </Route>
            <Route exact path="/employer/course/:slug">
              <EmployerSingleCourse />
            </Route>
            <Route exact path="/employer/lessons/:cslug/:slug">
              <EmployerLearnCourse />
            </Route>
            <Route exact path="/employer/project/payment/:id">
              <ProjectPayment />
            </Route>

            {/* -------------------------------------------Quiz Routes--------- */}
            <Route exact path="/quiz">
              <Quiz />
            </Route>
            <Route exact path="/edit/quiz/:slug">
              <EditQuiz />
            </Route>
            <Route exact path="/employer/quizzes/:qslug">
              <EmployerSingleQuiz />
            </Route>
            <Route exact path="/employer/checkout/:slug">
              <EmployerCheckout />
            </Route>
            <Route exact path="/employer/payment/:id">
              <EmployerPayment />
            </Route>
            <Route exact path="/employer/order/:id">
              <EmployerOrderStatus />
            </Route>

            <Route exact path="/employer/order/cancel/:id">
              <EmployerPaypalCancel />
            </Route>
            <Route exact path="/employer/certificate/:id">
              <EmployerCertificate />
            </Route>

            <Route exact path="/employer/dashboard">
              <EmployerDashboard />
            </Route>

            <Route exact path="/employer/notifications">
              <EmployerNotifications />
            </Route>
            {/* -------------------------------------------Quiz Routes--------- */}
            {/* -------------------------------------------Freelancer router--------- */}
            {/* -------------------------------------------Quiz Routes--------- */}
            <Route exact path="/freelancer/quizzes/:qslug">
              <FreelancerSingleQuiz />
            </Route>
            <Route exact path="/freelancer/checkout/:slug">
              <FreelancerCheckout />
            </Route>
            <Route exact path="/freelancer/payment/:id">
              <FreelancerPayment />
            </Route>
            <Route exact path="/freelancer/order/:id">
              <FreelancerOrderStatus />
            </Route>
            <Route exact path="/freelancer/order/cancel/:id">
              <FreelancerPaypalCancel />
            </Route>
            {/* -------------------------------------------Quiz Routes--------- */}
            <Route exact path="/freelancer/search-projects">
              <FreelancerHome />
            </Route>
            <Route exact path="/freelancer/edit-profile/:id">
              <EditProfile />
            </Route>
            <Route exact path="/freelancer/account-setting">
              <FreelancerAccountSetting />
            </Route>
            <Route exact path="/freelancer/view-profile/:id">
              <ViewProfiles />
            </Route>
            <Route exact path="/freelancer/inbox">
              <Messenger />
            </Route>
            <Route exact path="/freelancer/saveditems">
              <SavedItem />
            </Route>
            <Route exact path="/freelancer/myprojects">
              <FreelancerProject />
            </Route>
            <Route exact path="/freelancer/courses">
              <FreelancerCoursePurchases />
            </Route>
            <Route exact path="/freelancer/certificate/:id">
              <FreelancerCertificate />
            </Route>
            <Route exact path="/freelancer/release/payment/:slug/:id">
              <ReleaseProjectPayment />
            </Route>

            <Route exact path="/freelancer/view-job/:slug">
              <SingleJobPage />
            </Route>

            <Route exact path="/freelancer/dashboard">
              <FreelancerDashboard />
            </Route>

            <Route exact path="/freelancer/notifications">
              <FreelancerNotifications />
            </Route>

            <Route exact path="/freelancer/academy">
              <Academy />
            </Route>
            <Route exact path="/course/:slug">
              <SingleCourses />
            </Route>
            <Route exact path="/lessons/:cslug/:slug">
              <LearnCourse />
            </Route>
            <Route exact path="/how-its-work">
              <HowItsWork />
            </Route>
            <Route exact path="/privacy">
              <Privacy />
            </Route>
            <Route exact path="/terms-condition">
              <TermandCondition />
            </Route>
          </GlobalState.Provider>
        </Switch>
      </ThemeProvider>
      <ToastContainer />
    </StyledEngineProvider>
  );
}
