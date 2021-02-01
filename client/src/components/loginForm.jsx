import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import auth from "./../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(3).label("Password"),
  };

  doSubmit = async () => {
    // Call the server
    try {
      const { data: jwt } = await auth.login(this.state.data);
      localStorage.setItem("token", jwt);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        var errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
