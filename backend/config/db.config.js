const password = "password";

module.exports = {
    HOST: "db",
    USER: "postgres",
    PASSWORD: password,
    PORT: 5432,
    DB: "twodo-db",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};