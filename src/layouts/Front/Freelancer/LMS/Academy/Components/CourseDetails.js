import { url } from "config";
import React from "react";

const CourseDetails = ({ categoryName, tagline, description, badge }) => {
  return (
    <div className="row course-details">
      <div className="col-md-8 col-xs-12">
        <h5 className="course-tagline">
          <b>{tagline}</b>
        </h5>
        <p className="course-description">{description}</p>
      </div>
      <div className="col-md-4 col-xs-12 text-center">
        {!badge ? null : (
          <img
            className="img-fluid"
            src={`${url}/${badge}`}
            alt={categoryName}
          />
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
