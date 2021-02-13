import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import CounterContext from "./../../context/counterContex";

const Search = () => {
  const { onSearchChange } = useContext(CounterContext);
  return (
    <TextField
      onChange={onSearchChange}
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
