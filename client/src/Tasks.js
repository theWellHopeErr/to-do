import React from 'react';
import { Button } from '@material-ui/core';

import axios from "axios";

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  signOut = () => {
    axios
      .post('/api/signout')
      .then(res => {
        console.log(window.user);

        window.user = null;
        console.log(res);
        console.log(window.user);
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    return (
      <div className="Task">
        <Button
          variant='outlined'
          color='primary'
          onClick={this.signOut}
        >
          Sign Out
          </Button>
      </div>
    )
  }
}

export default Task