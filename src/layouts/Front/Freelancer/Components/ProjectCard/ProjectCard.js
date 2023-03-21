import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import jobLogo from "../../image/job-type.png";
import saveLogo from "../../image/favorite.png";
import { useHistory } from "react-router";

const ProjectCard = ({ jobViewList }) => {
  let history = useHistory();

  const handleClick = (slug) => {
    history.push(`/freelancer/view-job/${slug}`);
  };
  return (
    <React.Fragment>
      {jobViewList && jobViewList.length > 0
        ? jobViewList.map((i, index) => {
            return (
              <Card
                key={`key${index}`}
                style={{ boxShadow: "none", overflow: "visible" }}
              >
                <CardContent className="p-0">
                  <div className="d-flex">
                    <img src={jobLogo} height="22" width="22" /> &ensp;{" "}
                    <p>Project type: Fixed Price </p>
                  </div>
                  <div className="d-flex">
                    <img src={saveLogo} height="22" width="22" /> &ensp;{" "}
                    <p>Save</p>
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
            );
          })
        : null}
    </React.Fragment>
  );
};

export default ProjectCard;
