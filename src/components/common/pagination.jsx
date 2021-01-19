import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationC = ({ pageCount, currentPage, onChange }) => {
  if (pageCount === 1) return null;
  return (
    <Pagination
      count={pageCount}
      color="primary"
      page={currentPage}
      onChange={onChange}
    />
  );
};

export default PaginationC;
