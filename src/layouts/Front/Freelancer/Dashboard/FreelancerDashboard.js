import { Card } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Typography } from "antd";
import FreelancerSideber from "../FreaalancerSidebar/FreelancerSidebar";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import axios from "axios";
import { url } from "config";
import { Table } from "antd";
const { Title } = Typography;

const columns = [
  { title: "Job Details", dataIndex: "jobs", key: "jobs" },
  { title: "Total Jobs", dataIndex: "total", key: "total" },
];

const FreelancerDashboard = () => {
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [onGoingJobs, setOnGoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [cancelledJobs, setCancelledJobs] = useState([]);
  useEffect(() => {
    loadFreelancerInvitations();
    /* eslint-disable-next-line */
  }, []);

  const loadFreelancerInvitations = () => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        axios
          .post(`${url}/api/freelancer/invitations`, {
            email: res.data.email,
          })
          .then((response) => {
            setPendingInvitations(response.data);
          });

        axios
          .post(`${url}/api/freelancer/jobs`, { email: res.data.email })
          .then((response) => {
            setOnGoingJobs(response.data.currentJobs);
            setCompletedJobs(response.data.completedJobs);
            setCancelledJobs(response.data.cancelledJobs);
          });
      });
  };

  const pInvitations = (data) => {
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
                  <p>{i?.jobId?.jobtitle}</p>
                </div>
                <div className="col-md-6 text-justify">
                  <p>{i?.jobId?.jobdescription}</p>
                </div>
                <div className="col-md-3">
                  <p>
                    Click Here to
                    <span>
                      &nbsp;
                      <Link to="/freelancer/myprojects">
                        Accept or Reject invitations.
                      </Link>
                      &nbsp;
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="row pl-2 pr-2">
            <div className="col-12">
              <h6>No Pending Invitations</h6>
            </div>
          </div>
        )}
      </div>
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
                        <Link to="/freelancer/myprojects">
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
                  {i?.projectStatus?.freelancerPaymentStatus === "Applied" &&
                  i?.projectStatus?.releasePaymentStatus === false ? (
                    <React.Fragment>
                      {i?.projectStatus?.releasePaymentStatus === true ? (
                        <p className="text-success">
                          {i?.projectStatus?.proStatus}
                        </p>
                      ) : (
                        <p className="text-success">Applied for Payment.</p>
                      )}
                    </React.Fragment>
                  ) : (
                    <p>
                      <span>
                        <Link
                          to={`/freelancer/release/payment/${i?.slug}/${i?._id}`}
                        >
                          release payment.
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
      jobs: "Pending Invitations",
      total: pendingInvitations.length,
      description: pInvitations(pendingInvitations),
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
    <React.Fragment>
      <div className="padding-left">
        <FreelancerNavbar style={{ position: "absolute" }} />
      </div>
      <div style={{ display: "flex" }}>
        <FreelancerSideber />

        <div className="container-fluid p-4">
          <div style={{ paddingLeft: "5.5%" }} className="row">
            <div
              style={{ textAlign: "center", marginTop: "1vh" }}
              className="col-md-6 col-lg-3"
            >
              <Card>
                <h2>{pendingInvitations.length}</h2>

                <Title style={{ color: "#339aff" }} level={4}>
                  Pending Invitations
                </Title>
                <Link
                  style={{ textDecorationLine: "none" }}
                  to="/freelancer/myprojects"
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
                  to="/freelancer/myprojects"
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
                  to="/freelancer/myprojects"
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
                  to="/freelancer/myprojects"
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
                  // handleTableData(record)
                }}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FreelancerDashboard;
