import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const ChatRoomsCollection = new Mongo.Collection("sim.chat_rooms");

if (Meteor.isServer) {
  Meteor.publish("sim.chat_rooms", function () {
    return ChatRoomsCollection.find({$or: [{hostId: this.userId}, {friendIds: this.userId}] });
  });
  
  Meteor.methods({
    "sim.chat_rooms.addChatRoom": function (name, friends) {
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      let friendIds = friends.map((friend) => {
        return friend._id;
      });

      ChatRoomsCollection.insert({
        name: name,
        hostId: Meteor.userId(),
        type: 'chat_room',
        friendIds: friendIds
      });
    }
  });
}
