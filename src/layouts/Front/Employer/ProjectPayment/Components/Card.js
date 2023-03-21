import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { url } from "config";
import { toast } from "react-toastify";

const CardPayment = ({ id, setLoading, amount, loadJobDetails }) => {
  let history = useHistory();
  let token = localStorage.getItem("pwd");
  const [currentUser, setCurrentUser] = useState({});
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [cardDetails, setCardDetails] = useState({
    expirationYear: 0,
    securityCode: "",
    expirationMonth: 0,
    cardNumber: "",
    cardHolder: "",
  });

  const [shopperDetails, setShopperDetails] = useState({
    fullName: "",
    email: "",
    zip: "",
  });

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCurrentUser(res.data);
          axios
            .post(`${url}/api/employer-details`, {
              email: res.data.email,
            })
            .then((res) => {
              // console.log(res);
              setFirstName(res.data.employerDetails.firstname);
              setLastName(res.data.employerDetails.lastname);
              // setCourseId(courseDetails._id);
            });
        });
    } else {
      window.location = "/";
    }
    // eslint-disable-next-line
  }, []);

  const handleShopperDetails = (e) => {
    const { name, value } = e.target;
    setShopperDetails({ ...shopperDetails, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(`${url}/api/employer/project/payment`, {
        cardDetails,
        shopperDetails,
        amount: amount,
        firstName: firstname,
        lastName: lastname,
        email: currentUser.email,
        jobId: id,
      })
      .then((result) => {
        if (result.data.success) {
          toast.success(result.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          history.push("/employer/managejobs");
          loadJobDetails();
        } else {
          toast.error(result.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      });
  };

  return (
    <div className="row">
      <div className="col-md-7 mr-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <input
                type="number"
                name="cardNumber"
                placeholder="Card Number"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="cardHolder"
                placeholder="Card Holder Name"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-2">
              <input
                type="number"
                name="expirationMonth"
                placeholder="MM"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="expirationYear"
                placeholder="YYYY"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="securityCode"
                placeholder="CVV"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6"></div>
          </div>
          <br />
          <div className="row">
            <h5>Shopper Details</h5>
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                name="fullName"
                placeholder="Enter your Fullname"
                onChange={handleShopperDetails}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={handleShopperDetails}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6">
              <input
                className="form-control"
                type="number"
                min="0"
                name="zip"
                placeholder="Zip / Postal Code"
                onChange={handleShopperDetails}
              />
            </div>
          </div>
          <div className="row text-right mt-2">
            <div className="col">
              <button onClick={handleSubmit} className="btn btn-primary m-1">
                Submit
              </button>
              <button
                onClick={() => history.push(`/employer/managejobs`)}
                className="btn btn-danger m-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardPayment;
