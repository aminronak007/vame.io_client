// @mui material components
import axios from "axios";
import { url } from "config";
import { useEffect, useState } from "react";
import { Grid, InputLabel, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

function Tags() {
  const classes = styles();
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryPerent, setCategoryPerent] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryTableData, setCategoryTableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categorySearchName, setCategorySearchName] = useState("");

  //   console.log(categorySearchName, categorySearchName);
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
      .get(`${url}/api/groups/details`)
      .then((res) => {
        setCategoryTableData(res.data.allGroupData);
        setCategorySearchName(res.data.allGroupData.map((i) => i.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryTableData]);

  const handleAddNewCategory = () => {
    axios
      .post(`${url}/api/groups/add-new-group-category`, {
        name: categoryName,
        slug: categorySlug,
        perentCategory: categoryPerent,
        description: categoryDescription,
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
                  <h6>Add New Group Category</h6>
                  <div className="row">
                    <div className="col">
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
                    <div className="col">
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
                    <div className="col">
                      <InputLabel> Parent Group Category </InputLabel>
                      <div className="form-group">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          onChange={(e) => setCategoryPerent(e.target.value)}
                        >
                          <option value="none">None</option>
                          {categoryTableData.length > 0
                            ? categoryTableData.map((item, index) => (
                                <option key={`key${index}`} value={index}>
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                      <p style={{ fontSize: "12px", color: "grey" }}>
                        Assign a parent term to create a hierarchy. The term
                        Jazz, for example, would be the parent of Bebop and Big
                        Band.
                      </p>
                    </div>
                  </div>
                  <div>
                    <SuiButton color="primary" onClick={handleAddNewCategory}>
                      Add New Group Category
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

export default Tags;
