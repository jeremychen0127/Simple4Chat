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
      roomName: 'New Chat 1',
      usernameInput: 'hgi',
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
  }

  renderAddedFriends() {
    return this.state.friends.map((friend) => {
      return (
        <div>{friend.username}</div>
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
        onTouchTap={this.handleClose}
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
            {this.renderAddedFriends()}
            <div className="row">
              <div id="userSearch" className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field">
                <AutoComplete
                  floatingLabelText="Type username to add friends..."
                  filter={AutoComplete.caseInsensitiveFilter}
                  onNewRequest={this.handleUserSelect}
                  searchText={this.state.usernameInput}
                  onUpdateInput={this.handleInputChange}
                  dataSource={this.props.usernames}
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