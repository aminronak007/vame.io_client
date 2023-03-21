import React from "react";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import moment from "moment";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

function EmployerFooter() {
  return (
    <div
      className="footer mt-5"
      style={{
        backgroundColor: "#002552",
        color: "#fff",
        padding: "60px 0 25px",
        fontSize: 14,
      }}
    >
      <div className="container">
        <Grid container>
          <Grid item sm style={{ fontSize: 14 }}>
            {/* <img src={logo} >Vame </img> */}
            <p>
              Vame is a place where everyone can hire a Virtual Assistant in a
              fast and easy way.
            </p>

            <p>Our system also offers an attractive management system.</p>

            <p>
              You can Manage perfectly and measure the VA’s work during the
              shift time.
            </p>

            <div className="footericon">
              <a href="https://www.facebook.com/Fillva-Recruitment-Management-Tool-105254725087594/">
                {" "}
                <FacebookIcon />{" "}
              </a>{" "}
              &ensp;
              <a href="https://twitter.com/Fillva2">
                {" "}
                <TwitterIcon />{" "}
              </a>{" "}
              &ensp;
              <a href="https://www.youtube.com/channel/UCHBfe2WIVaJiaCXpQRjsaVA">
                {" "}
                <YouTubeIcon />{" "}
              </a>{" "}
              &ensp;
              <a href="https://www.instagram.com/fillvaa/">
                {" "}
                <InstagramIcon />{" "}
              </a>{" "}
              &ensp;
              <a href="https://www.linkedin.com/authwall?trk=gf&trkInfo=AQEEBn0QZZqGgQAAAX3WiuaYZqbBUPMtSSLfOMv-AJM12Wi5SAeagE25gNv3j0Naa1RJ6N8oONqqBPaz9mlM6s2vDywC3OVXN5Cd9TKFaHQhD8KNTq-xNrT5a1Zsc2RRTcA8IUE=&originalReferer=https://vame.io/&sessionRedirect=https%3A%2F%2Fil.linkedin.com%2Fcompany%2Fvameofficial">
                {" "}
                <LinkedInIcon />{" "}
              </a>
            </div>
          </Grid>

          <Grid
            item
            sm
            style={{ fontSize: 14, paddingLeft: 25 }}
            className="border-left"
          >
            <p style={{ fontSize: 16 }}>Useful Links</p>
            <ul className="list-unstyled">
              <li>
                <a href="/employer-dashboard">Check Our Talents</a>
              </li>
              <li>
                <a href="/freelancer/search-projects">Check Our Jobs</a>
              </li>
              <li>
                <a href="/academy">Vame Academy</a>
              </li>
              {/* <li>
                <a href="#">Affiliates </a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li> */}
            </ul>
          </Grid>
        </Grid>
        <hr />
        <div className="row">
          <div className="col-sm">
            <p>
              {/*  eslint-disable-next-line */}
              <a className="list-unstyled" href="#">
                {" "}
                Copyright{" "}
              </a>{" "}
              © {moment().format("YYYY")} Vame LTD , All Right Reserved
            </p>
          </div>
          <div className="col-sm text-sm-right">
            <a href="/terms-condition">Terms and Conditions</a> &ensp;{" "}
            <a href="/privacy"> Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployerFooter;
