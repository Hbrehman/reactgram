import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = ({ classes, onInsert }) => {
  return (
    <form className={classes.formStyle} onSubmit={onInsert}>
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
