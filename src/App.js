import React from "react";
import Counters from "./components/counters";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Counters />
    </div>
  );
};

export default App;
