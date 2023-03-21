// @mui material components
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "config";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import Table from "examples/Table";

import styles from "layouts/project/styles";
import { Card } from "@mui/material";

function EmployerList() {
  const classes = styles();
  const [keyword, setKeyword] = useState("");
  const [employerListData, setEmpolyerListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [employerEmail, setEmployerEmail] = useState([]);

  const columns = [
    { name: "Sr No", align: "center" },
    { name: "Name", align: "center" },
    { name: "Department", align: "center" },
    { name: "Location", align: "center" },
    { name: "Job posted", align: "center" },
    { name: "Follower", align: "center" },
  ];

  const rows = [];
  useEffect(() => {
    loadEmployerDetails();
  }, []);

  const loadEmployerDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}/api/employer-all-details`)
        .then((res) => {
          setEmpolyerListData(res.data.employerDetails);
          setIsLoading(false);
          // setEmployerEmail(res.data.employerDetails.map((i) => i.email));
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      window.location = "/";
    }
  };

  const searched = (key) => (c) => c.displayname.toLowerCase().includes(key);

  if (employerListData.length > 0) {
    employerListData.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        "Sr No": idx + 1,
        Name: item.displayname,
        Department: item.department ? item.department : "-",
        Location: item.location ? item.location : "-",
        "Job posted": item.jobtitle ? item.jobtitle : "0",
        Follower: "1",
      })
    );
  }

  return (
    <div className="mt-2">
      <SuiBox customClass={classes.tables_table}>
        <Card style={{ padding: "15px" }} mt={2}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <div></div>
            <div>
              <SuiInput
                size="medium"
                placeholder="Type here..."
                withIcon={{
                  icon: "search",
                  direction: "left",
                }}
                customClass={classes.navbar_input}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <SuiBox customClass={classes.tables_table}>
            {isLoading ? (
              <div className="text-center">
                <i className="spinner-border"></i>
              </div>
            ) : (
              <Table columns={columns} rows={rows} />
            )}
          </SuiBox>
        </Card>
      </SuiBox>
    </div>
  );
}
export default EmployerList;
