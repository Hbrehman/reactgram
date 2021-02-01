import React, { Component } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/Menu";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import { orange, green } from "@material-ui/core/colors";

import "fontsource-roboto";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "0 30px",
    background: "linear-gradient(45deg, #333,  #999)",
  },
});

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   main: orange[500],
    // },
    // secondary: {
    //   main: green[500],
    // },
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>styled </Button>;
}

const App = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar>
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              MUI Themeing
            </Typography>
          </Toolbar>
        </AppBar>

        <ButtonStyled />

        <TextField
          variant="outlined"
          color="primary"
          type="email"
          label="Email"
          placeholder="someone@example.com"
        />

        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              // disabled
              // onChange={(e) => {
              //   setChecked(e.target.checked);
              // }}
              inputProps={{
                "aria-label": "secondary checkbox",
              }}
              // checked={checked}
            />
          }
          label="Testing Checkbox"
        />

        {/* <ButtonGroup>
        <Button
          endIcon={<SaveIcon />}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Hello world
        </Button>
        <Button
          endIcon={<SaveIcon />}
          variant="contained"
          color="primary"
          disableElevation
        >
          Hello world
        </Button>
      </ButtonGroup> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
