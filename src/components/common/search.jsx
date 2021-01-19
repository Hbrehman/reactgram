import React from "react";
import TextField from "@material-ui/core/TextField";

const Search = ({ onChange }) => {
  return (
    <TextField
      onChange={onChange}
      variant="standard"
      color="primary"
      type="text"
      label="Search"
      name="searchByName"
      placeholder="Search by Name"
    />
  );
};

export default Search;
