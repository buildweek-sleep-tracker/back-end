const jwt = require("jsonwebtoken");

const jwtSecret = require("./jwtSecret");

module.exports = (user) => {

    console.log("about to be added to token", user)

    const payload = {
        subject: user.id,
        id: user.id,
        email: user.email
    }

    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, jwtSecret, options);
}