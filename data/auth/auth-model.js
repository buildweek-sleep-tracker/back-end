const database = require("../db-config");

module.exports = {
    addUser,
    getUserBy
}

function addUser(user) {

    return database("users")
        .insert(user);
}

function getUserBy(query) {

    return database("users")
        .where(query);
}
