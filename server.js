const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./data/auth/auth-router");
const adminRouter = require("./data/admin/admin-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/admin", adminRouter);

// Fallback in case an invalid route is encountered anywhere in the routes above
server.use("/", (req, res) => {
    res.status(200).send("<h1>Welcome to the Sleep Tracker database!</h1><p>Consult the <a href='https://github.com/buildweek-sleep-tracker/back-end'>documentation</a> to see available endpoints.</p>")
})

module.exports = server;