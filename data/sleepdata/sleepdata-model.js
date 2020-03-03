const database = require("../db-config");

module.exports = {
    getUserBy,
    getUserByID,
    getSleepDataByUserID,

    updateUser,
    deleteUser


}


function getUserBy(query) {

    return database("users")
        .where(query)
        .select("id", "email", "first_name", "last_name", "password")
        .first()
}


function getUserByID(id) {

    return database("users")
        .where({id})
        .select("id", "email", "first_name", "last_name", "password")
        .first()
}

function getSleepDataByUserID(id) {

    return database("sleep_data")
        .where({user_id: id})
        .first()
        
}

function updateUser(id, profile) {

    return database("users")
    .where({id})
    .update(profile)
}

function deleteUser(id) {

    return database("users")
    .where({id})
    .del()
}