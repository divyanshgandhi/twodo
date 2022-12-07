const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
require('dotenv').config();

const PORT = process.env.PORT;
const CORS_PORT = process.env.CORS_PORT;


const app = express();
var corsOptions = {
    origin: ("http://localhost:" + CORS_PORT)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});

//For syncing when db drops and reloads
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to TwoDo' });
});

require("./routes/todo.routes")(app);
require("./routes/list.routes")(app);

const firstList = {
    title: "Task List",
    description: "A list of tasks to complete",
    todos: [],
};

const firstTodo = {
    title: "First Todo",
    description: "This is the first todo",
    completed: false,
    list_id: 1,
};

db.list.create(firstList)
    .then(data => {
        console.log("First list created: ", data);
    })
    .catch(err => {
        console.log("Error creating first list: ", err);
    });

db.todo.create(firstTodo)
    .then(data => {
        console.log("First todo created: ", data);
    })
    .catch(err => {
        console.log("Error creating first todo: ", err);
    });


app.listen(PORT, () => console.log("App running and serving on " + PORT));