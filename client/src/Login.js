import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';

import axios from "axios";

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: '2%',
  },

  paper: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      height: '30%',
      width: '50%',
      margin: '-15% 0 0 -25%',
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(23)}px`,
    },
    margin: '15% 10%',
    display: 'flex',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    flexDirection: 'column',
  },

  logo: {
    fontFamily: "Zhi Mang Xing, cursive",
    fontSize: "3em",
    color: '#fc0303',
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
    cursor: 'pointer',
    height: 'fit-content',
    '&.hover': {
      background: 'black'
    },
  },

  signInBtn: {
    display: 'flex',
    flexGrow: '0.5',
    justifyContent: 'center',
    paddingBottom: `${theme.spacing(2)}px`,
    cursor: 'pointer',
    height: 'fit-content'
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
      showPassword: false,
      showSignIn: false,
      showSignUp: true,
      signInError: '',
      signUpError: '',
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

  showPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }))
  }

  signIn = () => {
    var body = {
      user: this.state.username.toLowerCase().trim(),
      pass: this.state.password
    };
    axios
      .post("/api/signin", body)
      .then(res => {
        window.userID = res.data.id
        window.userName = res.data.name
        this.props.setDetails();
      })
      .catch(e => {
        this.setState({
          signInError: e.response.data.error
        })
      });
  };

  signUp = () => {
    if (/\S+@\S+\.\S+/.test(this.state.email)) {
      var body = {
        user: this.state.username.toLowerCase().trim(),
        email: this.state.email.toLowerCase().trim(),
        pass: this.state.password
      };
      axios
        .post("/api/signup", body)
        .then(res => {
          window.useruserID = res.data.id
          window.userName = res.data.name
          this.props.setDetails();
          window.location.reload()
        })
        .catch(e => {
          this.setState({
            signUpError: e.response.data.error
          })
        });
    }
    else {
      this.setState({
        signUpError: "I haven't seen this kind of an email in my life"
      })
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <span className={classes.logo}>
          {"{  ToDo }"}
        </span>
        <Paper elevation={4} className={classes.paper}>
          <div className={classes.tab}>
            <div onClick={this.toggleSignUp} className={classes.signUpBtn}>
              <Typography color='primary' variant="button" style={{ fontSize: "1.1em" }}>
                {"Sign Up"}
              </Typography>
            </div>
            <div onClick={this.toggleSignIn} className={classes.signInBtn}>
              <Typography color='primary' variant="button" style={{ fontSize: "1.1em" }}>
                {"Sign In"}
              </Typography>
            </div>
          </div>
          {this.state.showSignUp &&
            <div className={classes.signUp}>
              <Typography color='primary'>
                {this.state.signUpError}
              </Typography>
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
                type={this.state.showPassword ? "text" : "password"}
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange("password")}
                className={classes.fields}
              />
              <div
                style={{ flexDirection: "row", cursor: 'pointer' }}
                onClick={this.showPassword}
              >
                <Checkbox color="primary" checked={this.state.showPassword} />
                {"Show Password"}
              </div>
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
              <Typography color='primary'>
                {this.state.signInError}
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleChange("username")}
                className={classes.fields}
              />
              <TextField
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange("password")}
                className={classes.fields}
              />
              <div
                style={{ flexDirection: "row", cursor: 'pointer' }}
                onClick={this.showPassword}
              >
                <Checkbox color="primary" checked={this.state.showPassword} />
                {"Show Password"}
              </div>
              <Button
                onClick={this.signIn}
                color="primary"
                variant="outlined"
                className={classes.fields}
              >
                {"Sign In"}
              </Button>
              <Typography onClick={this.toggleSignUp} style={{ color: "#0000ff", textDecoration: "underline", cursor: "pointer", marginTop: '3%' }}>
                {"New Here... Jump In"}
              </Typography>
            </div>
          }
        </Paper>
      </div >
    );
  }
}

export default withStyles(styles)(Login);
