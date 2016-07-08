import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';

export default class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col offset-m3 m6">
          <br /><br />
          <br /><br />
          <div className="center">
            <AccountsUIWrapper />
          </div>
          <br /><br />
        </div>
      </div>
    );
  }
}