import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';

import Login from '../components/accounts/Login';

class Welcome extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    if (!this.props.loggedInUser) {
      return <Login />
    }
  }
}

Welcome.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { loggedInUser: Meteor.user() };
}, Welcome);