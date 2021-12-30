import { Meteor } from 'meteor/meteor';
import {Scenes} from '../imports/api/scenes.js';
import '../imports/api/sessions.js';
import {googleDriveIdToUrl} from '../imports/lib/helpers.js';

Meteor.startup(() => {
  // code to run on server at startup
  if (Scenes.find().count() === 0) {
    Scenes.insert({
      key: 0,
      video1Url: googleDriveIdToUrl("1BUT5eUPGtyTmiz1ZqWjfKI7xKGHGUEUF"),
      video2Url: googleDriveIdToUrl("12UBQm1nXeHLT2sClSJUjJ9qLql6czE2V")
    });

  }
});
