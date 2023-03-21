/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiProgress from "components/SuiProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

function Completion({ value, color }) {

  // const { categoryData } = useContext(GlobalState);

  return (
    <SuiBox display="flex" alignItems="center">
      <SuiTypography variant="caption" textColor="text" fontWeight="medium">
        {value}%&nbsp;
      </SuiTypography>
      <SuiBox width="8rem">
        <SuiProgress value={value} color={color} gradient noLabel />
      </SuiBox>
    </SuiBox>
  );
}

const action = (
  <Icon className="font-bold text-secondary cursor-pointer" fontSize="small">
    more_vert
  </Icon>
);

export default {
  columns: [
    { name: "name", align: "left" },
    { name: "description", align: "left" },
    // { icon: [logoSpotify, "Spotift"], align: "center" },
    // { icon: [logoJira, "Spotift"], align: "center" },
    { name: "slug", align: "left" },
    { name: "count", align: "center" },
  ],

  // {categoryData && categoryData.length>0 ? categoryData.map((item, idx)=>{

  // }):null}
  rows: [
    {
      name: [logoSpotify, "Spotift"],
      count: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,500
        </SuiTypography>
      ),
      slug: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          working
        </SuiTypography>
      ),
      description: <Completion value={60} color="info" />,
      action,
    },
    // {
    //   project: [logoInvesion, "Invesion"],
    //   budget: (
    //     <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //       $5,000
    //     </SuiTypography>
    //   ),
    //   status: (
    //     <SuiTypography variant="caption" textColor="text" fontWeight="medium">
    //       done
    //     </SuiTypography>
    //   ),
    //   completion: <Completion value={100} color="success" />,
    //   action,
    // },
    // {
    //   project: [logoJira, "Jira"],
    //   budget: (
    //     <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //       $3,400
    //     </SuiTypography>
    //   ),
    //   status: (
    //     <SuiTypography variant="caption" textColor="text" fontWeight="medium">
    //       canceled
    //     </SuiTypography>
    //   ),
    //   completion: <Completion value={30} color="error" />,
    //   action,
    // },
    // {
    //   project: [logoSlack, "Slack"],
    //   budget: (
    //     <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //       $1,400
    //     </SuiTypography>
    //   ),
    //   status: (
    //     <SuiTypography variant="caption" textColor="text" fontWeight="medium">
    //       canceled
    //     </SuiTypography>
    //   ),
    //   completion: <Completion value={0} color="error" />,
    //   action,
    // },
    // {
    //   project: [logoWebDev, "Webdev"],
    //   budget: (
    //     <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //       $14,000
    //     </SuiTypography>
    //   ),
    //   status: (
    //     <SuiTypography variant="caption" textColor="text" fontWeight="medium">
    //       working
    //     </SuiTypography>
    //   ),
    //   completion: <Completion value={80} color="info" />,
    //   action,
    // },
    // {
    //   project: [logoXD, "Adobe XD"],
    //   budget: (
    //     <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //       $2,300
    //     </SuiTypography>
    //   ),
    //   status: (
    //     <SuiTypography variant="caption" textColor="text" fontWeight="medium">
    //       done
    //     </SuiTypography>
    //   ),
    //   completion: <Completion value={100} color="success" />,
    //   action,
    // },
  ],
};
