import React from "react";
import { Component } from "react";
import "./App.css";
import Counters from "./components/counters";
import Navbar from "./components/navbar";
import { pagination } from "./utils/pagination";
import _ from "lodash";
import firebaseDB from "./firebase.js";

class App extends Component {
  state = {
    counters: {},
    classNames: ["All Classes", "MIT", "BSCS", "BSIT"],
    pageSize: 3,
    currentPage: 1,
    currentClass: "All Classes",
    searchString: "",
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    firebaseDB.child("counters").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const countersObj = snapshot.val();
        const counters = [];
        for (let id in countersObj) {
          const counter = countersObj[id];
          counter.id = id;
          counters.push(counter);
        }

        this.setState({
          counters,
        });
      } else {
        this.setState({
          counters: [],
        });
      }
    });
  }

  handleFormInput = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // const counters = Object.keys(this.state.counters);

    if (data.get("value") <= 0)
      return alert("Input value cannot be lower or equal to 0");
    if (data.get("name").length === 0)
      return alert("Name filed cannot be empty");
    if (data.get("class").length === 0)
      return alert("Class Field cannot be empty");

    const counter = {
      name: data.get("name"),
      stdClass: data.get("class"),
      value: data.get("value"),
    };

    firebaseDB.child("counters").push(counter, (err) => {
      if (err) console.log(err);
    });
  };

  handleIncrement = (id) => {
    const counter = this.state.counters.find((c) => c.id === id);
    counter.value++;
    firebaseDB.child(`counters/${id}`).set(counter, (err) => {
      if (err) console.log(err);
    });
  };

  handleDecrement = (id) => {
    const counter = this.state.counters.find((c) => c.id === id);
    counter.value--;
    firebaseDB.child(`counters/${id}`).set(counter, (err) => {
      if (err) console.log(err);
    });
  };

  handleDelete = (id) => {
    firebaseDB.child(`counters/${id}`).remove((err) => {
      if (err) console.log(err);
    });
  };

  handleReset = () => {
    let counters = [...this.state.counters];
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

  handlePageChange = (e, v) => {
    this.setState({ currentPage: v });
  };

  handleClassChange = (c) => {
    this.setState({ currentClass: c, currentPage: 1 });
  };

  handleSearchChange = (event) => {
    this.setState({ searchString: event.target.value });
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  render() {
    const {
      counters: allCounters,
      currentPage,
      pageSize,
      classNames,
      currentClass,
      searchString,
      sortColumn,
    } = this.state;

    const filteredCounters =
      currentClass === "All Classes"
        ? allCounters
        : allCounters.filter((c) => c.stdClass === currentClass);

    const searchRes = searchString
      ? filteredCounters.filter((c) => c.name.startsWith(searchString))
      : filteredCounters;

    const sortedCounters = _.orderBy(
      searchRes,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pageCount = Math.ceil(sortedCounters.length / pageSize);
    const counters = pagination(sortedCounters, currentPage, pageSize);

    return (
      <div>
        <Navbar
          totalCounters={
            Object.keys(this.state.counters)
              .map((id) => {
                return this.state.counters[id].value;
              })
              .filter((c) => c > 0).length
          }
        />
        <Counters
          counters={counters}
          classNames={classNames}
          currentPage={currentPage}
          pageCount={pageCount}
          sortColumn={sortColumn}
          onInsert={this.handleFormInput}
          onIncrement={this.handleIncrement}
          onDelete={this.handleDelete}
          onDecrement={this.handleDecrement}
          onReset={this.handleReset}
          onClassChange={this.handleClassChange}
          currentClass={currentClass}
          onPageChange={this.handlePageChange}
          onSearchChange={this.handleSearchChange}
          onSort={this.handleSort}
        />
      </div>
    );
  }
}

export default App;
