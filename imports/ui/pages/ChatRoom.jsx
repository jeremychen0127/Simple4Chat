import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = () => {
      Meteor.logout(() => {});
      FlowRouter.go(FlowRouter.path("login"));
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    return (
      <div className="row">
        <div className="col offset-m3 m6">
          <br /><br />
          <br /><br />
          <div className="center" >
            <FlatButton label="Sign Out" onClick={this.handleLogout}/>
          </div>
          <br /><br />
        </div>
      </div>
    );
  }
}

ChatRoom.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};