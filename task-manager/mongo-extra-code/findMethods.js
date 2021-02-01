db.collection('tasks').findOne({ _id: new ObjectID("600f3302e5ffbbaff2c161ae")}, (error, task) => {
    if (error) {
        return console.log('Unable to fetch');
    }

    console.log(task);
});

db.collection('tasks').find({completed: false}).toArray((error, incompleteTasks) => {
    console.log(incompleteTasks);
});