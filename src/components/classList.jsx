import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CounterContext from "../context/counterContex";

export default function ClassList() {
  const { classNames, onClassChange, currentClass } = useContext(
    CounterContext
  );
  return (
    <div>
      <List
        style={{
          width: "12rem",
          cursor: "pointer",
        }}
        component="nav"
      >
        {classNames.map((c) => (
          <ListItem key={c} selected={c === currentClass}>
            <ListItemText primary={c} onClick={() => onClassChange(c)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
