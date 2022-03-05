import { Meteor } from 'meteor/meteor';
import {Scenes} from '../imports/api/scenes.js';
import { checkSessions, cleanSessions } from '../imports/api/sessions.js';
import '../imports/api/sessions.js';
import { sceneTemplate } from '../imports/lib/helpers.js';
import mediaserver from '../imports/lib/mediaserver.js'

Meteor.startup(() => {
  // code to run on server at startup

  if (Scenes.find().count() === 0) {
    console.log("seeding scenes");
    Scenes.insert({...sceneTemplate, key: 0});
    Scenes.insert({...sceneTemplate, key: 1});
    Scenes.insert({...sceneTemplate, key: 2});
    Scenes.insert({...sceneTemplate, key: 3});
    Scenes.insert({...sceneTemplate, key: 4});
    Scenes.insert({...sceneTemplate, key: 5});
  }

  if (Meteor.isServer) {
    Meteor.setInterval(checkSessions, 1500);
    Meteor.setInterval(cleanSessions, 1000 * 60);
  }

  if (Meteor.isServer) {
    // Listen to incoming HTTP requests, can only be used on the server
    WebApp.rawConnectHandlers.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
      return next();
    });
  }

  if (Meteor.isServer) {
    mediaserver.start();
  }

});

