import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import firebaseDB from "./../firebase.js";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  btnStyle: {
    margin: "0 0 -25px 25px",
  },
  formStyle: {
    marginBottom: "2rem",
  },

  inputStyle: {
    marginRight: "1rem",
  },
});
const LoginForm = () => {
  const classes = useStyles();

  const handleFormInput = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    if (data.get("name").length === 0)
      return toast.error("🚨 Name filed cannot be empty");
    if (data.get("class").length === 0)
      return toast.error("🚨 Class Field cannot be empty");
    if (data.get("value") <= 0)
      return toast.error("🚨 Input value cannot be lower or equal to 0");

    const counter = {
      name: data.get("name"),
      stdClass: data.get("class"),
      value: data.get("value"),
    };

    firebaseDB.child("counters").push(counter, (err) => {
      if (err) console.log(err);
    });
  };

  return (
    <form className={classes.formStyle} onSubmit={handleFormInput}>
      <TextField
        className={classes.inputStyle}
        variant="standard"
        color="primary"
        type="text"
        label="Name"
        name="name"
        placeholder="Enter your Name"
      />
      <TextField
        className={classes.inputStyle}
        variant="standard"
        color="primary"
        type="text"
        label="Class"
        name="class"
        placeholder="Enter your class"
      />
      <TextField
        className={classes.inputStyle}
        variant="standard"
        color="primary"
        type="Number"
        label="Amount"
        name="value"
        placeholder="Insert Amount"
      />

      <Button
        className={classes.btnStyle}
        variant="contained"
        color="primary"
        type="submit"
        value="Submit"
        min="0"
      >
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
