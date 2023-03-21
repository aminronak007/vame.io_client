import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles, Box, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "config";
import defaultUserImage from "assets/defaultImages/defaultUserImage.png";
import ClipLoader from "react-spinners/ClipLoader";

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 5,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 3,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

const useStyle = makeStyles({
  component: {
    margin: 20,
    background: "white",
  },
  deal: {
    padding: "15px 20px",
    display: "flex",
  },
  dealText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    marginRight: 25,
  },
  timer: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: 150,
    justifyContent: "space-between",
  },
  button: {
    marginLeft: "auto",
    background: "black",
    borderRadius: 2,
    fontSize: "13px",
  },
  text: {
    fontSize: "14px",
    marginTop: 5,
  },
  wrapper: {
    padding: "35px 15px",
    // width: "50px 50px",
  },
});

const Slide = () => {
  const classes = useStyle();
  const Classes = useStyle();

  //   const pwd = localStorage.getItem("pwd");
  //   const authorization = `Bearer ${pwd}`;
  //   const [email1, setEmail1] = useState({
  //     email: "",
  //   });
  const [freelancerData, setFreelancerData] = useState([]);
  let [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#339aff",
  };

  //   useEffect(() => {
  //     axios
  //       .get(`${url}`, {
  //         headers: {
  //           authorization,
  //         },
  //       })
  //       .then((res) => {
  //         // setEmail1({ email: res.data.email });
  //       });
  //   }, []);

  useEffect(() => {
    axios.get(`${url}/api/freelancer-videos`).then((res) => {
      if (res.data.freelancerDetails) {
        setFreelancerData(res.data.freelancerDetails);
        setLoading(false);
      }
      // console.log("video", res.data.freelancerDetails);
    });
  }, []);

  let freelancerVideos =
    freelancerData?.length > 0
      ? freelancerData
          // eslint-disable-next-line
          ?.map((i, index, elements) => {
            if (i?.profilevideo) {
              return elements[index];
            }
          })
          .filter((n) => n)
      : null;

  return (
    <Fragment>
      {loading === true ? (
        <div className="d-table h-100 w-100">
          <div className="d-table-cell vertical-middle">
            <ClipLoader css={override} size={60} />
          </div>
        </div>
      ) : (
        <Box className={Classes.component}>
          <Box className={Classes.deal}>
            <Typography className="postjob-fontsize">
              Top Rated video{" "}
            </Typography>
          </Box>
          <hr />

          <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            navButtonsProps={{
              style: {
                background: "#ffffff",
                color: "#399aff",
                borderRadius: 0,
                margine: 0,
              },
            }}
            className={classes.Carousel}
          >
            {freelancerVideos && freelancerVideos?.length > 0
              ? freelancerVideos.map((i, index) => {
                  return (
                    <React.Fragment key={`key${index}`}>
                      {i?.profilevideo?.length > 0 && i?.profilevideo !== "" ? (
                        <Box textAlign="center" height="20%">
                          <ReactPlayer
                            className="react-player"
                            url={i?.profilevideo ? i?.profilevideo : ""}
                            // width="50%"
                            // height="20%"
                          />
                          <p className="mt-2">
                            {i?.profilephoto !== "" ? (
                              <img
                                className="image-fluid"
                                height="30"
                                width="30"
                                src={`${url}/${i?.profilephoto}`}
                                alt="profile"
                              />
                            ) : (
                              <img
                                alt="profile"
                                className="image-fluid"
                                height="30"
                                width="30"
                                src={defaultUserImage}
                              />
                            )}{" "}
                            &ensp;
                            {i?.displayname}
                          </p>
                        </Box>
                      ) : null}
                    </React.Fragment>
                  );
                })
              : null}
          </Carousel>
        </Box>
      )}
    </Fragment>
  );
};

export default Slide;
