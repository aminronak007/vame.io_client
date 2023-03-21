import React, { useContext, useEffect, useState } from "react";
import EmployerNavbar from "./EmployerNavbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Messages from "./images/message-img.png";
import ManageJob from "./Menulogo/ManageJob";
import Subscription from "./Menulogo/Subscription";
import EmployerSidebar from "./EmployerSidebar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function EmployerInbox() {
  return (
    <div>
      <div className="padding-left">
        <EmployerNavbar style={{ position: "absolute" }} />
      </div>
      <div className="row mx-0">
        <div className="col-1">
          <EmployerSidebar />
        </div>
        <div className="col-12 right-content mt-20">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <Card
                sx={{
                  //   maxWidth: 875,
                  marginTop: "40px",
                  marginBottom: "40px",
                  boxShadow: "20px",
                }}
              >
                <CardContent className="p-30">
                  <Typography sx={{ fontSize: 14, color: "black" }}>
                    <div>
                      <h2 className="page-title">Messages</h2>
                      <hr />
                      <div className="row">
                        <div className="col-md-4">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Users"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />{" "}
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                id="basic-addon2"
                              >
                                <FilterAltIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-8 text-center border-left"
                          style={{
                            height: 500,
                            paddingTop: 100,
                          }}
                        >
                          <img src={Messages} />
                          <br />
                          <span
                            style={{
                              color: "lightgrey",
                            }}
                          >
                            No message selected to display
                          </span>
                        </div>
                      </div>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployerInbox;
