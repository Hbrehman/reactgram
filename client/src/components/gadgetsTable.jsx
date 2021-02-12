import React, { Component } from "react";

import TableHeader from "../common/tableHeader";
import { Link } from "react-router-dom";

class GadgetTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "category.name", label: "Category" },
    { path: "quantity", label: "Quantity" },
    { path: "price", label: "Price" },
    { key: "delete" },
  ];

  render() {
    const { gadgets, onDelete, onSort, sortColumn, user } = this.props;
    return (
      <table className="table bg-light table-hover">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />

        <tbody>
          {gadgets.map((gadget) => (
            <tr key={gadget.title}>
              {user ? (
                <td>
                  <Link to={`/gadgets/${gadget._id}`}>{gadget.title}</Link>
                </td>
              ) : (
                <td>{gadget.title}</td>
              )}

              <td>{gadget.category.name}</td>
              <td>{gadget.quantity}</td>
              <td>{gadget.price}</td>

              {user && user.isAdmin && (
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(gadget)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GadgetTable;
