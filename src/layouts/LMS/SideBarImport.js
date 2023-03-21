import Sidenav from "examples/Sidenav";
import routes from "routes";
import { useSoftUIController } from "context";
import { Icon } from "@mui/material";
import SuiBox from "components/SuiBox";
import React from "react";

const SideBarImport = () => {
  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator } = controller;
  const handleConfiguratorOpen = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  };

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      backgroundColor="white"
      boxShadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      customClass="cursor-pointer"
      onClick={handleConfiguratorOpen}
    >
      <Icon className=" text-dark" fontSize="default">
        settings
      </Icon>
    </SuiBox>
  );
  return (
    <React.Fragment>
      <Sidenav routes={routes} />
      {configsButton}
    </React.Fragment>
  );
};

export default SideBarImport;
