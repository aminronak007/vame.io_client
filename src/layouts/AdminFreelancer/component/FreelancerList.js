// @mui material components
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "config";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import Table from "examples/Table";

import styles from "layouts/project/styles";
import { Card } from "@mui/material";

function FreelancerList() {
  const classes = styles();
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [freelancerListData, setFreelancerListData] = useState([]);

  const columns = [
    { name: "Sr No", align: "center" },
    { name: "Title", align: "center" },
    { name: "Job posted", align: "center" },
    // { name: "Skills", align: "center" },
    { name: "Location", align: "center" },
    // { name: "Reviews", align: "center" },
    // { name: "Reviews", align: "center" },
    // { name: "EarningAmount", align: "center" },
  ];

  const rows = [];

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}/api/freelancer-videos`)
        .then((res) => {
          setFreelancerListData(res.data.freelancerDetails);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      window.location = "/";
    }
  }, []);

  const searched = (key) => (c) => c.displayname?.toLowerCase()?.includes(key);

  if (freelancerListData.length > 0) {
    freelancerListData.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        "Sr No": idx + 1,
        Title: item.displayname,
        "Job posted": item.jobtitle ? item.jobtitle : "0",
        Location: item.location ? item.location : "-",
        EarningAmount: "1",
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
export default FreelancerList;
