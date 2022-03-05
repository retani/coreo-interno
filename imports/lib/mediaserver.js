import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

const mediafiles_path = process.env.COREO_MEDIA_PATH || process.env.PWD+'/media/';

var express = require('express');

export function start() {
  const app = express();

  // var port = 8080

  // app.get('/', function (req, res) {
  //   res.send('Hello World!');
  // });

  app.use("/videos", express.static(mediafiles_path));

  WebApp.connectHandlers.use(app);

  console.log("mediaserver serving media files from:", mediafiles_path);
}