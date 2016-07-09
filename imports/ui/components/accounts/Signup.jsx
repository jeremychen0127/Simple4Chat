import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

import { FlowRouter } from 'meteor/kadira:flow-router';

const styles = {
  inputField: {
    fontSize: '16px',
  },
};

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordAgain: '',
      isPasswordVerified: true,
      isUsernameValid: true,
    };

    this.handleUsernameChange = (event) => {
      let existingUsername = Meteor.users.findOne({username: event.currentTarget.value});
      if (existingUsername) {
        this.setState({isUsernameValid: false});
      } else {
        this.setState({isUsernameValid: true});
      }
      this.setState({username: event.currentTarget.value});
    };

    this.handlePasswordChange = (event) => {
      let isSamePassword = event.currentTarget.value === this.state.passwordAgain;
      this.setState({password: event.currentTarget.value, isPasswordVerified: isSamePassword});
    };

    this.handlePasswordAgainChange = (event) => {
      let isSamePassword = this.state.password === event.currentTarget.value;
      this.setState({passwordAgain: event.currentTarget.value, isPasswordVerified: isSamePassword});
    };

    this.handleSignUp = () => {
      Accounts.createUser({username: this.state.username, password: this.state.password});
      this.setState({username: '', password: '', passwordAgain: ''});
      FlowRouter.go("/chat-room");
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    return (
      <div>
        <br /><br />
        <br /><br />
        <form>
          <div className="row">
            <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field">
              <input value={this.state.username} onChange={this.handleUsernameChange}
                     id="username" type="text" placeholder="Your UserName" className="validate" style={styles.inputField}/>
              <div className={this.state.isUsernameValid ? 'hide' : ''} style={{color: 'red'}}>This username has been taken</div>
            </div>
          </div>
          <div className="row">
            <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field">
              <input value={this.state.password} onChange={this.handlePasswordChange}
                     id="password" type="password" placeholder="Your Password" className="validate" style={styles.inputField}/>
            </div>
          </div>
          <div className="row">
            <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field">
              <input value={this.state.passwordAgain} onChange={this.handlePasswordAgainChange}
                     id="password" type="password" placeholder="Re-enter Your Password" className="validate" style={styles.inputField}/>
              <div className={this.state.isPasswordVerified ? 'hide' : ''} style={{color: 'red'}}>Password does not match</div>
            </div>
          </div>
          <div className="row">
            <div className="center">
              <RaisedButton onClick={this.handleSignUp} label="Register & Start Chatting" backgroundColor="#ffe0b2"
                            disabled={!this.state.isPasswordVerified || !this.state.isUsernameValid || !this.state.username} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Signup.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};