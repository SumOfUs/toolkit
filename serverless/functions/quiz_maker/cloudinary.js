'use strict';

const AWS = require('aws-sdk');
const cloudinary = require('cloudinary');
const s3 = new AWS.S3();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const BUCKET = process.env.BUCKET;

const base = `https://s3-us-west-2.amazonaws.com/${BUCKET}`;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

module.exports.handler = (event, context, callback) => {
  console.log( JSON.stringify(event, null, 2) );
  let key = event.Records[0].s3.object.key;
  let url = `${base}/${key}`;

  key = key.match(/(.*[^.((?-i)jpg|png|gif)])/)[0];
  console.log("PROCESSING", key);
  cloudinary.v2.uploader.upload(url, { public_id: key }).
    then(result => {
      callback(null);
    })
    .catch( err => {
      console.error(err);
    });

};
