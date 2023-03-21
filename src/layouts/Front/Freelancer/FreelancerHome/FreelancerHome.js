import React, { useState } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { url } from "config";
import axios from "axios";
import jobLogo from "../image/job-type.png";
import saveLogo from "../image/favorite.png";
import { useHistory } from "react-router";
import renderHTML from "react-render-html";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import FreelancerFooter from "../FreelancerFooter/FreelancerFooter";

const FreelancerHome = () => {
  let history = useHistory();
  const [jobViewList, setJobViewList] = useState([]);
  const [categoriesData, setCategoriesData] = useState("");
  const [keyword, setKeyword] = React.useState("");
  const [category, setCategory] = useState("");
  const [filterData, setFilterData] = useState(null);
  let [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [currPage, setCurrPage] = useState(0);
  const [curr, setCurr] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  const handleClick = (slug) => {
    history.push(`/freelancer/view-job/${slug}`);
  };

  React.useEffect(() => {
    axios.get(`${url}/api/categories`).then((res) => {
      setCategoriesData(res.data.categoryData);
    });
    loadDataWithPages();
    // eslint-disable-next-line
  }, []);

  const loadDataWithPages = (page) => {
    if (localStorage.getItem("pwd")) {
      let curr = page ? page : currPage;
      axios.post(`${url}/api/listjobs`, { curr }).then((res) => {
        setTotalPages(res.data.totalPages);
        setCurr(res.data.curr + 1);
        setJobViewList(res.data.jobDetails);
        setLoading(false);
      });
    } else {
      window.location = "/";
    }
  };

  const searched = (key) => (c) => c.jobtitle.toLowerCase().includes(key);

  const handleFilterClick = () => {
    axios.post(`${url}/api/category/details`, { category }).then((res) => {
      setFilterData(res.data.jobDetails);
      setJobViewList([]);
    });
  };

  return (
    <React.Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <FreelancerNavbar />
          <div className="container ">
            <div
              className="white-box"
              style={{ marginTop: 40, marginBottom: 40, padding: 36 }}
            >
              <div className="row search-project">
                <div className="col-lg-3">
                  <div>
                    <div>
                      <p>
                        {" "}
                        <b> Filter Project By </b>{" "}
                      </p>
                      <hr />
                      <div className="mb-3">
                        <p className="text-14 mb-1">Start Your Search</p>
                        <TextField
                          fullWidth
                          placeholder="Type Keyword"
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                      </div>
                      <hr className="mt-3" />
                      <div>
                        <select
                          className=" form-control form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          name="category"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option disabled selected>
                            Select Category
                          </option>
                          {categoriesData && categoriesData.length > 0
                            ? categoriesData.map((i, index) => {
                                return (
                                  <option key={`key${index}`} value={i.name}>
                                    {i.name}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div style={{ textAlign: "center" }}>
                      <p className="text-14 mt-3">
                        Click “Apply Filter” to apply latest changes made by
                        you.
                      </p>
                      <Button
                        onClick={handleFilterClick}
                        className="btn btn-blue w-100"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-9 border-left"
                  //   style={{alignItems: 'center',display: 'flex',justifyContent:'center'}}
                >
                  {filterData && filterData.length > 0 ? (
                    filterData.map((i, index) => {
                      return (
                        <div
                          className="row white-box mt-4 adfgafaafasdfasdfasdfasdf"
                          key={`key${index}`}
                        >
                          <div className="col-md-8">
                            <Card
                              sx={{}}
                              style={{
                                boxShadow: "none",
                                paddingLeft: "10px",
                              }}
                            >
                              <CardContent
                                className="p-0"
                                // style={{ marginLeft: "10px" }}
                              >
                                <Typography
                                  className="text-16"
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  color="text.secondary"
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {i.user ? i.user.firstname : ""}
                                  {""}
                                  {i.user ? i.user.lastname : ""}
                                </Typography>
                                <Typography
                                  className="ps-4"
                                  style={{
                                    color: "#339aff",
                                  }}
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {i.jobtitle}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {i.jobdescription
                                    ? renderHTML(
                                        i.jobdescription.replace(/<[^>]+>/g, "")
                                      )
                                    : ""}
                                </Typography>
                                <div className="btn-grp mt-4">
                                  <Button
                                    className="freelance-buttons me-2 mb-2"
                                    size="small"
                                    color="secondary"
                                  >
                                    Blogging
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="col-md-4 border-left">
                            <Card
                              sx={{}}
                              style={{
                                boxShadow: "none",
                                overflow: "visible",
                              }}
                            >
                              <CardContent className="p-0">
                                <div className="d-flex">
                                  <img
                                    src={jobLogo}
                                    height="22"
                                    width="22"
                                    alt="jobLogo"
                                  />
                                  &ensp; <p>Project type: Fixed Price </p>
                                </div>
                                <div className="d-flex">
                                  <img
                                    src={saveLogo}
                                    height="22"
                                    width="22"
                                    alt="saveLogo"
                                  />
                                  &ensp; <p>Save</p>
                                </div>
                                <Button
                                  className="btn btn-blue w-100"
                                  size="small"
                                  color="secondary"
                                  onClick={() => handleClick(i.slug)}
                                >
                                  View Job
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      );
                    })
                  ) : filterData && filterData.length === 0 ? (
                    <div className="align-items-center d-flex h-100 justify-content-center">
                      <h2 className="text-center">No Data Found</h2>
                    </div>
                  ) : jobViewList && jobViewList.length > 0 ? (
                    jobViewList.filter(searched(keyword)).map((i, index) => {
                      return (
                        <div className="row white-box mt-4" key={`key${index}`}>
                          <div className="col-md-8">
                            <Card
                              sx={{}}
                              style={{
                                boxShadow: "none",
                                paddingLeft: "10px",
                              }}
                            >
                              <CardContent className="p-0">
                                <Typography
                                  className="text-16"
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  color="text.secondary"
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {i.user ? i.user.firstname : ""} {""}
                                  {i.user ? i.user.lastname : ""}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {i.jobtitle}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {i.jobdescription}
                                </Typography>

                                <div className="btn-grp mt-4">
                                  {i?.skills?.map((s, index) => (
                                    <Button
                                      className="freelance-buttons me-2 mb-2"
                                      size="small"
                                      color="secondary"
                                      key={`key${index}`}
                                    >
                                      {s.skills}
                                    </Button>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className="col-md-4 border-left">
                            <Card
                              sx={{}}
                              style={{
                                boxShadow: "none",
                                overflow: "visible",
                              }}
                            >
                              <CardContent className="p-0">
                                <div className="d-flex">
                                  <img
                                    src={jobLogo}
                                    height="22"
                                    width="22"
                                    alt="jobLogo"
                                  />
                                  &ensp; <p>Project type: Fixed Price </p>
                                </div>
                                <div className="d-flex">
                                  <img
                                    src={saveLogo}
                                    height="22"
                                    width="22"
                                    alt="saveLogo"
                                  />
                                  &ensp; <p>Save</p>
                                </div>
                                <Button
                                  className="btn btn-blue w-100"
                                  size="small"
                                  color="secondary"
                                  onClick={() => handleClick(i.slug)}
                                >
                                  View Job
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      );
                    })
                  ) : null}
                  {(filterData && filterData.length > 0) ||
                  (jobViewList && jobViewList.length) ? (
                    <Pagination
                      page={curr}
                      count={totalPages}
                      renderItem={(item) => (
                        <PaginationItem
                          component={Link}
                          to={`/freelancer/search-projects`}
                          {...item}
                          onClick={() => loadDataWithPages(item.page - 1)}
                        />
                      )}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div>
            <FreelancerFooter />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FreelancerHome;
