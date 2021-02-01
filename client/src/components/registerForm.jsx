import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { registerUser } from "./../services/userService";
import auth from "./../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(3).label("Username"),
    name: Joi.string().required().min(3).label("Name"),
    password: Joi.string().required().min(3).label("Password"),
  };

  doSubmit = async () => {
    //register the user
    try {
      const response = await registerUser(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        var errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
