import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import PropTypes from "prop-types";
import TabContext from "@mui/lab/TabContext";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployerNavbar from "../Employer/EmployerNavbar";
import FreelancerNavbar from "../Freelancer/FreelancerNavbar/FreelancerNavbar";
import axios from "axios";
import { url } from "config";
import EmployerFooter from "../Employer/EmployerFooter";
import FreelancerFooter from "../Freelancer/FreelancerFooter/FreelancerFooter";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function HowItsWork() {
  const [value, setValue] = useState(0);
  const authorization = `Bearer ${localStorage.getItem("pwd")}`;
  const [startas, setStartAs] = useState("");

  /* eslint-disable-next-line */
  const [freelancerId, setFreelancerId] = useState("");
  /* eslint-disable-next-line */
  const [employerId, setEmployerId] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (localStorage.getItem("pwd")) {
      axios
        .get(`${url}`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          setStartAs(res.data.startas);
          if (res.data.startas === "Virtual Assistant") {
            axios
              .post(`${url}/api/freelancer-details`, {
                email: res.data.email,
              })
              .then((result) => {
                setFreelancerId(result.data.freelancerDetails._id);
              });
          }
          if (res.data.startas === "Employer") {
            axios
              .post(`${url}/api/employer-details`, {
                email: res.data.email,
              })
              .then((result) => {
                setEmployerId(result.data.employerDetails._id);
              });
          }
        });
    } else {
      window.location = "/";
    }
  });

  return (
    <div>
      {startas === "Employer" ? <EmployerNavbar /> : <FreelancerNavbar />}
      <div className="container white-box mt-4">
        {/* <Box> */}
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="For the Virtual Assistants"
                aria-label="lab API tabs example"
                value={0}
                {...a11yProps(0)}
              />
              <Tab
                label="For the Hiring Mode"
                aria-label="lab API tabs example"
                value={1}
                {...a11yProps(1)}
              />
              <Tab
                label="For the Managing Mode"
                aria-label="lab API tabs example"
                value={2}
                {...a11yProps(2)}
              />
            </TabList>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              <Accordion className="how-its-accordian">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="text-primary">
                    1. How can I apply for job?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Create an account and click on chat for the jobs that you
                    wanted to apply with.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className="text-primary">
                    2. How am I going to know if the client is Legit?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Vame’s client is Legit they need subscription before they
                    can post a job on our site.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className="text-primary">
                    3. How many applications can I submit everyday?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You can apply to as any job as you like.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className="text-primary">
                    4. How Am I going to know if I am hired?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    The employer will message you
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography className="text-primary">
                    5. Can I print my certificate?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes you can print your certificate. After every test that
                    you passed you just have to click on “view my certificate”
                    and there’s an option there to download your certificate.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography className="text-primary">
                    6. Do you have a maximum minutes for Video?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    None, but make your video concise at least one minute video.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography className="text-primary">
                    7. How many courses can I take on the site?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You can take all the courses if you wanted and it is all for
                    free.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className="text-primary">
                    8. Can I repeat the quiz?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, you can repeat the quiz once a week
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel9a-content"
                  id="panel9a-header"
                >
                  <Typography className="text-primary">
                    9. Can I upload my resume?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, you can upload your resume, just go to edit my profile
                    and under personal details and skills there’s an option to
                    upload your resume.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel10a-content"
                  id="panel10a-header"
                >
                  <Typography className="text-primary">
                    10. Can I edit my profile?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, you can edit you profile on our site. You can edit your
                    personal info and skills as well as your video,just don’t
                    forget to save the changes that you made.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="text-primary">
                    1. How many jobs can I post?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You can post up to 10 job post per month.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className="text-primary">
                    2. How can I message the VA that I like?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Just click on the chat option on our platform that is beside
                    the VA’s profile
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className="text-primary">
                    3. How many VA can I hire?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You can hire as many VA as you wanted
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className="text-primary">
                    4. Can I save the VA's profile that I like for future
                    references?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, just click on the heart icon on the left side of the
                    VA’s photo
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography className="text-primary">
                    5. How am I going to know if the VA is online for chat?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    There is indication in the platform
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography className="text-primary">
                    6. Is there a minimum wage to pay the VA?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    no, but it advisable to make the rate competitive
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography className="text-primary">
                    7. What is the minimum hours require to hire a VA?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You can start even with 1 hour
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className="text-primary">
                    8. How Am I going to know if someone applied to my job post?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You will get email notifications
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel9a-content"
                  id="panel9a-header"
                >
                  <Typography className="text-primary">
                    9. How much is the monthly subscription to your site?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    $50 is our monthly subscription rate
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel10a-content"
                  id="panel10a-header"
                >
                  <Typography className="text-primary">
                    10. How can I pay the subscription?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You can pay the subscription through paypal
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="text-primary">
                    1. Do you have a time tracker?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, we have a time tracker that your VA can install as a
                    chrome extension.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className="text-primary">
                    2. How many VA can I manage using the site?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="ml-3">
                  <Typography>
                    Depend on the subscription you can start with 1 and go up to
                    1000
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className="text-primary">
                    3. What is KPI?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    KPI stands for Key performance indicator, it is use to
                    measure your VA’s performance.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className="text-primary">
                    4. How any screenshots am I going to receive everyday?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    You are going to get screenshot of each mouse click
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography className="text-primary">
                    5. Do you have a graph showing my VA's productivity?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, we do have a graph that shows you VA productivity,it is
                    called productivity percentage graph.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography className="text-primary">
                    6. What is going to happen to non KPI events?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Don’t worry you will see data in dashboard only based on
                    actions that interesting you
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography className="text-primary">
                    7. Am I going to see how much I'm going to pay my VA?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, and you can find it on finance tab.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className="text-primary">
                    8. When is the VA time tracker reset?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="ml-3">
                  <Typography>
                    He choose when to turn it on and when to turn it off
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel9a-content"
                  id="panel9a-header"
                >
                  <Typography className="text-primary">
                    9. Can I generate an invoice?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    Yes, you can find it on the the finance tab under payment
                    section
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel10a-content"
                  id="panel10a-header"
                >
                  <Typography className="text-primary">
                    10. What payment platforms are you supporting?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="ml-3">
                    We are using paypal as the payment platform
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
        </TabContext>
        {/* </Box> */}
      </div>

      {startas === "Employer" ? <EmployerFooter /> : <FreelancerFooter />}
    </div>
  );
}
export default HowItsWork;
