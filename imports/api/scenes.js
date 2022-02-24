import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Scenes = new Mongo.Collection('scenes');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('scenes', function tasksPublication() {
        return Scenes.find({});
    });
}

Meteor.methods({
    'scenes.update'(scene) {

        // Make sure the user is logged in before inserting a task
        //if (!this.userId) {
        //    throw new Meteor.Error('not-authorized');
        //}

        console.log('scenes.update', scene);

        Scenes.upsert(scene._id,scene);
    },
});