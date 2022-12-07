module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN
        },
        list_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
    });

    return Todo;
}