import { Meteor } from 'meteor/meteor';
import {Scenes} from '../imports/api/scenes.js';
import {Texts} from '../imports/api/texts.js';
import { checkSessions, cleanSessions } from '../imports/api/sessions.js';
import '../imports/api/sessions.js';
import { sceneTemplate } from '../imports/lib/helpers.js';
import mediaserver from '../imports/lib/mediaserver.js'

import Welcome from '../imports/seeds/Welcome.svx.js';
import PhoneInstructions from '../imports/seeds/PhoneInstructions.svx.js';
import Scan1 from '../imports/seeds/Scan1.svx.js';
import Scan2 from '../imports/seeds/Scan2.svx.js';
import PhoneThanks from '../imports/seeds/PhoneThanks.svx.js';
import ComputerThanks from '../imports/seeds/ComputerThanks.svx.js';

const textSeeds = [
  Welcome,
  PhoneInstructions,
  Scan1,
  Scan2,
  PhoneThanks,
  ComputerThanks
]

Meteor.startup(() => {
  // code to run on server at startup

  // seed scenes
  if (Scenes.find().count() === 0) {
    console.log("seeding scenes");
    Scenes.insert({...sceneTemplate, key: 0});
    Scenes.insert({...sceneTemplate, key: 1});
    Scenes.insert({...sceneTemplate, key: 2});
    Scenes.insert({...sceneTemplate, key: 3});
    Scenes.insert({...sceneTemplate, key: 4});
    Scenes.insert({...sceneTemplate, key: 5});
  }

  // seed texts
  for (let text of textSeeds) {
    if (!Texts.findOne({key: text.key})) {
      console.log("seeding text", text.key);
      Texts.insert(text);
    }
  }
  // remove old texts
  Texts.remove({key: {$nin: textSeeds.map(text => text.key)}});
  

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

