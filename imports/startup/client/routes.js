import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Layout } from '../../ui/layouts/Layout';
import Welcome from '../../ui/pages/Welcome';
import Login from '../../ui/components/accounts/Login';
import Signup from '../../ui/components/accounts/Signup';
import ChatRoom from '../../ui/pages/ChatRoom';

FlowRouter.route('/', {
  name: 'index',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      redirect('/login');
    } else {
      redirect('/chat-room');
    }
  }]
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    mount(Layout, {content: <Login />});
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    mount(Layout, {content: <Signup />});
  }
});

FlowRouter.route('/chat-room', {
  name: 'chatRoom',
  action() {
    mount(Layout, {content: <ChatRoom />});
  }
});

Accounts.onLogin(function() {
  var routeName = FlowRouter.getRouteName();
  // we only do it if the user is in the login page
  if(routeName === "login") {
    FlowRouter.go("/chat-room");
  }
});