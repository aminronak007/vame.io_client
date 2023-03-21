import axios from "axios";
import { url } from "config";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Paypal = ({ courseDetails, id, setLoading }) => {
  let history = useHistory();
  let token = localStorage.getItem("pwd");
  const [currentUser, setCurrentUser] = useState({});
  const [freelancer, setFreelancer] = useState({});
  const [fullName, setFullName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
        axios
          .post(`${url}/api/freelancer-details`, {
            email: res.data.email,
          })
          .then((res) => {
            setFreelancer(res.data.freelancerDetails);
            setCourseId(courseDetails._id);
          });
      });
    // eslint-disable-next-line
  }, [freelancer]);

  const handleSubmitApiCall = async () => {
    await axios
      .post(`${url}/api/paypal`, {
        amount: courseDetails.price,
        fullName: fullName,
        email: currentUser.email,
        courseId: courseId,
        zip: postalCode,
        id: id,
        email1: email,
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
          window.location.href = result.data.r.paypalTransaction.paypalUrl;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !postalCode) {
      setLoading(false);
      handleSubmitApiCall();
    } else {
      setLoading(true);
      handleSubmitApiCall();
    }
  };

  return (
    <div className="row">
      <div className="col-md-7 mr-5">
        {/* onSubmit={handleSubmit} */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h5>Shopper Details</h5>
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                name="fullName"
                placeholder="Enter your Fullname"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <div className="row text-right mt-2">
            <div className="col">
              <button onClick={handleSubmit} className="btn btn-primary m-1">
                Submit
              </button>
              <button
                onClick={() => history.push(`/course/${courseDetails.slug}`)}
                className="btn btn-danger m-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-3">{/* <Card style={{ height: 50 }} /> */}</div>
    </div>
  );
};

export default Paypal;
