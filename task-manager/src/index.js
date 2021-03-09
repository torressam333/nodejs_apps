/*Initial entry for application*/
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//DB Conn file
require('./db/mongoose');

//Init express
const app = express();

//Heroku or local
const port = process.env.PORT || 3000;

//Auto parse incoming json to an object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})