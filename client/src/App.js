import React from "react";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import withTheme from '@material-ui/core/styles/withTheme';
import "./App.css";
import axios from "axios";

import Login from "./Login"
import Tasks from "./Tasks"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#673ab7',
      light: '#9a67ea',
      dark: '#320b86',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#6a1b9a',
      light: '#9c4dcc',
      dark: '#38006b',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    useNextVariants: true,
  },
});


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: window.user
    }
  }

  componentDidMount() {
    axios.post('/api/whoami')
      .then(res => {
        if (res.data) {
          window.user = res.data
          this.setDetails()
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  setDetails = () => {
    this.setState({
      user: window.user
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {!this.state.user &&
          <Login setDetails={this.setDetails} />
        }
        {this.state.user &&
          <Tasks />
        }
      </MuiThemeProvider>
    )
  }
}

export default withTheme(App);
