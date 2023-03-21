// Soft UI Dashboard React layouts
import Project from "layouts/project";
import LMS from "layouts/LMS";
import AdminEmployer from "layouts/AdminEmployer";
import AdminFreelancer from "layouts/AdminFreelancer";

// Soft UI Dashboard React icons
import Office from "examples/Icons/Office";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Projects",
    key: "project",
    route: "/project",
    icon: <Office size="12px" />,
    component: Project,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "LearnDash LMS",
    key: "course-categories",
    route: "/course-categories",
    icon: <CreditCard size="12px" />,
    component: LMS,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Employers",
    key: "employer",
    route: "/employer",
    icon: <Cube size="12px" />,
    component: AdminEmployer,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Freelancers",
    key: "freelancer",
    route: "/freelancer",
    icon: <Cube size="12px" />,
    component: AdminFreelancer,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: RTL,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: Profile,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: SignIn,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: SignUp,
  //   noCollapse: true,
  // },
];

export default routes;
