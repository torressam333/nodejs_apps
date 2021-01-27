/*Test File for Working With MongoDB*/

/*const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;*/

const {MongoClient, ObjectID} = require('mongodb');

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

//Define connection url for the DB we are connecting to
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//Connect to server
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true},
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to db: ' + error);
        }

        //1. Reference specific db to manipulate
        const db = client.db(databaseName);

        //2. Insert 3 tasks into a new collection (tasks)
      /*  db.collection('tasks').insertMany([
            {
                description: 'Read for 30 minutes',
                completed: false
            },
            {
                description: 'Practice piano for 30 minutes',
                completed: false
            },
            {
                description: 'Study node.js and mongodb',
                completed: true
            }
        ], (error, result) => {
            if (error) {
                return console.log(error.message);
            }

            console.log(result.ops);
        });*/

        //3. Insert single user
        /*db.collection('users').insertOne({
            name: 'Robert',
            age: 21
        }, (error, result) => {
            if (error) {
                return console.log('Something went wrong ' + error);
            }

            console.log(result.ops);
        })*/
    });