import React from "react";
import { useHistory } from "react-router";
import FreelancerNavbar from "../../FreelancerNavbar/FreelancerNavbar";

const PaypalCancel = () => {
  let history = useHistory();
  return (
    <React.Fragment>
      <FreelancerNavbar />
      <div style={{ marginTop: "40px" }} className="col-12">
        <div className="container white-box mt-4">
          <div className="row text-center">
            <p className="text-danger">
              Your Paypal Transaction was not completed. So your order has not
              been processed. Please try after sometime.
            </p>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <button
                onClick={() => history.push("/academy")}
                className="btn btn-primary"
              >
                Go to Courses
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaypalCancel;
