import React from "react";
import { Link } from "react-router-dom";

const NewGadget = () => {
  return (
    <Link to="/gadgets/new" className="btn btn-primary">
      New Gadget
    </Link>
  );
};

export default NewGadget;
