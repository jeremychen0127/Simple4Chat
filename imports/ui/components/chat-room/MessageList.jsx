import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { MessagesCollection } from '../../../api/messages';

var Infinite = require('react-infinite');

class MessageList extends Component {
  renderMessages() {
    return this.props.messages.map((message) => {
      if (message.senderId === Meteor.userId()) {
        return (
          <div className="col offset-s6 s6 friend-chip">{message.content}</div>
        );
      } else {
        return (
          <div className="col s6 friend-chip">{message.content}</div>
        );
      }
    });
  }

  render() {
    return (
      <div className="row">
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