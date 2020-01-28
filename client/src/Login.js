import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      loggedIn: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  signIn = () => {
    var info = {
      user: this.state.username,
      pass: this.state.password
    };
    axios
      .post("/api/signin", info)
      .then(res => {
        console.log(res.data.user);
        window.user = res.data.user
        console.log('Window from login: ' + window.user);
        this.props.setDetails();
      })
      .catch(e => {
        console.log(e);
      });
  };

  signUp = () => {
    var info = {
      user: this.state.username,
      email: this.state.email,
      pass: this.state.password
    };
    axios
      .post("/api/signup", info)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="Login">
        <div>
          <div>
            <TextField
              label="Username"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
            <TextField
              label="Password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
            <Button
              onClick={this.signIn}
              color="primary"
              variant="outlined"
            >
              {"Sign In"}
            </Button>
          </div>
          <div>
            <TextField
              label="Username"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
            <TextField
              label="Password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
            <Button
              onClick={this.signUp}
              color="primary"
              variant="outlined"
            >
              {"Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
