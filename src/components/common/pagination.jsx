import React, { useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import CounterContext from "./../../context/counterContex";

const PaginationC = () => {
  const { pageCount, currentPage, onPageChange } = useContext(CounterContext);
  if (pageCount === 1) return null;
  return (
    <Pagination
      count={pageCount}
      color="primary"
      page={currentPage}
      onChange={onPageChange}
    />
  );
};

export default PaginationC;
