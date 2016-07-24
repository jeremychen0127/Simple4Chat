import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({}, {fields: {username: 1} } );
  })
}