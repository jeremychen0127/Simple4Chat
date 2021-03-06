import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { ChatRoomsCollection } from '../../../api/chat_rooms';

const styles = {
  roomListItem: {
    fontFamily: 'Patua One, cursive',
    color: '#455a64',
  },
}

class ChatRoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpenChange = () => this.setState({open: !this.state.open});

    this.handleRoomChange = (event, value) => {
      FlowRouter.setQueryParams({id: value});
    }
  }

  renderChatRoomList() {
    return this.props.rooms.map((room) => {
      return (
        <MenuItem
          key={room._id}
          value={room._id}
          style={styles.roomListItem}
          primaryText={room.name} />
      );
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.handleOpenChange}>My Chat Rooms</a>
        <Drawer width={200} openSecondary={true} open={this.state.open}
                containerStyle={{marginTop: '60px'}}>
          <Menu onChange={this.handleRoomChange}>
            {this.renderChatRoomList()}
          </Menu>
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