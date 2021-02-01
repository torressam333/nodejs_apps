db.collection('users').updateOne({
    _id: new ObjectID("600f3143987d79adb188e1d9")
}, {
    //Use update operators
    $inc: {
        age: -123
    }
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err)
});

db.collection('tasks').updateMany({
    completed: false
}, {
    //$set
    $set: {
        completed: true
    }
}).then((res) => console.log(res))
    .catch((err) => console.log(err));