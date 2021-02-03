import React, { Component } from "react";

// Interface
// columns,

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = (path) => {
    const sortColumn = this.props.sortColumn;
    if (sortColumn.path !== path?.toLowerCase()) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc text-white"></i>;
    return <i className="fa fa-sort-desc text-white"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {columns.map((col) => (
            <th
              key={col.label || col.key}
              onClick={() => this.raiseSort(col.path)}
              scope="col"
              style={{ cursor: "pointer" }}
            >
              {this.renderSortIcon(col.label)} {col.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
