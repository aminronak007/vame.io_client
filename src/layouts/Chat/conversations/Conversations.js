import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversations.css";
import { url } from "config";

const Conversations = ({ conversation, currentUser, search }) => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        await axios.get(`${url}/api/users?userId=` + friendId).then((res) => {
          if (res.data.startas === "Employer") {
            axios.get(`${url}/api/employer-all-details`).then((result) => {
              let users = result.data.employerDetails
                // eslint-disable-next-line
                ?.map((i, index, elements) => {
                  if (i.email === res.data.email) {
                    return elements[index];
                  }
                })
                .filter((n) => n);

              setUsers(users);
            });
          } else {
            axios.get(`${url}/api/freelancer-videos`).then((result) => {
              let users = result.data.freelancerDetails
                // eslint-disable-next-line
                ?.map((i, index, elements) => {
                  if (i.email === res.data.email) {
                    return elements[index];
                  }
                })
                .filter((n) => n);

              setUsers(users);
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const searched = (key) => (c) => c?.displayname.toLowerCase().includes(key);

  return (
    <>
      {user && user?.length > 0
        ? user?.filter(searched(search)).map((i) => {
            return (
              <>
                <div className="conversation">
                  <img
                    className="conversationImg"
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    alt=""
                  />
                  <span
                    style={{ textTransform: "capitalize" }}
                    className="conversationName"
                  >
                    {i.displayname}
                  </span>
                </div>
              </>
            );
          })
        : null}
    </>
  );
};

export default Conversations;
