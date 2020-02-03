import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";

const styles = theme => ({
  task: {
    textAlign: "-webkit-center",
    marginBottom: "5%"
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
    color: "#fc0303",
  },

  signOut: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  card: {
    [theme.breakpoints.down("md")]: {
      width: "90%;",
    },
    height: "50%;",
    width: "50%",
    textAlign: "-webkit-center",
    border: "1px #fc0303 solid",
    marginTop: "2.5%"
  },

  addNewDiv: {
    margin: "5%",
  },

  newTask: {
    width: "50%",
    border: "1px #fc0303 solid",
    borderRadius: "4px"
  },

  cancelBtn: {
    borderRadius: "50%",
    minWidth: "50px",
    minHeight: "50px",
  },

  deleteDiv: {
    [theme.breakpoints.down("md")]: {
      minWidth: "0px"
    }
  }
})

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: window.userName,
      newTask: "",
      showAddTask: false,
      checked: false,
      open: [],
      closed: [],
    }
  }

  componentDidMount() {
    this.getTasks()
  }

  getTasks = () => {
    axios.get("/api")
      .then(res => {
        var closed = [], open = []
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].completed)
            closed.push(res.data[i])
          else
            open.push(res.data[i])
        }
        this.setState({
          closed: closed,
          open: open
        })
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleAddBtn = () => {
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
    var body = {
      userID: window.userID,
      task: this.state.newTask
    }
    axios
      .post("/api/new-task", body)
      .then(res => {
        this.getTasks()
      })
      .finally(
        this.setState({
          newTask: "",
          showAddTask: false
        })
      )
  }

  signOut = () => {
    axios
      .post("/api/signout")
      .then(res => {
        window.user = null;
        window.location.reload()
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleCheck = (i) => {
    var body = {
      id: this.state.open[i].id,
      status: "t"
    }
    axios
      .post("/api/update-status", body)
      .catch(e => {
        console.log(e);
      })
    var openTasks = this.state.open
    var closedTasks = this.state.closed
    var changedTask = this.state.open[i]
    changedTask.completed = true
    openTasks.splice(i, 1)
    closedTasks.push(changedTask)
    this.setState({
      open: openTasks,
      closed: closedTasks,
    })
  }

  handleUncheck = (i) => {
    var body = {
      id: this.state.closed[i].id,
      status: "f"
    }
    axios
      .post("/api/update-status", body)
      .then(res => {
      })
      .catch(e => {
        console.log(e);
      })
    var openTasks = this.state.open
    var closedTasks = this.state.closed
    var changedTask = this.state.closed[i]
    changedTask.completed = false
    closedTasks.splice(i, 1)
    openTasks.push(changedTask)
    this.setState({
      open: openTasks,
      closed: closedTasks,
    })
  }

  handleDelete = (id) => {
    var body = {
      id: id
    }
    axios
      .post("/api/delete-task", body)
      .then(res => {
        this.getTasks()
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
            onClick={this.handleAddBtn}
            className={classes.addNewBtn}
          >
            <AddIcon />
          </Button>

          <span className={classes.logo}>
            {"{  ToDo }"}
            <br />
            <br />
            {"Hey, "}{window.userName}
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
              placeholder="New task to do"
              value={this.state.newTask}
              className={classes.newTask}
              onChange={this.handleChange("newTask")}
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
          <List>
            {
              this.state.open.map((task, i) => {
                return (
                  <ListItem key={task.id}>
                    <ListItemIcon>
                      <Checkbox
                        color="primary"
                        onChange={() => this.handleCheck(i)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={task.task} />
                    <ListItemIcon onClick={() => this.handleDelete(task.id)} className={classes.deleteDiv}>
                      <DeleteIcon />
                    </ListItemIcon>
                  </ListItem>
                )
              })
            }
          </List>
          {
            this.state.open.length === 0 && this.state.closed.length === 0 &&
            <Typography>
              {"Nothing Yet :("}
            </Typography>
          }
          <List>
            {
              this.state.closed.map((task, i) => {
                return (
                  <ListItem key={task.id}>
                    <ListItemIcon style={{ opacity: "50%" }}>
                      <Checkbox
                        defaultChecked
                        onChange={() => this.handleUncheck(i)}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText primary={task.task} style={{ opacity: "50%" }} />
                    <ListItemIcon onClick={() => this.handleDelete(task.id)} className={classes.deleteDiv} >
                      <DeleteIcon />
                    </ListItemIcon>
                  </ListItem>
                )
              })
            }
          </List>
        </Paper>
      </div >
    )
  }
}

export default withStyles(styles)(Task)