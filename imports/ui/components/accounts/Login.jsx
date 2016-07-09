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

    this.handleLogin = (username, password) => {
      Accounts.createUser({username: username, password: password});
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
                <input id="username" type="text" placeholder="Your UserName" className="validate" style={styles.inputField}/>
              </div>
            </div>
            <div className="row">
              <div className="col offset-s1 s10 offset-m3 m6 offset-l4 l4 input-field" style={styles.inputDiv}>
                <input id="password" type="password" placeholder="Your Password" className="validate" style={styles.inputField}/>
              </div>
            </div>
            <div className="row">
              <div className="center">
                <RaisedButton label="Log In" backgroundColor="#ffe0b2"/>
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