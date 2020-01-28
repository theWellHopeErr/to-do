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
      main: '#fc0303',
      light: '#ea6767',
      dark: '#860b0b',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e09728',
      light: '#c6cc4d',
      dark: '#6b0000',
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
