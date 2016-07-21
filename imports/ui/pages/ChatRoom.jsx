import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class ChatRoom extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    return (
      <div className="row">
        <div className="col offset-m3 m6">
          <textarea placeholder="Type your message..."/>
        </div>
      </div>
    );
  }
}

ChatRoom.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};