import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Sessions = new Mongo.Collection('sessions');

if (Meteor.isServer) {
    Meteor.publish('session', function sessionPublication(id) {
        return Sessions.find(id);
    });
}

Meteor.methods({
    'sessions.init'() {
            const sessionId = Sessions.insert({
            createdAt: new Date(),
            paused: true,
        });
        console.log(sessionId)
        return sessionId;
    },
    'sessions.update'(sessionId, data) {
        Sessions.update(sessionId, {
            $set: data
        });
    }
});