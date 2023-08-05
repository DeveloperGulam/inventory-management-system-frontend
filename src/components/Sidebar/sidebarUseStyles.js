// import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled'

// UTILS
// import colors from "constants/colors";

const drawerWidth = 256;

const useStyles = styled((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 70
  },
  sidebarContainer: {
    backgroundColor: "#000000",
    height: "100vh",
    boxSizing: "border-box",
    position: "relative"
  }
}));

export default useStyles;