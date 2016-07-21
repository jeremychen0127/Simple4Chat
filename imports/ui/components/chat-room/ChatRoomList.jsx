import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { ChatRoomsCollection } from '../../../api/chat_rooms';

class ChatRoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpenChange = () => this.setState({open: !this.state.open});
  }

  renderChatRoomList() {
    return this.props.rooms.map((room) => {
      return <MenuItem key={room._id} primaryText={room.name} />;
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.handleOpenChange}>My Chat Rooms</a>
        <Drawer width={200} openSecondary={true} open={this.state.open} containerStyle={{marginTop: '60px'}}>
          {this.renderChatRoomList()}
        </Drawer>
      </div>
    );
  }
}

export default createContainer(() => {
  let handle = Meteor.subscribe("sim.chat_rooms");
  if (handle.ready()) {
    let myRooms = ChatRoomsCollection.find({}).fetch();

    return { rooms: myRooms };
  }

  return { rooms: [] };
}, ChatRoomList)