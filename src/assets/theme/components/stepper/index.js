import colors from "assets/theme/base/colors";

// Soft UI Dashboard PRO React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent } = colors;

const index = {
  styleOverrides: {
    root: {
      margin: `${pxToRem(48)} 0`,
      padding: `0 ${pxToRem(12)}`,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main,
      },
    },
  },
};

export default index;
