import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';

import axios from "axios";

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '30%',
    width: '50%',
    margin: '-15% 0 0 -25%',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(16)}px`,
  },

  tab: {
    display: 'flex',
    flexDirection: 'row'
  },

  signUpBtn: {
    display: 'flex',
    flexGrow: '0.5',
    justifyContent: 'center',
    paddingBottom: `${theme.spacing(2)}px`,
    cursor: 'pointer'
  },

  signInBtn: {
    display: 'flex',
    flexGrow: '0.5',
    justifyContent: 'center',
    paddingBottom: `${theme.spacing(2)}px`,
    cursor: 'pointer'
  },

  signUp: {
    display: 'flex',
    flexDirection: 'column',
  },

  signIn: {
    display: 'flex',
    flexDirection: 'column',
  },

  fields: {
    margin: `${theme.spacing(1)}px`
  },

  forgot: {
    color: '#0031ff',
    alignSelf: 'center',
    marginTop: `${theme.spacing(4)}px`,
  },
})


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      showSignIn: false,
      showSignUp: true
    };
  }

  toggleSignUp = () => {
    this.setState({
      showSignIn: false,
      showSignUp: true
    })
  }

  toggleSignIn = () => {
    this.setState({
      showSignIn: true,
      showSignUp: false
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  signIn = () => {
    var body = {
      user: this.state.username,
      pass: this.state.password
    };
    axios
      .post("/api/signin", body)
      .then(res => {
        console.log(res.data);
        window.userID = res.data.id
        window.userName = res.data.name
        this.props.setDetails();
      })
      .catch(e => {
        console.log(e);
      });
  };

  signUp = () => {
    // TODO: Problem - Have to reload to enter
    var body = {
      user: this.state.username,
      email: this.state.email,
      pass: this.state.password
    };
    axios
      .post("/api/signup", body)
      .then(res => {
        console.log(res.data);
        window.useruserID = res.data.id
        window.userName = res.data.name
        this.props.setDetails();
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <div className={classes.tab}>
            <div onClick={this.toggleSignUp} className={classes.signUpBtn}>
              {"Sign Up"}
            </div>
            <div onClick={this.toggleSignIn} className={classes.signInBtn}>
              {"Sign In"}
            </div>
          </div>
          {this.state.showSignUp &&
            <div className={classes.signUp}>
              <TextField
                label="Username"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleChange("username")}
                className={classes.fields}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleChange("email")}
                className={classes.fields}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange("password")}
                className={classes.fields}
              />
              <Button
                onClick={this.signUp}
                color="primary"
                variant="outlined"
                className={classes.fields}
              >
                {"Sign Up"}
              </Button>
            </div>
          }

          {this.state.showSignIn &&
            <div className={classes.signIn}>
              <TextField
                label="Username"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleChange("username")}
                className={classes.fields}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange("password")}
                className={classes.fields}
              />
              <Button
                onClick={this.signIn}
                color="primary"
                variant="outlined"
                className={classes.fields}
              >
                {"Sign In"}
              </Button>
              <span className={classes.forgot}>
                {"Forgot Password"}
              </span>
            </div>
          }
        </Paper>
      </div >
    );
  }
}

export default withStyles(styles)(Login);
