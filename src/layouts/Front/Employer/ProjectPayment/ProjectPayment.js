import axios from "axios";
import { url } from "config";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import EmployerNavbar from "../EmployerNavbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "./Components/Card";
import Paypal from "./Components/Paypal";
import PaymentImage from "assets/images/payment/bluesnap.png";

const ProjectPayment = () => {
    let [loading, setLoading] = useState(true);
    let { id } = useParams();
    let history = useHistory();
    const token = localStorage.getItem("pwd");
    const location = useLocation();
    const [jobDetails, setJobDetails] = useState({});
    const [card, setCard] = useState(true);
    const [paypal, setPaypal] = useState(false);
    const [amount, setAmount] = useState(0);

    const override = {
        display: "block",
        margin: " 0 auto",
        borderColor: "#339aff",
    };

    useEffect(() => {
        loadJobDetails();
        loadCurrentUser();
        // eslint-disable-next-line
    }, []);

    let transactionId = new URLSearchParams(location.search).get(
        "PAYPAL_TRANSACTION_ID"
    );
    let accountId = new URLSearchParams(location.search).get("ACCOUNT_ID");

    const loadCurrentUser = () => {
        if (localStorage.getItem("pwd")) {
            axios
                .get(`${url}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    axios
                        .post(
                            `${url}/api/employer/project/store/paymentDetails`,
                            {
                                jobId: id,
                                email: res.data.email,
                                transactionId: transactionId,
                                accountId: accountId,
                            }
                        )
                        .then((result) => {
                            if (result.data.success) {
                                loadJobDetails();
                                history.push("/employer/managejobs");
                            }
                        });
                });
        } else {
            window.location = "/";
        }
    };

    const loadJobDetails = () => {
        if (localStorage.getItem("pwd")) {
            axios.get(`${url}/api/jobs/${id}`).then((res) => {
                setJobDetails(res.data.readJobDetails);
                setLoading(false);
                if (res.data.readJobDetails?.projectStatus?.fixedPrice) {
                    setAmount(
                        res.data.readJobDetails?.projectStatus?.fixedPrice
                    );
                } else {
                    setAmount(
                        parseInt(res.data.readJobDetails?.hourrate) *
                            res.data.readJobDetails?.projectStatus
                                ?.projectDurationHours
                    );
                }
            });
        } else {
            window.location = "/";
        }
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

    return (
        <React.Fragment>
            <EmployerNavbar style={{ position: "absolute" }} />
            {loading === true ? (
                <React.Fragment>
                    <div className="d-table">
                        <div className="d-table-cell vertical-middle"></div>
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
                                        defaultValue="card"
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
                                <h6>Project Information</h6>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Project:</h6>
                                        <h6>Amount:</h6>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <h6
                                            style={{
                                                fontWeight: "normal",
                                            }}
                                        >
                                            {jobDetails.jobtitle}
                                        </h6>
                                        <h6
                                            style={{
                                                fontWeight: "normal",
                                            }}
                                        >
                                            ${amount}
                                        </h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-9">
                                        <h6>Total:</h6>
                                    </div>
                                    <div className="col-md-3 text-right pb-1">
                                        ${amount}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {card === true ? (
                            <Card
                                setLoading={setLoading}
                                jobDetails={jobDetails}
                                id={id}
                                amount={amount}
                                loadJobDetails={loadJobDetails}
                            />
                        ) : paypal === true ? (
                            <Paypal
                                jobDetails={jobDetails}
                                amount={amount}
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

export default ProjectPayment;
