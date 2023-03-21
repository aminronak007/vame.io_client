import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";

function Author({ image, name, email }) {
    return (
        <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
            <SuiBox mr={2}>
                <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column">
                <SuiTypography variant="button" fontWeight="medium">
                    {name}
                </SuiTypography>
                <SuiTypography variant="caption" textColor="secondary">
                    {email}
                </SuiTypography>
            </SuiBox>
        </SuiBox>
    );
}

function Function({ job, org }) {
    return (
        <SuiBox display="flex" flexDirection="column">
            <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
            >
                {job}
            </SuiTypography>
            <SuiTypography variant="caption" textColor="secondary">
                {org}
            </SuiTypography>
        </SuiBox>
    );
}

export default {
    // rows1: [
    //   {
    //     title: [logoSpotify, "Spotift"],
    //     postedby: (
    //       <Author
    //         image={team2}
    //         name="John Michael"
    //         email="john@creative-tim.com"
    //       />
    //     ),
    //     skills: <Function job="Manager" org="Organization" />,
    //     Date: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         23/04/18
    //       </SuiTypography>
    //     ),
    //     ProjectType: <Function job="Manager" org="Organization" />,
    //     Featured: <Function job="Manager" org="Organization" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     price: (
    //       <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //         $1,400
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team3}
    //         name="Alexa Liras"
    //         email="alexa@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Programator" org="Developer" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="offline"
    //         color="secondary"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         11/01/19
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team4}
    //         name="Laurent Perrier"
    //         email="laurent@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Executive" org="Projects" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         19/09/17
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     projecttitle: [logoSpotify, "Spotift"],
    //     author: (
    //       <Author
    //         image={team2}
    //         name="John Michael"
    //         email="john@creative-tim.com"
    //       />
    //     ),
    //     skills: <Function job="Manager" org="Organization" />,
    //     FreelancerType: <Function job="Manager" org="Organization" />,
    //     Date: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         23/04/18
    //       </SuiTypography>
    //     ),
    //     ProjectType: <Function job="Manager" org="Organization" />,
    //     Featured: <Function job="Manager" org="Organization" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     price: (
    //       <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //         $1,400
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team3}
    //         name="Alexa Liras"
    //         email="alexa@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Programator" org="Developer" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="offline"
    //         color="secondary"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         11/01/19
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team4}
    //         name="Laurent Perrier"
    //         email="laurent@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Executive" org="Projects" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         19/09/17
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     projecttitle: [logoSpotify, "Spotift"],
    //     author: (
    //       <Author
    //         image={team2}
    //         name="John Michael"
    //         email="john@creative-tim.com"
    //       />
    //     ),
    //     skills: <Function job="Manager" org="Organization" />,
    //     FreelancerType: <Function job="Manager" org="Organization" />,
    //     Date: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         23/04/18
    //       </SuiTypography>
    //     ),
    //     ProjectType: <Function job="Manager" org="Organization" />,
    //     Featured: <Function job="Manager" org="Organization" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     price: (
    //       <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //         $1,400
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team3}
    //         name="Alexa Liras"
    //         email="alexa@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Programator" org="Developer" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="offline"
    //         color="secondary"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         11/01/19
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team4}
    //         name="Laurent Perrier"
    //         email="laurent@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Executive" org="Projects" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         19/09/17
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     projecttitle: [logoSpotify, "Spotift"],
    //     author: (
    //       <Author
    //         image={team2}
    //         name="John Michael"
    //         email="john@creative-tim.com"
    //       />
    //     ),
    //     skills: <Function job="Manager" org="Organization" />,
    //     FreelancerType: <Function job="Manager" org="Organization" />,
    //     Date: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         23/04/18
    //       </SuiTypography>
    //     ),
    //     ProjectType: <Function job="Manager" org="Organization" />,
    //     Featured: <Function job="Manager" org="Organization" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     price: (
    //       <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //         $1,400
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team3}
    //         name="Alexa Liras"
    //         email="alexa@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Programator" org="Developer" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="offline"
    //         color="secondary"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         11/01/19
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team4}
    //         name="Laurent Perrier"
    //         email="laurent@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Executive" org="Projects" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         19/09/17
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     projecttitle: [logoSpotify, "Spotift"],
    //     author: (
    //       <Author
    //         image={team2}
    //         name="John Michael"
    //         email="john@creative-tim.com"
    //       />
    //     ),
    //     skills: <Function job="Manager" org="Organization" />,
    //     FreelancerType: <Function job="Manager" org="Organization" />,
    //     Date: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         23/04/18
    //       </SuiTypography>
    //     ),
    //     ProjectType: <Function job="Manager" org="Organization" />,
    //     Featured: <Function job="Manager" org="Organization" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     price: (
    //       <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //         $1,400
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team3}
    //         name="Alexa Liras"
    //         email="alexa@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Programator" org="Developer" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="offline"
    //         color="secondary"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         11/01/19
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team4}
    //         name="Laurent Perrier"
    //         email="laurent@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Executive" org="Projects" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         19/09/17
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     projecttitle: [logoSpotify, "Spotift"],
    //     author: (
    //       <Author
    //         image={team2}
    //         name="John Michael"
    //         email="john@creative-tim.com"
    //       />
    //     ),
    //     skills: <Function job="Manager" org="Organization" />,
    //     FreelancerType: <Function job="Manager" org="Organization" />,
    //     Date: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         23/04/18
    //       </SuiTypography>
    //     ),
    //     ProjectType: <Function job="Manager" org="Organization" />,
    //     Featured: <Function job="Manager" org="Organization" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     price: (
    //       <SuiTypography variant="button" textColor="text" fontWeight="medium">
    //         $1,400
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team3}
    //         name="Alexa Liras"
    //         email="alexa@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Programator" org="Developer" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="offline"
    //         color="secondary"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         11/01/19
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   {
    //     author: (
    //       <Author
    //         image={team4}
    //         name="Laurent Perrier"
    //         email="laurent@creative-tim.com"
    //       />
    //     ),
    //     function: <Function job="Executive" org="Projects" />,
    //     status: (
    //       <SuiBadge
    //         variant="gradient"
    //         badgeContent="online"
    //         color="success"
    //         size="extra-small"
    //       />
    //     ),
    //     employed: (
    //       <SuiTypography
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         19/09/17
    //       </SuiTypography>
    //     ),
    //     action: (
    //       <SuiTypography
    //         component="a"
    //         href="#"
    //         variant="caption"
    //         textColor="secondary"
    //         fontWeight="medium"
    //       >
    //         Edit
    //       </SuiTypography>
    //     ),
    //   },
    //   // {
    //   //   author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
    //   //   function: <Function job="Programator" org="Developer" />,
    //   //   status: (
    //   //     <SuiBadge variant="gradient" badgeContent="online" color="success" size="extra-small" />
    //   //   ),
    //   //   employed: (
    //   //     <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
    //   //       24/12/08
    //   //     </SuiTypography>
    //   //   ),
    //   //   action: (
    //   //     <SuiTypography
    //   //       component="a"
    //   //       href="#"
    //   //       variant="caption"
    //   //       textColor="secondary"
    //   //       fontWeight="medium"
    //   //     >
    //   //       Edit
    //   //     </SuiTypography>
    //   //   ),
    //   // },
    //   // {
    //   //   author: <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
    //   //   function: <Function job="Manager" org="Executive" />,
    //   //   status: (
    //   //     <SuiBadge variant="gradient" badgeContent="offline" color="secondary" size="extra-small" />
    //   //   ),
    //   //   employed: (
    //   //     <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
    //   //       04/10/21
    //   //     </SuiTypography>
    //   //   ),
    //   //   action: (
    //   //     <SuiTypography
    //   //       component="a"
    //   //       href="#"
    //   //       variant="caption"
    //   //       textColor="secondary"
    //   //       fontWeight="medium"
    //   //     >
    //   //       Edit
    //   //     </SuiTypography>
    //   //   ),
    //   // },
    //   // {
    //   //   author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
    //   //   function: <Function job="Programtor" org="Developer" />,
    //   //   status: (
    //   //     <SuiBadge variant="gradient" badgeContent="offline" color="secondary" size="extra-small" />
    //   //   ),
    //   //   employed: (
    //   //     <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
    //   //       14/09/20
    //   //     </SuiTypography>
    //   //   ),
    //   //   action: (
    //   //     <SuiTypography
    //   //       component="a"
    //   //       href="#"
    //   //       variant="caption"
    //   //       textColor="secondary"
    //   //       fontWeight="medium"
    //   //     >
    //   //       Edit
    //   //     </SuiTypography>
    //   //   ),
    //   // },
    // ],
};
