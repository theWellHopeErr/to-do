import React from "react";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";

import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import axios from "axios";

const styles = theme => ({
  task: {
    textAlign: "-webkit-center",
  },
  header: {
    margin: "1%",
    textAlignLast: "center",
  },
  addNewBtn: {
    position: "absolute",
    left: "1%",
  },
  logo: {
    fontFamily: "Zhi Mang Xing, cursive",
    fontSize: "3em",
    color: '#fc0303',
  },
  signOut: {
    position: "absolute",
    right: 10,
  },
  card: {
    height: "50%;",
    width: "50%",
    textAlign: "-webkit-center",
    border: "1px #fc0303 solid",
    marginTop: "5%"
  },
  addNewDiv: {
    margin: "5%",
  },
  newTask: {
    width: "50%",
    border: "1px #fc0303 solid",
    borderRadius: '4px'
  },
  cancelBtn: {
    borderRadius: "50%",
    minWidth: "50px",
    minHeight: "50px",
  }
})

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTask: "",
      showAddTask: true,
    }
  }

  handleAdd = () => {
    this.setState({
      showAddTask: true
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleAddCancel = () => {
    this.setState({
      showAddTask: false
    })
  }

  handlesubmit = () => {
    console.log('ad');

    var body = {
      userID: window.user,
      task: this.state.newTask
    }
    axios.post('/api/new-task', body)
      .then(res => {
        console.log(res);
      })
      .finally(
        this.setState({
          showAddTask: false
        })
      )
  }

  signOut = () => {
    axios
      .post("/api/signout")
      .then(res => {
        console.log(window.user);
        window.user = null;
        window.location.reload()
        console.log(res);
        console.log(window.user);
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.task}>
        <div className={classes.header}>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleAdd}
            className={classes.addNewBtn}
          >
            <AddIcon />
          </Button>
          <span className={classes.logo}>
            {"{  ToDo }"}
          </span>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.signOut}
            className={classes.signOut}
          >
            {"Sign Out"}
          </Button>
        </div>
        <Collapse in={this.state.showAddTask}>
          <div className={classes.addNewDiv}>
            <TextField
              variant="outlined"
              color="primary"
              className={classes.newTask}
              onChange={this.handleChange('newTask')}
            />
            <Button
              className={classes.cancelBtn}
              onClick={this.handlesubmit}
            >
              <CheckCircleIcon style={{ color: "#4CAF50", fontSize: 30 }} />
            </Button>
            <Button
              color="primary"
              className={classes.cancelBtn}
              onClick={this.handleAddCancel}
            >
              <CancelIcon style={{ fontSize: 30 }} />
            </Button>
          </div>
        </Collapse>
        <Paper
          elevation={4}
          className={classes.card}
          variant="outlined"
        >
          <Typography>
            {"Nothing Yet :("}
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Task)