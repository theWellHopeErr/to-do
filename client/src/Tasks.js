import React from "react";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

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
    color: '#fc0303',
  },
  signOut: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  card: {
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
      userName: window.userName,
      newTask: "",
      showAddTask: false,
      checked: false,
      open: [],
      closed: [],
    }
  }

  componentDidMount() {
    axios.get('/api')
      .then(res => {
        var closed = [], open = []
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].completed)
            closed.push(res.data[i])
          else
            open.push(res.data[i])
        }
        console.log(open)
        console.log(closed)
        this.setState({
          closed: closed,
          open: open
        })
      })
      .catch(e => {
        console.log(e);
      })
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
    var body = {
      userID: window.userID,
      task: this.state.newTask
    }
    axios
      .post('/api/new-task', body)
      .then(res => {
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
        console.log(window.user);
      })
      .catch(e => {
        console.log(e);
      })
  }


  handleChecked = (i) => {
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
    console.log(this.state.open);
    console.log(this.state.closed);
  }

  handleUnchecked = (i) => {
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
    console.log(this.state.open);
    console.log(this.state.closed);
  }

  render() {
    const { classes } = this.props;
    // const { open, closed } = this.state
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
          <List>
            {
              this.state.open.map((task, i) => {
                return (
                  <ListItem key={task.id}>
                    <ListItemIcon>
                      <Checkbox
                        color="primary"
                        onChange={() => this.handleChecked(i)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={task.task} />
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                  </ListItem>
                )
              })
            }
          </List>

          <List>
            {
              this.state.closed.map((task, i) => {
                return (
                  <ListItem key={task.id}>
                    <ListItemIcon style={{ opacity: "50%" }}>
                      <Checkbox
                        defaultChecked
                        onChange={() => this.handleUnchecked(i)}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText primary={task.task} style={{ opacity: "50%" }} />

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
        </Paper>
      </div >
    )
  }
}

export default withStyles(styles)(Task)