/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiProgress from "components/SuiProgress";

// Images
import logoComment from "assets/images/small-logos/logo-comment.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
// import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
    return (
        <SuiBox display="flex" alignItems="center">
            <SuiTypography
                variant="caption"
                textColor="text"
                fontWeight="medium"
            >
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
// eslint-disable-next-line
export default {
    columns: [
        { name: "title", align: "left" },
        { name: "comment", align: "center" },
        { name: "sendBy", align: "left" },
        { name: "amount", align: "center" },
        { name: "status", align: "center" },
        { name: "project", align: "center" },
    ],

    rows: [
        {
            title: [logoComment, "Spotift"],
            comment: "_",
            sendBy: <Completion value={60} color="info" />,
            amount: (
                <SuiTypography
                    variant="button"
                    textColor="text"
                    fontWeight="medium"
                >
                    $2,500
                </SuiTypography>
            ),
            status: (
                <SuiTypography
                    variant="caption"
                    textColor="text"
                    fontWeight="medium"
                >
                    Pending
                </SuiTypography>
            ),
            project: (
                <SuiTypography
                    variant="caption"
                    textColor="text"
                    fontWeight="medium"
                >
                    social media manager
                </SuiTypography>
            ),
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
