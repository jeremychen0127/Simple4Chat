import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  inputField: {
    fontSize: '16px',
  },
  inputDiv: {
    paddingRight: '30px',
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isCredentialWrong: false,
    };

    this.handleUsernameChange = (event) => this.setState({username: event.currentTarget.value, isCredentialWrong: false});
    this.handlePasswordChange = (event) => this.setState({password: event.currentTarget.value, isCredentialWrong: false});

    this.handleLogIn = () => {
      Meteor.loginWithPassword(this.state.username, this.state.password, (Error) => {
        this.setState({isCredentialWrong: true, username: '', password: ''});
      });
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    return (
      <div className="row">
          <br /><br />
          <br /><br />
          <form>
            <div className="row">
              <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field" style={styles.inputDiv}>
                <input value={this.state.username} onChange={this.handleUsernameChange}
                       id="username" type="text" placeholder="Your UserName" className="validate" style={styles.inputField}/>
              </div>
            </div>
            <div className="row">
              <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field" style={styles.inputDiv}>
                <input value={this.state.password} onChange={this.handlePasswordChange}
                       id="password" type="password" placeholder="Your Password" className="validate" style={styles.inputField}/>
              </div>
            </div>
            <div className="row">
              {
                this.state.isCredentialWrong ?
                  <div className="center">
                    <div style={{color: 'red'}}>Username and/or Password is not correct</div>
                  </div>
                :
                  ''
              }
              <br />
              <div className="center">
                <RaisedButton onClick={this.handleLogIn} label="Log In" backgroundColor="#ffe0b2"
                              disabled={!this.state.username || !this.state.password} />
              </div>
            </div>
          </form>
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};