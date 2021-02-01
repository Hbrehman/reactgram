import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import { getCategories } from "../services/categoryService";
import { deleteGadget, getGadgets } from "../services/gadgetService";
import { pagination } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import GadgetTable from "./gadgetsTable";
import _ from "lodash";
import { toast } from "react-toastify";

class Gadgets extends Component {
  state = {
    gadgets: [],
    categories: [],
    pageSize: 5,
    currentPage: 1,
    selectedCategory: { _id: "all", name: "All Categories" },
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = [{ _id: "all", name: "All Categories" }, ...data];
    const { data: gadgets } = await getGadgets();
    this.setState({ gadgets, categories });
  }

  handleDelete = async (gadget) => {
    const originalGadgets = this.state.gadgets;
    this.setState({
      gadgets: [...originalGadgets.filter((c) => c._id !== gadget._id)],
    });
    try {
      await deleteGadget(gadget._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This Gadget has already been deleted");
      }
      this.setState({ gadgets: originalGadgets });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const count = this.state.gadgets.length;
    const {
      pageSize,
      currentPage,
      gadgets: allGadgets,
      categories,
      selectedCategory,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    const filteredGadgets =
      selectedCategory && selectedCategory._id && selectedCategory._id != "all"
        ? allGadgets.filter((cur) => cur.category._id === selectedCategory._id)
        : allGadgets;

    const sorted = _.orderBy(
      filteredGadgets,
      [sortColumn.path],
      [sortColumn.order]
    );

    const gadgets = pagination(sorted, currentPage, pageSize);

    if (count === 0) {
      return <h3 className="m-5">There are no gadgets in the database</h3>;
    }
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            categories={categories}
            selectedCategory={selectedCategory}
            onItemSelect={this.handleCategoryChange}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/gadgets/new" className="btn btn-success mb-md-3">
              New Gadget
            </Link>
          )}
          <h6>Showing {filteredGadgets.length} Gadgets from the database</h6>
          <GadgetTable
            gadgets={gadgets}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            user={user}
          />

          <Pagination
            itemsCount={filteredGadgets.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Gadgets;
