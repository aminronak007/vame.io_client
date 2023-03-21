import React, { useEffect, useState } from "react";
import FreelancerNavbar from "../FreelancerNavbar/FreelancerNavbar";
import { url } from "config";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";

const Notifications = () => {
  const token = localStorage.getItem("pwd");
  const authorization = `Bearer ${token}`;
  const currPage = 1;
  const [curr, setCurr] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
    // eslint-disable-next-line
  }, []);

  const loadNotifications = (p) => {
    let curr = p ? p : currPage;
    axios
      .get(`${url}`, {
        headers: { authorization },
      })
      .then((res) => {
        axios
          .post(`${url}/api/freelancer/all-notifications`, {
            email: res.data.email,
            curr,
          })
          .then((resp) => {
            if (resp.data.next) {
              setTotalPages(resp.data.next.totalPages);
            } else {
              setTotalPages(resp.data.previous.totalPages);
            }
            if (resp.data.next) {
              setCurr(resp.data.next.page - 1);
            } else {
              setCurr(resp.data.previous.page + 1);
            }
            setNotifications(resp.data.notifications);
          });
      });
  };

  return (
    <React.Fragment>
      <FreelancerNavbar />
      <div style={{ marginTop: "40px" }} className="col-12 right-content">
        <div className="container white-box">
          <div>
            <span className="postjob-fontsize">NOTIFICATIONS</span>
            {notifications?.length > 0
              ? notifications?.map((i, index) => {
                  return (
                    <React.Fragment key={`key${index}`}>
                      <div className="row">
                        <div className="col-2 text-center">
                          <h6 className="notificationBackground">
                            {i?.notificationType}
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p className="notificationMessage">
                            {i?.notificationMessage}
                          </p>
                        </div>
                      </div>

                      <hr className="hr" />
                    </React.Fragment>
                  );
                })
              : null}

            <Pagination
              page={curr}
              count={totalPages}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/freelancer/notifications`}
                  {...item}
                  onClick={() => loadNotifications(item.page)}
                />
              )}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
