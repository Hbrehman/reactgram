import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Gadgets from "./components/gadgets";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import GadgetForm from "./components/gadgetForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./common/protectedRoute";
import Footer from "./common/footer";
import InfoModal from "./common/modal";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="app">
        <NavBar user={user} />
        <div className="container flex-grow-1">
          <ToastContainer />
          <Switch>
            <Redirect exact from="/" to="/gadgets" />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />

            <ProtectedRoute path="/gadgets/:id" exact component={GadgetForm} />

            <Route
              path="/gadgets"
              render={(props) => <Gadgets {...props} user={user} />}
            />

            <Route path="/notFound" component={NotFound} />
            <Redirect to="/notFound" />
          </Switch>
        </div>
        <Footer />
        <InfoModal />
      </div>
    );
  }
}

export default App;
