const jwt = require("jsonwebtoken");

const jwtSecret = require("./jwtSecret");

module.exports = (user) => {

    const payload = {
        subject: user.id,
        id: user.id,
        email: user.email
    }

    const options = {
        expiresIn: "24h"
    }

    return jwt.sign(payload, jwtSecret, options);
}