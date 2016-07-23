import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const MessagesCollection = new Mongo.Collection("sim.messages");

if (Meteor.isServer) {
  Meteor.publish("sim.messages", function () {
    return MessagesCollection.find({$or: [{senderId: this.userId}, {receiverIds: this.userId}] });
  });
  
  Meteor.methods({
    "sim.messages.addMessage": function (message) {
      message.createdAt = new Date();
      
      MessagesCollection.insert(message);
    }
  });
}