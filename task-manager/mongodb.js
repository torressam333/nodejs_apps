/*Test File for Working With MongoDB*/

/*const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;*/

const {MongoClient, ObjectID} = require('mongodb');

//Define connection url for the DB we are connecting to
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//Connect to server
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true},
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to db: ' + error);
        }

        //1. Reference specific db to manipulate (connection)
        const db = client.db(databaseName);


    });