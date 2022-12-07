const db = require("../models");
const listController = require("../controllers/list.controller.js");
const Todo = db.todo;
const List = db.list;
const Op = db.Sequelize.Op;

// Retrieve all Todos from the DB for current user using a user ID
exports.findAll = (req, res) => {
    //Using Serialize to findAll Todos for a specific user
    Todo.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//Retrieve all Todos from a specific list using a list ID
exports.findInList = (req, res) => {
    const list = req.query.list_id;
    var condition = list_id ? { lsit_id: { [Op.eq]: `${list_id}` } } : null;

    //Using Serialize to findAll Todos for a specific list
    Todo.findAll({ where: { list_id: list } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Todo using an ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    // Find a Todo with an ID
    Todo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Todo with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Todo with id=" + id
            });
        });

};

// Create and save a new Todo item to the DB
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Todo
    const todo = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed ? req.body.completed : false,
        list_id: req.body.list_id,
        user_id: req.body.user_id,
    };

    // Save Todo in the database
    Todo.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Todo."
            });
        });
};


// Update a Todo using an ID from request and the updated Todo item
exports.update = (req, res) => {
    const id = req.params.id;

    // Update todo item with given ID
    Todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Todo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Todo with id=" + id
            });
        }
        );

};

// Delete a Todo using an ID from request
exports.delete = (req, res) => {
    const id = req.params.id;

    // Delete a Todo with the specified ID
    Todo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Todo with id=" + id
            });
        });
};
