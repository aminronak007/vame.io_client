import { Card } from "antd";
import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { Typography } from "antd";

import EmployerNavbar from "../EmployerNavbar";
import EmployerSideber from "../EmployerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "config";

import { Table } from "antd";

const { Title } = Typography;

const columns = [
  { title: "Job Details", dataIndex: "jobs", key: "jobs" },
  { title: "Total Jobs", dataIndex: "total", key: "total" },
];

const EmployerDashboard = () => {
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;

  const [pendingPayments, setPendingPayments] = useState([]);
  const [onGoingJobs, setOnGoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);

  useEffect(() => {
    loadEmployerJobDetails();
    // eslint-disable-next-line
  }, []);

  const loadEmployerJobDetails = () => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        axios
          .post(`${url}/api/employer/job`, { email: res.data.email })
          .then((response) => {
            setPendingPayments(response.data.pendingPayments);
            setOnGoingJobs(response.data.currentJobs);
            setCompletedJobs(response.data.completedJobs);
            setCancelledJobs(response.data.cancelledJobs);
          });
      });
  };

  const pPayments = (data) => {
    return (
      <Fragment>
        <div className="container">
          {data?.length > 0 ? (
            <div className="row">
              <div className="col-md-3">
                <h6>Job Title</h6>
              </div>
              <div className="col-md-6">
                <h6>Job Description</h6>
              </div>
              <div className="col-md-3">
                <h6>Status</h6>
              </div>
            </div>
          ) : null}
          {data?.length > 0 ? (
            data?.map((i, index) => {
              return (
                <div className="row" key={`key${index}`}>
                  <div className="col-md-3">
                    <p>{i?.jobtitle}</p>
                  </div>
                  <div className="col-md-6 text-justify">
                    <p>{i?.jobdescription}</p>
                  </div>
                  <div className="col-md-3">
                    {i?.sendInvitation?.freelancerAcceptStatus !== true ? (
                      <p className="text-danger">
                        Offer not Accepted by Freelancer.
                      </p>
                    ) : (
                      <p>
                        Click Here to
                        <span>
                          &nbsp;
                          <Link to={`/employer/project/payment/${i._id}`}>
                            pay project amount.
                          </Link>
                          &nbsp;
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="row pl-2 pr-2">
              <div className="col-12">
                <h6>No Pending Payments</h6>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  };

  const inProgressJobs = (data) => {
    return (
      <div className="container">
        {data?.length > 0 ? (
          <div className="row">
            <div className="col-md-3">
              <h6>Job Title</h6>
            </div>
            <div className="col-md-6">
              <h6>Job Description</h6>
            </div>
            <div className="col-md-3">
              <h6>Status</h6>
            </div>
          </div>
        ) : null}
        {data?.length > 0 ? (
          data?.map((i, index) => {
            return (
              <div className="row" key={`key${index}`}>
                <div className="col-md-3">
                  <p>{i.jobtitle}</p>
                </div>
                <div className="col-md-6 text-justify">
                  <p>{i.jobdescription}</p>
                </div>
                <div className="col-md-3">
                  {!i?.projectStatus?.paymentDetails?.employerId ? (
                    <p className="text-danger">
                      Employer has not pay the full amount of the job to the
                      Admin
                    </p>
                  ) : (
                    <p>
                      Click here to
                      <span>
                        &nbsp;
                        <Link to="/employer/managejobs">
                          update the Job status.
                        </Link>
                      </span>
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="row pl-2 pr-2">
            <div className="col-12">
              <h6>No On Going Jobs</h6>
            </div>
          </div>
        )}
      </div>
    );
  };

  const comJobs = (data) => {
    return (
      <div className="container">
        {data?.length > 0 ? (
          <div className="row">
            <div className="col-md-3">
              <h6>Job Title</h6>
            </div>
            <div className="col-md-6">
              <h6>Job Description</h6>
            </div>
            <div className="col-md-3">
              <h6>Status</h6>
            </div>
          </div>
        ) : null}
        {data?.length > 0 ? (
          data?.map((i, index) => {
            return (
              <div className="row" key={`key${index}`}>
                <div className="col-md-3">
                  <p>{i.jobtitle}</p>
                </div>
                <div className="col-md-6 text-justify">
                  <p>{i.jobdescription}</p>
                </div>
                <div className="col-md-3">
                  <p className="text-success">{i?.projectStatus?.proStatus}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="row pl-2 pr-2">
            <div className="col-12">
              <h6>No On Going Jobs</h6>
            </div>
          </div>
        )}
      </div>
    );
  };

  const canJobs = (data) => {
    return (
      <div className="container">
        {data?.length > 0 ? (
          <div className="row">
            <div className="col-md-3">
              <h6>Job Title</h6>
            </div>
            <div className="col-md-6">
              <h6>Job Description</h6>
            </div>
            <div className="col-md-3">
              <h6>Status</h6>
            </div>
          </div>
        ) : null}
        {data?.length > 0 ? (
          data?.map((i, index) => {
            return (
              <div className="row" key={`key${index}`}>
                <div className="col-md-3">
                  <p>{i?.jobtitle}</p>
                </div>
                <div className="col-md-6">
                  <p>{i?.jobdescription}</p>
                </div>
                <div className="col-md-3">
                  <p className="text-danger">{i?.projectStatus?.proStatus}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="row pl-2 pr-2">
            <div className="col-12">
              <h6>No Cancelled Jobs</h6>
            </div>
          </div>
        )}
      </div>
    );
  };

  const data = [
    {
      key: 1,
      jobs: "Pending Payments",
      total: pendingPayments.length,
      description: pPayments(pendingPayments),
    },
    {
      key: 2,
      jobs: "On Going Jobs",
      total: onGoingJobs.length,
      description: inProgressJobs(onGoingJobs),
    },
    {
      key: 3,
      jobs: "Completed Jobs",
      total: completedJobs.length,
      description: comJobs(completedJobs),
    },
    {
      key: 4,
      jobs: "Cancelled Jobs",
      total: cancelledJobs.length,
      description: canJobs(cancelledJobs),
    },
  ];

  return (
    <Fragment>
      <div className="padding-left">
        <EmployerNavbar style={{ position: "absolute" }} />
      </div>
      <div style={{ display: "flex" }}>
        <EmployerSideber />

        <div className="container-fluid p-4">
          <div style={{ paddingLeft: "5.5%" }} className="row">
            <div
              style={{ textAlign: "center", marginTop: "1vh" }}
              className="col-md-6 col-lg-3"
            >
              <Card>
                <h2>{pendingPayments.length}</h2>

                <Title style={{ color: "#339aff" }} level={4}>
                  Pending Payments
                </Title>
                <Link
                  style={{ textDecorationLine: "none" }}
                  to="/employer/managejobs"
                >
                  <Title level={5}>View all</Title>
                </Link>
              </Card>
            </div>

            <div
              style={{ textAlign: "center", marginTop: "1vh" }}
              className="col-md-6 col-lg-3"
            >
              <Card>
                <h2>{onGoingJobs.length}</h2>

                <Title style={{ color: "#339aff" }} level={4}>
                  On Going Jobs
                </Title>
                <Link
                  style={{ textDecorationLine: "none" }}
                  to="/employer/managejobs"
                >
                  <Title level={5}>View all</Title>
                </Link>
              </Card>
            </div>

            <div
              style={{ textAlign: "center", marginTop: "1vh" }}
              className="col-md-6 col-lg-3"
            >
              <Card>
                <h2>{completedJobs.length}</h2>

                <Title style={{ color: "#339aff" }} level={4}>
                  Completed Jobs
                </Title>
                <Link
                  style={{ textDecorationLine: "none" }}
                  to="/employer/managejobs"
                >
                  <Title level={5}>View all</Title>
                </Link>
              </Card>
            </div>

            <div
              style={{ textAlign: "center", marginTop: "1vh" }}
              className="col-md-6 col-lg-3"
            >
              <Card>
                <h2>{cancelledJobs.length}</h2>

                <Title style={{ color: "#339aff" }} level={4}>
                  Cancelled Jobs
                </Title>

                <Link
                  style={{ textDecorationLine: "none" }}
                  to="/employer/managejobs"
                >
                  <Title level={5}>View all</Title>
                </Link>
              </Card>
            </div>

            <div className="row mt-4 pl-3">
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}>{record.description}</p>
                  ),
                }}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployerDashboard;
