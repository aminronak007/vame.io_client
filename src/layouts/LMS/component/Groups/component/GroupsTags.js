// @mui material components
import axios from "axios";
import { url } from "config";
import { useEffect, useState } from "react";
import { InputLabel, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import AddGroupsDetails from "../AddGroupsDetails";

function GroupTags() {
  const classes = styles();
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryTableData, setCategoryTableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  // eslint-disable-next-line
  const [categorySearchName, setCategorySearchName] = useState("");

  const columns = [
    { name: "SrNo", align: "center" },
    { name: "name", align: "center" },
    { name: "slug", align: "center" },
    { name: "description", align: "center" },
    { name: "count", align: "center" },
  ];

  const rows = [];

  useEffect(() => {
    axios
      .get(`${url}/api/groups/tags/details`)
      .then((res) => {
        setCategoryTableData(res.data.allGroupTags);
        setCategorySearchName(res.data.allGroupTags.map((i) => i.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryTableData]);

  const handleAddNewCategory = () => {
    let tag = "tags";
    axios
      .post(`${url}/api/groups/add-new-group-tags`, {
        name: categoryName,
        slug: categorySlug,
        description: categoryDescription,
        tags: tag,
      })
      .then((result) => {
        if (result.data.success) {
          toast.success(result.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(result.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const searched = (key) => (c) => c.name.toLowerCase().includes(key);

  if (categoryTableData.length > 0) {
    categoryTableData.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        SrNo: idx + 1,
        name: item.name,
        description: item.description !== "" ? item.description : "-",
        slug: item.slug,
        count: "0",
      })
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiTypography>
          <AddGroupsDetails />
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
                  <h6>Add New Group Tag</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <InputLabel> Name </InputLabel>
                      <SuiInput
                        size="small"
                        placeholder="Name..."
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                      <p style={{ fontSize: "12px", color: "grey" }}>
                        The name is how it appears on your site.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <InputLabel> Slug </InputLabel>
                      <SuiInput
                        size="small"
                        placeholder="Slug..."
                        onChange={(e) => setCategorySlug(e.target.value)}
                      />
                      <p style={{ fontSize: "12px", color: "grey" }}>
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
                        onChange={(e) => setCategoryDescription(e.target.value)}
                      />
                      <p style={{ fontSize: "12px", color: "grey" }}>
                        The description is not prominent by default; however,
                        some themes may show it.
                      </p>
                    </div>
                  </div>
                  <div>
                    <SuiButton color="primary" onClick={handleAddNewCategory}>
                      Add New Group Tag
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
        <ToastContainer />
      </SuiBox>
    </DashboardLayout>
  );
}

export default GroupTags;
