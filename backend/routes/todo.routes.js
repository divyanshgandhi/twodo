module.exports = app => {
    const todos = require("../controllers/todo.controller.js");

    var router = require("express").Router();

    // Create a new Todo
    router.post("/", todos.create);

    // Retrieve all Todos
    router.get("/", todos.findAll);

    // Retrieve all Todos from a specific list using a list ID
    router.get("/list", todos.findInList);

    // Retrieve a single Todo with an id
    router.get("/:id", todos.findOne);

    // Update a Todo with an id
    router.put("/:id", todos.update);

    // Delete a Todo with an id
    router.delete("/:id", todos.delete);

    app.use('/todos', router);

}