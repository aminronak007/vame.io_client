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

function CategoriesOfGroup() {
  const classes = styles();
  // const { columns, rows } = CategoryTableData;
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryPerent, setCategoryPerent] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  // eslint-disable-next-line
  const [categoryIconSelect, setCategoryIconSelect] = useState("");
  const [categoryIcon, setCategoryIcon] = useState([]);
  // eslint-disable-next-line
  const [categoryData, setCategoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoryTableData, setCategoryTableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  // eslint-disable-next-line
  const [categorySearchName, setCategorySearchName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const columns = [
    { name: "SrNo", align: "center" },
    { name: "name", align: "left" },
    { name: "description", align: "left" },
    { name: "slug", align: "left" },
    { name: "count", align: "center" },
  ];

  const rows = [];

  useEffect(() => {
    axios.post(`${url}/api/icons`).then((result) => {
      setCategoryIcon(result.data.iconsList);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/api/categories`)
      .then((res) => {
        setCategoryTableData(res.data.categoryData);
        setCategorySearchName(res.data.categoryData.map((i) => i.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryTableData]);
  // eslint-disable-next-line
  const handleCategoryIcon = (e) => {
    setCategoryIconSelect(e.target.value);
  };

  const handleAddNewCategory = () => {
    axios
      .post(`${url}/api/category`, {
        name: categoryName,
        slug: categorySlug,
        perentCategory: categoryPerent,
        description: categoryDescription,
        categoryIcon: selectedImage,
      })
      .then((result) => {
        setCategoryData(result);
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

  const handleClick = (e) => {
    setSelectedImage(categoryIcon.find((i, id) => i === e) ? e : "");
  };

  // // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const searched = (key) => (c) => c.name.toLowerCase().includes(key);

  if (categoryTableData.length > 0) {
    categoryTableData.filter(searched(keyword)).map((item, idx) =>
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
                  <h6>Add New Category</h6>
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
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
                    <div className="col-md-4 col-sm-6">
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
                    <div className="col-md-4 col-sm-6">
                      <InputLabel> Parent Category </InputLabel>
                      <div className="form-group">
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
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

                  <div className="row">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                      <InputLabel variant="h5"> Category Icon</InputLabel>
                      <div style={{ display: "flex" }}>
                        {selectedImage && (
                          <div>
                            <span className="material-icons">
                              {selectedImage}
                            </span>
                            <Button onClick={removeSelectedImage}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#000000"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                              </svg>
                            </Button>
                          </div>
                        )}
                      </div>
                      <div>
                        <Button onClick={handleOpen}>Add Icon</Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                id="modal-modal-title"
                                variant="h4"
                                component="h2"
                              >
                                Icons
                              </Typography>
                              <Button onClick={handleClose}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 0 24 24"
                                  width="24px"
                                  fill="#000000"
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                              </Button>
                            </div>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                              style={{ overflow: "auto" }}
                            >
                              <div
                                style={{
                                  height: 450,
                                  overflow: "auto",
                                  scroll: "hidden",
                                }}
                              >
                                <Grid container spacing={1}>
                                  <Grid>
                                    {categoryIcon && categoryIcon.length > 0
                                      ? categoryIcon.map((i, index) => (
                                          <Button
                                            className="material-icons"
                                            onClick={(e) => {
                                              handleClick(i);
                                              handleClose(e);
                                            }}
                                            key={`key${index}`}
                                          >
                                            {i}{" "}
                                          </Button>
                                        ))
                                      : null}
                                  </Grid>
                                </Grid>
                              </div>
                            </Typography>
                          </Box>
                        </Modal>
                      </div>
                      <p style={{ fontSize: "12px", color: "grey" }}>
                        Choose Category Icon. Leave blank to not display.
                      </p>
                    </div>
                  </div>
                  <div>
                    <SuiButton color="primary" onClick={handleAddNewCategory}>
                      Add New Category
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

export default CategoriesOfGroup;
