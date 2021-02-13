import React, { useState, useEffect } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { pagination } from "./../utils/pagination";
import PaginationC from "./common/pagination";
import LoginForm from "./inputForm";
import ClassList from "./classList";
import Search from "./common/search";
import CountersTable from "./countersTable";
import firebaseDB from "./../firebase.js";
import CounterContext from "./../context/counterContex";
import "./../App.css";
import ResetButton from "./resetButton";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    display: "flex",
    margin: "auto",
  },
});

const Counters = () => {
  const classes = useStyles();

  const [allCounters, setAllCounters] = useState([]);
  const [classNames, setclassNames] = useState([
    "All Classes",
    "MIT",
    "BSCS",
    "BSIT",
  ]);
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentClass, setCurrentClass] = useState("All Classes");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    firebaseDB.child("counters").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const countersObj = snapshot.val();
        const counters = [];
        for (let id in countersObj) {
          const counter = countersObj[id];
          counter.id = id;
          counters.push(counter);
        }
        setAllCounters(counters);
      }
    });
  }, []);

  const handlePageChange = (e, v) => {
    setCurrentPage(v);
  };

  const handleClassChange = (c) => {
    setCurrentClass(c);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSort = (path) => {
    const sortColumnTemp = { ...sortColumn };
    if (sortColumnTemp.path === path) {
      sortColumnTemp.order = sortColumnTemp.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnTemp.path = path;
      sortColumnTemp.order = "asc";
    }
    setSortColumn(sortColumnTemp);
  };

  const handleIncrement = (id) => {
    const counter = allCounters.find((c) => c.id === id);
    counter.value++;
    firebaseDB.child(`counters/${id}`).set(counter, (err) => {
      if (err) console.log(err);
    });
  };

  const handleDecrement = (id) => {
    const counter = allCounters.find((c) => c.id === id);
    counter.value--;
    firebaseDB.child(`counters/${id}`).set(counter, (err) => {
      if (err) console.log(err);
    });
  };

  const handleDelete = (id) => {
    firebaseDB.child(`counters/${id}`).remove((err) => {
      if (err) console.log(err);
    });
  };

  const handleReset = () => {
    let counters = [...allCounters];
    const updatedCounter = counters.map((cur) => {
      cur.value = 0;
      return cur;
    });

    const countersObj = {};
    for (let rec of updatedCounter) {
      countersObj[rec.id] = rec;
    }

    firebaseDB.child("counters").set(countersObj);
  };

  // Filter counters based on classes
  const filteredCounters =
    currentClass === "All Classes"
      ? allCounters
      : allCounters.filter((c) => c.stdClass === currentClass);

  // Filter based on search string
  const searchRes = searchString
    ? filteredCounters.filter((c) => c.name.startsWith(searchString))
    : filteredCounters;

  const sortedCounters = _.orderBy(
    searchRes,
    [sortColumn.path],
    [sortColumn.order]
  );

  const pageCount = Math.ceil(sortedCounters.length / pageSize);
  const paginatedCounters = pagination(sortedCounters, currentPage, pageSize);

  return (
    <CounterContext.Provider
      value={{
        counters: paginatedCounters,
        sortColumn: sortColumn,
        currentPage: currentPage,
        pageCount: pageCount,
        classNames,
        currentClass,
        onReset: handleReset,
        onClassChange: handleClassChange,
        onSearchChange: handleSearchChange,
        onIncrement: handleIncrement,
        onDelete: handleDelete,
        onDecrement: handleDecrement,
        onSort: handleSort,
        onPageChange: handlePageChange,
      }}
    >
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <LoginForm />
          </Grid>

          <Grid item sm={2} />

          <Grid container item xs={12} sm={2}>
            <ClassList />
          </Grid>

          <Grid item container sm={6} xs={12}>
            <Grid item xs={12} sm={5}>
              <Search />
            </Grid>

            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12}>
                <CountersTable />
              </Grid>
              <Grid item xs={12}>
                <PaginationC />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={2} />

          <Grid item container xs={12} sm={12}>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <ResetButton />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </CounterContext.Provider>
  );
};

export default Counters;
