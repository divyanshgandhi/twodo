module.exports = app => {

    const lists = require("../controllers/list.controller.js");

    var router = require("express").Router();

    // Create a new List
    router.post("/", lists.create);

    // Retrieve all Lists
    router.get("/", lists.findAll);

    // Retrieve a single List with an id
    router.get("/:id", lists.findOne);

    // Update a List with an id
    router.put("/:id", lists.update);

    // Empty a List with an id
    router.put("/:id/empty", lists.update);

    // Delete a List with an id
    router.delete("/:id", lists.delete);

    app.use('/lists', router);


}