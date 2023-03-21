// @mui material components
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "config";
import { Grid, InputLabel, TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router";

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
// import LocationTableData from "layouts/project/data/LocationTableData";
import AddProjectDetails from "./AddProjectDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

function Locations() {
  const classes = styles();
  // const { columns, rows } = LocationTableData;
  const [locationName, setLocationName] = useState("");
  const [locationSlug, setLocationSlug] = useState("");
  const [perentLocation, setPerentLocation] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  // eslint-disable-next-line
  const [locationdata, setLocationData] = useState([]);
  const [locationTableData, setLocationTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [locationIcon, setLocationIcon] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  // console.log("selectedImage", selectedImage)

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
      axios.post(`${url}/api/icons`).then((result) => {
        setLocationIcon(result.data.iconsList);
      });
      axios
        .get(`${url}/api/locations`)
        .then((res) => {
          setLocationTableData(res.data.locationData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location = "/";
    }
  }, []);

  let history = useHistory();
  const handleAddNewLocation = () => {
    axios
      .post(`${url}/api/location`, {
        name: locationName,
        slug: locationSlug,
        perentlocation: perentLocation,
        description: locationDescription,
        icon: selectedImage,
      })
      .then((result) => {
        setLocationData(result);
        history.push("/location");
      });
  };

  const handleClick = (e) => {
    console.log(locationIcon.find((i, id) => i === e));
    setSelectedImage(locationIcon.find((i, id) => i === e) ? e : "");
  };

  // // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const searched = (key) => (c) => c.name.toLowerCase().includes(key);

  if (locationTableData.length > 0) {
    locationTableData.filter(searched(keyword)).map((item, idx) =>
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
                  <h6>Add New Location</h6>
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <InputLabel> Name </InputLabel>
                      <SuiInput
                        size="small"
                        placeholder="Name..."
                        onChange={(e) => setLocationName(e.target.value)}
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
                    <div className="col-md-4 col-sm-6">
                      <InputLabel> Slug </InputLabel>
                      <SuiInput
                        size="small"
                        placeholder="Slug..."
                        onChange={(e) => setLocationSlug(e.target.value)}
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
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <InputLabel> Parent Location </InputLabel>
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          onChange={(e) => setPerentLocation(e.target.value)}
                        >
                          <option value="none">None</option>
                          {locationTableData.length > 0
                            ? locationTableData.map((item, index) => (
                                <option value={index}>{item.name}</option>
                              ))
                            : null}
                        </select>
                      </div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                        }}
                      >
                        Assign a parent term to create a hierarchy. The term
                        Jazz, for example, would be the parent of Bebop and Big
                        Band.
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <InputLabel> Description</InputLabel>
                      <TextareaAutosize
                        minRows="3"
                        style={{ width: "100%" }}
                        onChange={(e) => setLocationDescription(e.target.value)}
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
                    <div className="col">
                      <InputLabel variant="h5"> Location Image</InputLabel>
                      <div>
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
                        <Button onClick={handleOpen}>Add Image</Button>
                        <br />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "grey",
                          }}
                        >
                          Upload location flag. It will display in listing and
                          detail page.
                        </span>
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
                            <div
                              style={{
                                height: 450,
                                overflow: "auto",
                                scroll: "hidden",
                              }}
                            >
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                style={{
                                  overflow: "auto",
                                }}
                              >
                                <Grid container spacing={1}>
                                  <Grid>
                                    {locationIcon && locationIcon.length > 0
                                      ? locationIcon.map((i, idx) => (
                                          <Button
                                            className="material-icons"
                                            onClick={(e) => {
                                              handleClick(i);
                                              handleClose(e);
                                            }}
                                          >
                                            {i}{" "}
                                          </Button>
                                        ))
                                      : null}
                                  </Grid>
                                </Grid>
                              </Typography>
                            </div>
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div>
                    <SuiButton
                      backgroundColor="#2152ff"
                      onClick={(e) => handleAddNewLocation(e)}
                    >
                      Add New Location
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
                            <Button style={{ textTransform: "none" }}>
                                Apply
                            </Button> */}
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

export default Locations;
