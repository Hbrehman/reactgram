import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class CountersTable extends Component {
  renderSortIcon = (path) => {
    const sortColumn = this.props.sortColumn;
    if (sortColumn.path !== path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    const { counters, onIncrement, onDecrement, onDelete, onSort } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => onSort("name")}
              >
                {this.renderSortIcon("name")} Name
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => onSort("stdClass")}
                align="right"
              >
                {this.renderSortIcon("stdClass")} Class
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => onSort("value")}
                align="right"
              >
                {this.renderSortIcon("value")} value
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {counters.map((counter) => (
              <TableRow key={counter.id}>
                <TableCell component="th" scope="row">
                  {counter.name}
                </TableCell>
                <TableCell align="right">{counter.stdClass}</TableCell>
                <TableCell align="right">{counter.value}</TableCell>
                <TableCell align="right">
                  <Button
                    className="m-2"
                    variant="contained"
                    color="primary"
                    onClick={() => onIncrement(counter.id)}
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    className="m-2"
                    variant="contained"
                    color="primary"
                    onClick={() => onDecrement(counter.id)}
                    disabled={counter.value <= 0 ? true : false}
                  >
                    -
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    className="btn-sm m-2"
                    variant="contained"
                    color="secondary"
                    onClick={() => onDelete(counter.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CountersTable;
