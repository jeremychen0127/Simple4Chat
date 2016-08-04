import React, { Component } from 'react';
import _ from 'underscore';
import { createContainer } from 'meteor/react-meteor-data';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MessageList from '../components/chat-room/MessageList';

import { ChatRoomsCollection } from '../../api/chat_rooms';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleMessageSent = this.handleMessageSent.bind(this);

    this.handleMessageChange = (event) => this.setState({message: event.currentTarget.value});
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  componentDidMount() {
    this.textareaResize();
  }

  componentDidUpdate() {
    this.textareaResize();
  }

  textareaResize() {
    autosize($('#messageInput'));
  }

  handleMessageSent(event) {
    event.preventDefault();
    let message = Factory.createMessage(this.props.receiverIds, this.state.message);
    Meteor.call("sim.messages.addMessage", message);
    this.setState({message: ''});
  }

  render() {
    if (this.props.roomId) {
      return (
        <div className="container">
          <MessageList />
          <br />
          <div className="row">
            <div className="col offset-m2 m8">
                <textarea value={this.state.message} rows={3} onChange={this.handleMessageChange}
                          id="messageInput" placeholder="Type your message..."></textarea>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

ChatRoom.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ChatRoom.propTypes = {
  roomId: React.PropTypes.string,
};

export default createContainer((params) => {
  const { roomId } = params;

  if (roomId) {
    let handle = Meteor.subscribe("sim.chat_rooms");
    if (handle.ready()) {
      let room = ChatRoomsCollection.findOne({_id: roomId});
      let receiverIds = _.union(room.friendIds, [room.hostId]);

      return {receiverIds: receiverIds};
    }

    return {};
  }
  return {};
}, ChatRoom);