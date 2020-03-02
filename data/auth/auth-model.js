const database = require("../db-config");

module.exports = {
    addUser,
    getUserBy,

    getAllUsers
}

function addUser(user) {

    return database("users")
        .insert(user);
}

function getUserBy(query) {

    return database("users")
        .where(query);
}

function getAllUsers(query) {

    return database("users")
        .select("id", "email", "first_name", "last_name");
}