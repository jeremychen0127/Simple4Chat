import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  leftNavMenuItem: {
    fontFamily: 'Patua One, cursive',
    color: '#455a64',
  },

  leftNavMenuItemIcon: {
    color: '#546e7a',
  },

  leftNavMenuItemMobile: {
    fontSize: '25px',
    fontFamily: 'Patua One, cursive',
    height: '70px',
    paddingTop: '10px',
    color: '#455a64',
  },

  leftNavMenuItemMobileIcon: {
    fontSize: '30px',
    marginTop: '8px',
    color: '#546e7a',
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftNavOpen: false,
    };

    this.handleLeftNavToggle = (event) => {
      event.preventDefault();
      this.setState({leftNavOpen: !this.state.leftNavOpen});
    }

    this.handleLogout = () => {
      Meteor.logout(() => {});
      FlowRouter.go(FlowRouter.path("login"));
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({leftNavOpen: false});
  }

  renderLeftNav() {
    return (
      <div >
        <Drawer open={this.state.leftNavOpen} docked={false} className="hide-on-small-and-down"
                onRequestChange={(open, reason) => { this.setState({leftNavOpen:open}) }}
                width={200} style={{zIndex:9999}}>

          <MenuItem style={styles.leftNavMenuItem} onTouchTap={this.handleLogout} primaryText="Log Out"
                    leftIcon={<FontIcon style={styles.leftNavMenuItemIcon} className="material-icons">exit_to_app</FontIcon>}/>
        </Drawer>

        <Drawer open={this.state.leftNavOpen} docked={false} className="hide-on-med-and-up"
                onRequestChange={(open, reason) => { this.setState({leftNavOpen:open}) }}
                width={250} style={{zIndex:9999}}>
          <MenuItem style={styles.leftNavMenuItemMobile} onTouchTap={this.handleLogout} primaryText="Log Out"
                    leftIcon={<FontIcon style={styles.leftNavMenuItemMobileIcon} className="material-icons">exit_to_app</FontIcon>}/>
        </Drawer>
      </div>
    );
  }

  render() {
    return (
      <div className="navbar">
        <ul>
          <div>
            <div className="hide-on-med-and-up">
              <li>
                <i className="material-icons"
                   style={{color: 'white', cursor: 'pointer', fontSize: '45px', margin: '20px'}}
                   onClick={this.handleLeftNavToggle}>
                  menu
                </i>
              </li>
              <li style={{marginTop: '10px', float: 'right'}}><a id="logo" href="/" style={{fontSize: '25px'}}>Simple 4 Chat</a></li>
            </div>

            <div className="hide-on-small-and-down">
              <li style={{marginTop: '5px', marginLeft: '10px'}}>
                <i className="material-icons"
                   style={{color: 'white', cursor: 'pointer', fontSize: '30px', margin: '10px'}}
                   onClick={this.handleLeftNavToggle}>
                  menu
                </i>
              </li>
              <li style={{float: 'right'}}><a id="logo" href="/" style={{fontSize: '20px'}}>Simple 4 Chat</a></li>
            </div>
          </div>
        </ul>
        {this.renderLeftNav()}
      </div>
    );
  }
}

Navbar.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { loggedInUser: Meteor.user() }
}, Navbar);