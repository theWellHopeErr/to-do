import React, { Component } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  signin = () => {
    var info = {
      user: this.state.username,
      pass: this.state.password
    };
    axios
      .post("/api/signin", info)
      .then(res => {
        console.log(info);
      })
      .catch(e => {
        console.log(e);
      });
  };
  signup = () => {
    var info = {
      user: this.state.username,
      email: this.state.email,
      pass: this.state.password
    };
    axios
      .post("/api/signup", info)
      .then(res => {
        console.log(info);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="App">
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
            onClick={this.signin}
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
            onClick={this.signup}
            color="primary"
            variant="outlined"
          >
            {"Sign Up"}
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
