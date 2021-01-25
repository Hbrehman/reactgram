import React from "react";
import "./../App.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PaginationC from "./common/pagination";
import LoginForm from "./inputForm";
import Search from "./common/search";
import CountersTable from "./countersTable";

const useStyles = makeStyles({
  btnStyle: {
    margin: "0 0 -25px 25px",
  },
  formStyle: {
    marginBottom: "2rem",
  },
  container: {
    textAlign: "center",
    display: "flex",
    margin: "auto",
  },
  inputStyle: {
    marginRight: "1rem",
  },
});

const Counters = ({
  counters,
  onIncrement,
  onInsert,
  onDecrement,
  onDelete,
  onReset,
  classNames,
  onClassChange,
  currentClass,
  currentPage,
  pageCount,
  onPageChange,
  onSearchChange,
  onSort,
  sortColumn,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <LoginForm classes={classes} onInsert={onInsert} />
        </Grid>

        <Grid item sm={2} />

        <Grid container item xs={12} sm={2}>
          <List
            style={{
              width: "15rem",
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
        </Grid>

        <Grid item container sm={6} xs={12}>
          <Grid item xs={12} sm={5}>
            <Search items={counters} onChange={onSearchChange} />
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12}>
              <CountersTable
                counters={counters}
                onIncrement={onIncrement}
                onDelete={onDelete}
                onDecrement={onDecrement}
                onSort={onSort}
                sortColumn={sortColumn}
              />
            </Grid>
            <Grid item xs={12}>
              <PaginationC
                currentPage={currentPage}
                pageCount={pageCount}
                onChange={onPageChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2} />

        <Grid item container xs={12} sm={12}>
          <Grid item xs={8} />
          <Grid item xs={4}>
            <Button variant="contained" color="secondary" onClick={onReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Counters;
