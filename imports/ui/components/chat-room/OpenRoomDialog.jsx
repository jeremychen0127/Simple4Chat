import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
  inputField: {
    fontSize: '16px',
  },
  inputDiv: {
    paddingRight: '30px',
  }
};

class OpenRoomDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      roomName: 'New Chat Room',
      usernameInput: '',
      friends: [],
    };

    this.handleOpen = () => this.setState({open: true});
    this.handleClose = () => this.setState({open: false});

    this.handleRoomNameChange = (event) => this.setState({roomName: event.currentTarget.value});

    this.handleUserSelect = (chosenRequest, index) => {
      let friends = this.state.friends;
      let filtered = friends.filter((friend) => { return friend.username === chosenRequest; });
      if (filtered.length === 0) {
        friends.push(Meteor.users.findOne({username: chosenRequest}));
        this.setState({friends: friends, usernameInput: ''});
      } else {
        this.setState({usernameInput: ''});
      }
    };

    this.handleInputChange = (searchText, dataSource) => {
      this.setState({usernameInput: searchText});
    };

    this.onDeleteClicked = (event) => {
      let id = event.target.id.replace("f_","");
      let friends = _.reject(this.state.friends, (friend) => {return friend._id === id});
      this.setState({friends: friends});
    }

    this.handleOpenRoom = () => {
      Meteor.call("sim.chat_rooms.addChatRoom", this.state.roomName, this.state.friends);
      this.setState({open: false, roomName: 'New Chat Room', usernameInput: '', friends: []});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.usernameInput === "") {
      $('#add-friends').val('');
    }
  }

  renderAddedFriends() {
    return this.state.friends.map((friend) => {
      return (
        <div className="friend-chip" key={friend._id}>
          {friend.username}
          <i className="material-icons " onClick={this.onDeleteClicked} id={"f_" + friend._id}>close</i>
        </div>
      );
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        labelStyle={{color: '#a3832d'}}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Open Room!"
        backgroundColor="#fff3e0"
        labelStyle={{color: '#a3832d'}}
        onTouchTap={this.handleOpenRoom}
      />,
    ];

    return (
      <div>
        <a onClick={this.handleOpen}>New Room</a>
        <Dialog
          title="Open New Room"
          titleClassName="center"
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}>
            <div className="row">
              <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field">
                <div className="input-label">Room Name</div>
                <input value={this.state.roomName} onChange={this.handleRoomNameChange}
                       id="roomName" type="text" placeholder="New Room" className="validate" style={styles.inputField}/>
              </div>
            </div>

            {
              this.state.friends.length > 0 ?
                <div className="row">
                  <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field">
                    {this.renderAddedFriends()}
                  </div>
                </div>
              :
                ''
            }

            <div className="row">
              <div className="col offset-s1 s1 offset-m3 m1 offset-l4 l1">
                <div className="right" style={{marginTop: '25px'}}>
                  <i className="material-icons">search</i>
                </div>
              </div>
              <div id="userSearch" className="col s10 m6 l4 input-field">
                <AutoComplete
                  id="add-friends"
                  placeholder="Type username to find friends..."
                  filter={AutoComplete.caseInsensitiveFilter}
                  onNewRequest={this.handleUserSelect}
                  onUpdateInput={this.handleInputChange}
                  dataSource={this.state.usernameInput.length > 1 ? this.props.usernames : []}
                  openOnFocus={true}
                />
              </div>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default createContainer(() => {
  let usernames = Meteor.users.find({}, {fields: {username: 1}}).fetch().map((user) => {
    return user.username;
  });
  return { usernames: usernames};
}, OpenRoomDialog);