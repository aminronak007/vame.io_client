import React, { Fragment, useEffect, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PencileLogo from "./images/img-03.png";
import EmployerFooter from "./EmployerFooter";
import { url } from "config";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function EmployerViewProfile() {
  const [employerDetails, setEmployerDetails] = useState([]);
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;

  let [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, []);
  const loadDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          axios
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((res) => {
              if (res.data.employerDetails) {
                setEmployerDetails(res.data.employerDetails);
                // setEmployerSocialDetails(res.data.employerDetails.socialprofile);
                setLoading(false);
              }
              // console.log(res.data.employerDetails);
            });
        });
    } else {
      window.location = "/";
    }
  };
  // console.log(freelancerEmailToAccept);
  // console.log(email1.email);

  return (
    <Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <Fragment>
          <div>
            <EmployerNavbar />
          </div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                <div className="white-box">
                  <p className="text-center mb-0">
                    {" "}
                    {employerDetails ? employerDetails.displayname : null}{" "}
                  </p>
                  <hr className="my-4" />
                  <p className="small text-center mb-2">
                    Company Id:234523452345
                  </p>

                  {employerDetails.brohcure ? (
                    <Fragment>
                      <hr />
                      <div className="d-flex justify-content-center align-items-center">
                        {/* eslint-disable-next-line */}
                        <a
                          href="#"
                          download={`${url}/${employerDetails.brohcure.slice(
                            25
                          )}`}
                        >
                          <img
                            src={`${url}/${employerDetails.brohcure}`}
                            width="40px"
                            alt="brohcure"
                          />
                          &ensp;
                          <p
                            style={{
                              fontSize: "12px",
                              wordBreak: "break-all",
                            }}
                          >
                            {" "}
                            {employerDetails.brohcure.slice(25)}{" "}
                          </p>
                        </a>
                      </div>
                    </Fragment>
                  ) : null}
                  <hr className="my-4" />
                  <p> Share This Company</p>
                  <div className="pro-social-icon small">
                    <p>
                      <a href="https://in.linkedin.com/">
                        <LinkedInIcon /> &ensp; Share on LinkedIn
                      </a>
                    </p>
                    <p>
                      <a href="https://www.facebook.com/">
                        <FacebookIcon /> &ensp; Share on Facebook
                      </a>
                    </p>
                    <p>
                      <a href="https://twitter.com/">
                        <TwitterIcon /> &ensp; Share on Twitter
                      </a>
                    </p>
                    <p>
                      <a href="https://in.pinterest.com/">
                        <PinterestIcon /> &ensp; Share on Pinterest
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 align-self-center">
                <div className="white-box pro-right-box">
                  <p>
                    About "
                    {employerDetails ? employerDetails.displayname : null}"
                  </p>
                  <hr />
                  <div
                    className="py-4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={PencileLogo} alt="PencileLogo" />
                    <br />
                    <span>No projects found.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <EmployerFooter />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default EmployerViewProfile;
