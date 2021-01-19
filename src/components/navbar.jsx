import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: "3rem",
    position: "relative",
    alignItems: "center",
  },
  center: {
    textAlign: "center",
  },
}));

const Navbar = ({ totalCounters }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.mb}>
        <Toolbar>
          <Typography variant="h6" component="div">
            {totalCounters}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
