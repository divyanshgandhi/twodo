const db = require("../models");
const List = db.list;
const Op = db.Sequelize.Op;

// Retrieve all Lists from the DB for current user using a user ID
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.eq]: `${user_id}` } } : null;

    //Using Serialize to findAll Todos for a specific user
    List.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Lists."
            });
        });
};

// Find a single List of Todos using a List ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    // Find a Todo with an ID
    List.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find List with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving List with id=" + id
            });
        });

};

// Create and save a new List item to the DB
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a List
    const list = {
        title: req.body.title,
        description: req.body.description,
        todos: req.body.todos,
        user_id: req.body.user_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    };

    // Save List in the database
    List.create(list)
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the List."
            });
        }
        );
};


// Update a List using a List ID from request and the updated List item
exports.update = (req, res) => {
    const id = req.params.id;

    // Update list item with given ID
    List.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating List with id=" + id
            });
        }
        );

};

//Empty a List of Todos using a List ID from request
exports.empty = (req, res) => {
    const id = req.params.id;

    // Update todo item with given ID
    List.update({
        todos: []
    }, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating List with id=" + id
            });
        }
        );

};

// Delete an entire List using a List ID from request
exports.delete = (req, res) => {
    const id = req.params.id;

    List.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "List was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete List with id=${id}. Maybe List was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete List with id=" + id
            });
        }
        );
};
