import { FormControl, FormLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import BankTransferImage from "assets/images/payment/regular-bank-transfer.png";
import { url } from "config";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const ReleaseProjectPayment = () => {
  const token = localStorage.getItem("pwd");
  let authorization = `Bearer ${token}`;
  let [loading, setLoading] = useState(true);
  const [freelancerBankDetails, setFreelanerBankDetails] = useState([]);
  const { slug } = useParams();
  const [selectedBankAccount, setSelectedBankAccount] = useState({});
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState([]);
  const [addAccountStatus, setAddAccountStatus] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadFreelancerDetails();
    loadJobDetails();
    // eslint-disable-next-line
  }, []);

  const loadFreelancerDetails = () => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          axios
            .post(`${url}/api/freelancer-details`, {
              email: res.data.email,
            })
            .then((result) => {
              setLoading(false);
              setEmail(res.data.email);
              setFreelanerBankDetails(
                result.data.freelancerDetails.bankDetails
              );
            });
        });
    } else {
      window.location = "/";
    }
  };

  const loadJobDetails = () => {
    axios.get(`${url}/api/list-jobs/${slug}`).then((res) => {
      setJobId(res.data.readJobDetails?.map((i) => i?._id).toString());
      setJobDetails(res.data.readJobDetails);
    });
  };

  const [bankDetails, setBankDetails] = useState({
    accountNo: "",
    bankName: "",
    mobile: "",
    routingNumber: "",
  });

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;

    setBankDetails({ ...bankDetails, [name]: value });
  };

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
    marginTop: "20%",
  };

  const handleSubmitBankDetails = () => {
    axios
      .put(`${url}/api/freelancer/add/bank/details`, {
        bankDetails,
        email,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          loadFreelancerDetails();
          setAddAccountStatus(false);
        } else if (res.data.error) {
          toast.error(res.data.error, {
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
          loadFreelancerDetails();
        }
      });
  };

  const handleProceedPayment = () => {
    setLoading(true);
    axios
      .put(`${url}/api/freelancer/apply/payment`, {
        selectedBankAccount,
        jobId,
        email,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.success, {
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
          loadJobDetails();
        }
        if (res.data.error) {
          toast.error(res.data.error, {
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
          loadJobDetails();
        }
      });
  };

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
          <FreelancerNavbar style={{ position: "absolute" }} />
          <div className="row mx-0" style={{ marginTop: "40px" }}>
            <div className="col-12 mt-20">
              <div className="container white-box">
                {jobDetails?.length > 0
                  ? jobDetails?.map((i, index) =>
                      i?.projectStatus?.freelancerPaymentStatus ===
                      "Applied" ? (
                        <div key={`key${index}`} className="row text-center">
                          <p
                            style={{
                              color: "#339aff",
                            }}
                          >
                            Your amount will be reflected in your bank account
                            within 5-7 Business Days.
                          </p>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-md-12 col-xl-8">
                            <FormControl component="fieldset">
                              <FormLabel
                                style={{
                                  color: "black",
                                }}
                              >
                                Select Bank Account
                              </FormLabel>
                              {freelancerBankDetails ? (
                                freelancerBankDetails?.length === 0 ? (
                                  <React.Fragment>
                                    <p className="text-danger">
                                      You dont have any bank account added
                                      further. Please add a bank account to
                                      release payment.
                                    </p>
                                    <div
                                      style={{
                                        width: "200px",
                                      }}
                                    >
                                      {addAccountStatus !== true ? (
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          onClick={() =>
                                            setAddAccountStatus(true)
                                          }
                                        >
                                          Add Bank Account
                                        </button>
                                      ) : null}
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <p
                                      style={{
                                        color: "#339aff",
                                      }}
                                    >
                                      Please select bank account if you already
                                      have or add a new bank account.
                                    </p>
                                    <div className="row">
                                      <div className="col-md-9">
                                        <FormControl>
                                          <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                          >
                                            {freelancerBankDetails?.length > 0
                                              ? freelancerBankDetails?.map(
                                                  (i, index, elements) => {
                                                    return (
                                                      <React.Fragment
                                                        key={`key${index}`}
                                                      >
                                                        <FormControlLabel
                                                          value={i.accountNo}
                                                          control={<Radio />}
                                                          label={i.bankName}
                                                          onChange={() =>
                                                            setSelectedBankAccount(
                                                              elements[index]
                                                            )
                                                          }
                                                        />
                                                      </React.Fragment>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </RadioGroup>
                                        </FormControl>
                                      </div>

                                      <div className="col-md-12 py-3">
                                        {freelancerBankDetails.length ? (
                                          <button
                                            className="btn btn-primary mb-1"
                                            type="button"
                                            onClick={handleProceedPayment}
                                          >
                                            Proceed to payment
                                          </button>
                                        ) : null}
                                        &nbsp;
                                        {addAccountStatus !== true ? (
                                          <button
                                            className="btn btn-primary mb-1"
                                            type="button"
                                            onClick={() =>
                                              setAddAccountStatus(true)
                                            }
                                          >
                                            Add Bank Account
                                          </button>
                                        ) : null}
                                      </div>
                                    </div>
                                  </React.Fragment>
                                )
                              ) : null}
                              <div className="row">
                                {addAccountStatus === true ? (
                                  <React.Fragment>
                                    <div className="col-md-6">
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Account Number
                                      </label>
                                      <input
                                        min="0"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Account Number"
                                        name="accountNo"
                                        onChange={(e) =>
                                          handleBankDetailsChange(e)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Routing Number
                                      </label>
                                      <input
                                        min="0"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Routing Number"
                                        name="routingNumber"
                                        onChange={(e) =>
                                          handleBankDetailsChange(e)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6 pt-3">
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Bank Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Bank Name"
                                        name="bankName"
                                        onChange={(e) =>
                                          handleBankDetailsChange(e)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6 pt-3">
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Mobile
                                      </label>
                                      <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        name="mobile"
                                        onChange={(e) =>
                                          handleBankDetailsChange(e)
                                        }
                                      />
                                    </div>

                                    <div className="col-md-12 pt-3 text-right">
                                      <button
                                        onClick={handleSubmitBankDetails}
                                        className="btn btn-primary"
                                      >
                                        Add Account
                                      </button>
                                      &nbsp;
                                      {addAccountStatus === true ? (
                                        <button
                                          className="btn btn-danger"
                                          type="button"
                                          onClick={() =>
                                            setAddAccountStatus(false)
                                          }
                                        >
                                          Cancel
                                        </button>
                                      ) : null}
                                    </div>
                                  </React.Fragment>
                                ) : null}
                              </div>
                            </FormControl>
                          </div>
                          <div className="col-md-12 col-xl-4 text-center">
                            <img
                              width={220}
                              src={BankTransferImage}
                              alt="bank-transer"
                            />
                          </div>
                        </div>
                      )
                    )
                  : null}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default ReleaseProjectPayment;
