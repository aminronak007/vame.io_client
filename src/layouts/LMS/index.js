// @mui material components
import React, { useEffect, useState } from "react";

// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";

// Data
import { url } from "config";
import axios from "axios";
import CourseCategories from "./component/AddCategories/CourseCategories";
import Sidebar from "./SideBarImport";

function Tables() {
  const [jobDetails, setJobDetails] = useState([]);
  // eslint-disable-next-line
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/listjobs`).then((res) => {
        // console.log(res);
        setJobDetails(res.data.jobDetails);
      });
    } else {
      window.location = "/";
    }
  }, []);
  const rows = [];
  const searched = (key) => (c) => c.jobtitle.toLowerCase().includes(key);

  if (jobDetails.length > 0) {
    jobDetails.filter(searched(keyword)).map((item) =>
      rows.push({
        title: item.jobtitle,
        postedby: item.email,
        skills: item.skills !== "" ? item.skills : "-",
        date: item.createdAt,
        ProjectType: item.hourrate ? "Hourly" : "-",
        status: (
          <SuiBadge
            variant="gradient"
            badgeContent="Published"
            color="success"
            size="extra-small"
          />
        ),
        price: 0,
        action: (
          <SuiTypography
            component="a"
            href="#"
            variant="caption"
            textColor="secondary"
            fontWeight="medium"
          >
            Edit
          </SuiTypography>
        ),
      })
    );
  }

  return (
    <React.Fragment>
      <Sidebar />
      <CourseCategories />
    </React.Fragment>
  );
}

export default Tables;
