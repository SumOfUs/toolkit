'use strict';
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();


//   const date =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: ''
  };

  let extra = {};

  console.log(JSON.stringify(event, null, 2));

  if(!event.body.id){
    extra.id = uuidv1();
    extra.createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }

  const properties = Object.assign(extra, JSON.parse(event.body));

  const params = {
    TableName : process.env.QUIZ_TABLE,
    Item: properties,
    ReturnValues: 'ALL_OLD',
  };

  documentClient.put(params, function(err, data) {
    if (err) console.log(err);
    else {
      console.log(data);
      response.body = JSON.stringify({id: properties.id}, null, 2);
      callback(null, response);
    }
  });
}
