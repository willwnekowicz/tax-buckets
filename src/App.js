import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import { loginUser } from './user/ui/loginbutton/LoginButtonActions'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  "palette": {
    "type": "light",
    "primary": {
      "50": "#0096FB",
      "100": "#0096FB",
      "200": "#0096FB",
      "300": "#0096FB",
      "400": "#0096FB",
      "500": "#0096FB",
      "600": "#0096FB",
      "700": "#0096FB",
      "800": "#0096FB",
      "900": "#0096FB",
      "A100": "#0096FB",
      "A200": "#0096FB",
      "A400": "#0096FB",
      "A700": "#0096FB",
      "contrastDefaultColor": "light"
    },
  }
});

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/signup" className="pure-menu-link">Sign Up</Link>
        </li>
        <LoginButtonContainer />
      </span>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <nav className="navbar pure-menu pure-menu-horizontal">
            <Link to="/" className="pure-menu-heading pure-menu-link">Tax Buckets</Link>
            <ul className="pure-menu-list navbar-right">
              <OnlyGuestLinks />
              <OnlyAuthLinks />
            </ul>
          </nav>

          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLoggingIn: () => {
      dispatch(loginUser())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer