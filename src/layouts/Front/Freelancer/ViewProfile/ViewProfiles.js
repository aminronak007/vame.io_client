import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import Banner from "../image/frbanner-1920x400.jpg";
import profilelogo from "../image/logo-img.png";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FreelancerFooter from "../FreelancerFooter/FreelancerFooter";
import { url } from "config";
import axios from "axios";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

function ViewProfile() {
  // const [id, setId] = React.useState(null);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  // const [email1, setEmail1] = React.useState({
  //   email: "",
  // });
  const [freelancerViewData, setFreelancerViewData] = useState([]);
  let [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  React.useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          // setId(res.data.id);
          // console.log(res);
          // setEmail1({ email: res.data.email });
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((res) => {
              setFreelancerViewData(res.data.freelancerDetails);
              setLoading(false);
              // console.log("free-view-pro", res.data.freelancerDetails);
            });
        });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, []);

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
          <div>
            <FreelancerNavbar />
          </div>
          <div style={{ position: "absolute" }} className="w-100">
            {freelancerViewData.bannerphoto === "" ||
            freelancerViewData.bannerphoto === undefined ||
            freelancerViewData.bannerphoto === "undefined" ? (
              <img src={Banner} width="100%" alt="banner" />
            ) : (
              <img
                src={`${url}/${freelancerViewData.bannerphoto}`}
                width="100%"
                style={{ maxHeight: "310px" }}
                className="img-fluid"
                alt="banner"
              />
            )}
          </div>
          <div className="container view-free-profile">
            <Card>
              <CardContent>
                <div className="row">
                  <div className="col-md-3 text-center">
                    {freelancerViewData?.profilephoto === "" ||
                    freelancerViewData.profilephoto === undefined ||
                    freelancerViewData.profilephoto === "undefined" ? (
                      <img
                        height="250"
                        width="250"
                        src={profilelogo}
                        className="img-fluid"
                        alt="profle"
                      />
                    ) : (
                      <img
                        alt="profile"
                        src={`${url}/${freelancerViewData?.profilephoto}`}
                        height="250"
                        width="250"
                      />
                    )}
                    <p
                      className="mt-4 mb-1"
                      style={{ textTransform: "capitalize" }}
                    >
                      {" "}
                      {freelancerViewData
                        ? freelancerViewData?.displayname
                        : null}{" "}
                    </p>
                    <p className="mb-1 text-14">
                      Member Since:{""}{" "}
                      {freelancerViewData
                        ? moment(freelancerViewData["createdAt"]).format(
                            "MMMM DD,YYYY"
                          )
                        : null}
                    </p>
                    {freelancerViewData["yearsofexperience"]?.length > 0 ? (
                      <p className="mb-1 text-14">
                        Years of experience:{" "}
                        {freelancerViewData
                          ? freelancerViewData["yearsofexperience"]
                          : null}{" "}
                        <i
                          className="far fa-id-card"
                          style={{ color: "#339aff" }}
                        ></i>{" "}
                      </p>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div
              className="mt-4 row"
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {freelancerViewData && freelancerViewData["location"] ? (
                <div className="col-md-12 col-lg-6">
                  {" "}
                  <div className="row">
                    <div className="col-auto">
                      <FlagIcon style={{ color: "#339aff" }} />{" "}
                      <b> Country: </b>
                    </div>
                    <div className="col-auto">
                      {freelancerViewData
                        ? freelancerViewData["location"]
                        : null}
                    </div>
                  </div>
                </div>
              ) : null}
              {freelancerViewData &&
              freelancerViewData.billingDetails[0]?.city ? (
                <div className="col-md-12 col-lg-6">
                  <div className="row">
                    <div className="col-auto">
                      <LocationOnIcon style={{ color: "#339aff" }} />
                      <b>Address: </b>
                    </div>
                    <div className="col-auto">
                      {freelancerViewData
                        ? freelancerViewData.billingDetails[0]?.address
                        : null}
                      {freelancerViewData.billingDetails[0]?.city.length > 0
                        ? ","
                        : null}
                      &nbsp;
                      {freelancerViewData
                        ? freelancerViewData.billingDetails[0]?.city
                        : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <FreelancerFooter />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default ViewProfile;
