import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import EmployerNavbar from "../EmployerNavbar";
import Card from "./Components/Card";
import Paypal from "./Components/Paypal";
import axios from "axios";
import { useParams } from "react-router";
import { url } from "config";
import ClipLoader from "react-spinners/ClipLoader";
import PaymentImage from "assets/images/payment/bluesnap.png";

const Payment = () => {
  let { id } = useParams();
  const [card, setCard] = useState(true);
  const [paypal, setPaypal] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339AFF",
    marginTop: "10%",
  };

  const handleChange = (e) => {
    if (e.target.value === "card") {
      setCard(true);
      setPaypal(false);
    }
    if (e.target.value === "paypal") {
      setCard(false);
      setPaypal(true);
    }
  };

  useEffect(() => {
    loadCourseDetails();
    // eslint-disable-next-line
  }, []);

  const loadCourseDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios.get(`${url}/api/payment/course/${id}`).then((res) => {
        setCourseDetails(res.data.readSingleCourseDetails);
      });
    } else {
      window.location = "/";
    }
  };

  return (
    <React.Fragment>
      <EmployerNavbar />
      {loading === true ? (
        <React.Fragment>
          <div className="d-table h-100 w-100">
            <div className="d-table-cell vertical-middle">
              <ClipLoader css={override} size={60} />
            </div>
          </div>
          <div className="text-center">
            <img
              style={{ width: 200, height: 100 }}
              src={PaymentImage}
              alt="bluesnap"
            />
            <h5 style={{ color: "#339aff" }}>
              Please wait,Your transaction is in Process !
            </h5>
          </div>
        </React.Fragment>
      ) : (
        <div style={{ marginTop: "40px" }} className="col-12">
          <div className="container white-box mt-4">
            <div className="row">
              <div className="col-md-8">
                <FormControl component="fieldset">
                  <FormLabel style={{ color: "black" }}>
                    Select Payment Method
                  </FormLabel>
                  <RadioGroup
                    aria-label="payments"
                    // defaultValue={card}
                    name="radio-buttons-group"
                    onChange={(e) => handleChange(e)}
                    value={
                      card === true
                        ? "card"
                        : paypal === true
                        ? "paypal"
                        : "wallet"
                    }
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Credit / Debit Card"
                    />
                    {/* <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label="PayPal"
                    /> */}
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-4 pr-5 order-info">
                <h6>Order Information</h6>
                <hr />
                <div className="row">
                  <div className="col-md-9">
                    <h6>Item</h6>
                    <h6>Price</h6>
                  </div>
                  <div className="col-md-3 text-right">
                    <h6 style={{ fontWeight: "normal" }}>
                      {courseDetails.courseTitle}
                    </h6>
                    <h6 style={{ fontWeight: "normal" }}>
                      ${courseDetails.price}
                    </h6>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-9">
                    <h6>Total:</h6>
                  </div>
                  <div className="col-md-3 text-right pb-1">
                    <h6>${courseDetails.price}</h6>
                  </div>
                </div>
              </div>
            </div>

            {card === true ? (
              <Card
                setLoading={setLoading}
                courseDetails={courseDetails}
                id={id}
                loading={loading}
                override={override}
              />
            ) : paypal === true ? (
              <Paypal
                courseDetails={courseDetails}
                id={id}
                setLoading={setLoading}
              />
            ) : null}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Payment;
