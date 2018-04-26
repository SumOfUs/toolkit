'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: ''
  };

  const id = event.pathParameters.id;

  const params = {
    TableName : process.env.QUIZ_TABLE,
    Key: {
      id: id
    }
  };

  documentClient.get(params, function(err, data) {
    if (err) console.log(err);
    else {
      console.log(data);
      
      response.body = JSON.stringify(data, null, 2);
      callback(null, response);
    }
  });
};
