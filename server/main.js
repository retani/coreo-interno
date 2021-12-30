import { Meteor } from 'meteor/meteor';
import {Scenes} from '../imports/api/scenes.js';
import '../imports/api/sessions.js';
import {googleDriveIdToUrl} from '../imports/lib/helpers.js';

Meteor.startup(() => {
  // code to run on server at startup
  if (Scenes.find().count() === 0) {
    Scenes.insert({
      key: 0,
      video1Url: googleDriveIdToUrl("cui_synch_test_1_computer_smaller.mp4"),
      video2Url: googleDriveIdToUrl("cui_synch_test_1_telephone_smaller.mp4")
    });

  }
});
