import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { MessagesCollection } from '../../../api/messages';

var Infinite = require('react-infinite');

class MessageList extends Component {
  renderMessages() {
    let noMargins = {marginTop: '0px', marginBottom: '0px'};

    return this.props.messages.map((message) => {
      if (message.senderId === Meteor.userId()) {
        return (
          <div className="row" style={noMargins}>
            <div className="col offset-s8 s4 friend-chip">{message.content}</div>
          </div>
        );
      } else {
        return (
          <div className="row" style={noMargins}>
            <div className="col s4 friend-chip">{message.content}</div>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}

export default createContainer(() => {
  Subs.subscribe("sim.messages");

  if (Subs.ready()) {
    let messages = MessagesCollection.find({}, {sort: {createdAt: 1}}).fetch();
    return { messages: messages };
  }

  return { messages: [] };
}, MessageList);