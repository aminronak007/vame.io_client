import React from "react";
import Typography from "@mui/material/Typography";
import heartLogo from "../../image/img-03.png";

const CancelledJobs = ({ cancelledJobs }) => {
  return (
    <div className="row">
      <Typography variant="h5" component="div" className="postjob-fontsize">
        Cancelled Job
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: "black",
        }}
      >
        <div className="row mt-3">
          <div className="col-12 text-center">
            {cancelledJobs && cancelledJobs.length > 0 ? (
              cancelledJobs.map((i, index) => {
                return (
                  <React.Fragment key={`key${index}`}>
                    <div className="col-md-9 text-justify">
                      <b>{i?.jobtitle}</b>
                      <div className="mt-2">
                        <p>{i?.jobdescription}</p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <div
                className="pb-4"
                style={{
                  justifyContent: "center",
                  // height: "800px",
                }}
              >
                <img src={heartLogo} alt="logo" />
                <p>You don't have any Cancelled Jobs.</p>
              </div>
            )}
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default CancelledJobs;
