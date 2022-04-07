import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Texts = new Mongo.Collection('texts');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('texts', function textsPublication() {
        return Texts.find({});
    });
}

Meteor.methods({
    'texts.update'(texts = []) {

        // Make sure the user is logged in before inserting a task
        //if (!this.userId) {
        //    throw new Meteor.Error('not-authorized');
        //}

        console.log('scenes.update', texts);

        for (let text of texts) {
          Texts.update(text._id, text);
        }
    },
});
