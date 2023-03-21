// @mui material components
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "config";
import { InputLabel, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Table from "examples/Table";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// Custom styles for the Tables
import styles from "layouts/project/styles";

// Data
import AddProjectDetails from "./AddProjectDetails";

function ProjectExperience() {
  const classes = styles();
  const [projectExperienceName, setProjectExperienceName] = useState("");
  const [projectExperienceSlug, setProjectExperienceSlug] = useState("");
  const [projectExperienceDescription, setProjectExperienceDescription] =
    useState("");
  // eslint-disable-next-line
  const [projectExperienceData, setProjectExperienceData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [projectExperienceTableData, setProjectExperienceTableData] = useState(
    []
  );

  const columns = [
    { name: "SrNo", align: "center" },
    { name: "name", align: "center" },
    { name: "description", align: "center" },
    { name: "slug", align: "center" },
    { name: "count", align: "center" },
  ];

  const rows = [];

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}/api/projectexperiences`)
        .then((res) => {
          setProjectExperienceTableData(res.data.projectExperienceData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location = "/";
    }
  }, []);

  const handleAddNewProjectExperience = () => {
    axios
      .post(`${url}/api/projectExperience`, {
        name: projectExperienceName,
        slug: projectExperienceSlug,
        description: projectExperienceDescription,
      })
      .then((result) => {
        setProjectExperienceData(result);
      });
  };

  const searched = (key) => (c) => c.name.toLowerCase().includes(key);

  if (projectExperienceTableData.length > 0) {
    projectExperienceTableData.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        SrNo: idx + 1,
        name: item.name,
        description: item.description !== "" ? item.description : "-",
        slug: item.slug,
        count: "1",
      })
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiTypography>
          <AddProjectDetails />
        </SuiTypography>
        <SuiBox mb={3}>
          <Card>
            <SuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SuiTypography pt={2} variant="h4">
                <form>
                  <h6>Add New Project Experience</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <InputLabel> Name </InputLabel>
                      <SuiInput
                        size="small"
                        placeholder="Name..."
                        onChange={(e) =>
                          setProjectExperienceName(e.target.value)
                        }
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                        }}
                      >
                        The name is how it appears on your site.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <InputLabel> Slug </InputLabel>
                      <SuiInput
                        size="small"
                        placeholder="Slug..."
                        onChange={(e) =>
                          setProjectExperienceSlug(e.target.value)
                        }
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                        }}
                      >
                        The “slug” is the URL-friendly version of the name. It
                        is usually all lowercase and contains only letters,
                        numbers, and hyphens.
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <InputLabel> Description</InputLabel>
                      <TextareaAutosize
                        minRows="3"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          setProjectExperienceDescription(e.target.value)
                        }
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                        }}
                      >
                        The description is not prominent by default; however,
                        some themes may show it.
                      </p>
                    </div>
                  </div>
                  <div>
                    <SuiButton
                      backgroundColor="#2152ff"
                      onClick={(e) => handleAddNewProjectExperience(e)}
                    >
                      Add New Project Experience
                    </SuiButton>
                  </div>
                </form>
              </SuiTypography>
            </SuiBox>
          </Card>
        </SuiBox>
        <Card style={{ padding: "15px" }} mt={2}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <div>
              {/* <select className="control w-30 h-20">
                <option>Bulk action</option>
                <option>Edit</option>
                <option>Move to Tarsh</option>
              </select>{" "}
              &ensp;
              <Button style={{ textTransform: "none" }}>Apply</Button> */}
            </div>
            <div>
              <SuiInput
                size="medium"
                placeholder="Type here..."
                withIcon={{ icon: "search", direction: "left" }}
                customClass={classes.navbar_input}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns} rows={rows} />
          </SuiBox>
        </Card>
      </SuiBox>
    </DashboardLayout>
  );
}

export default ProjectExperience;
