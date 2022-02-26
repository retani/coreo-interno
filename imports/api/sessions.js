import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Scenes, validateScene } from './scenes.js';

export const Sessions = new Mongo.Collection('sessions');

if (Meteor.isServer) {
    Meteor.publish('session', function sessionPublication(id) {
        return Sessions.find(id);
    });
}

if (Meteor.isServer) {
    Meteor.publish('sessions', function sessionsPublication(id) {
        return Sessions.find({}, {sort: {createdAt: -1}, limit: 10});
    });
}

/*
    if (Meteor.isServer) { // disable optimistic ui for this collection for better sync
    ^^^ this won't work because a resulting async call on play on the video,
        which ios safari won't accept
*/
Meteor.methods({
    'sessions.init'() {
            const sessionId = Sessions.insert({
            createdAt: new Date(),
            paused: true,
            currentScene: 0,
            scenes: Scenes.find().fetch().filter(validateScene).map((scene, index) => ({...scene, paused: true, key: index})),
        });
        console.log('sessions.init', sessionId);
        return sessionId;
    },
    'sessions.update'(sessionId, data) {
        let set = {};
        Object.entries(data).forEach(([key, value]) => {
            set[key] = value;
        });
        Sessions.update(sessionId, {
            $set: set
        });
    },
    'sessions.updateScene'({sessionId, scene}, data) {
        //console.log('sessions.updateScene', scene, data);
        let set = {};
        Object.entries(data).forEach(([key, value]) => {
            set[`scenes.$.${key}`] = value;
        });
        const res = Sessions.update({
            _id: sessionId,
            "scenes._id": scene._id
        }, {
            $set: set
        });
    }
});

export const checkSessions = () => {
    /*
    const sessions = Sessions.find().fetch()
    //console.log('checkSessions', sessions.length)
    for (let session of sessions) {
        if (session.scenes) {
            for (let scene of session.scenes) {
                //console.log(scene)
                if (scene.computerCanplaythrough && scene.phoneCanplaythrough && !scene.canPlay) {
                    Meteor.call('sessions.updateScene', {sessionId: session._id, scene}, {canPlay: true});
                }
            }
        }
    }
    */

    // states:
    //  - preload
    //  - active
}

export const cleanSessions = () => {
    // remove old sessions
    const now = new Date();
    const oldSessions = Sessions.find({createdAt: {$lt: now - 1000 * 60 * 60 * 24}}).fetch();
    for (let session of oldSessions) {
        console.log('removing old session', session._id)
        Sessions.remove(session._id);
    }
}