import { Meteor } from 'meteor/meteor';

export default {
  createMessage(receiverIds, content) {
    return {
      senderId: Meteor.userId(),
      receiverIds: receiverIds,
      content: content,
    }
  }
}