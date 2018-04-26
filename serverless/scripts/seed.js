'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const quiz = {
  id: '1',
  title: "Capital Cities of the World",
  questions: [
    {
      question: "What is the capital of France?",
      answers: [
          { text: 'Paris', correct: true },
          { text: 'London', correct: false },
          { text: 'Berlin', correct: false }
      ]
    },
    {
      question: "What is the capital of Spain?",
      answers: [
          { text: 'Madrid', correct: true },
          { text: 'London', correct: false },
          { text: 'Berlin', correct: false }
      ]
    }
  ]
};

const params = {
  TableName : 'QuizMaker-Quizzes',
  Item: quiz
};

documentClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log('success');
});
