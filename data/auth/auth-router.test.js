const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

describe("Auth router", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
})

// testing POST /api/auth/register
describe("POST /api/auth/register", () => {

    let username = Date.now();
    let password = username + "pass";

    test("should return a 201 status code upon successful login", () => {
        return request(server)
            .post("/api/auth/register")
            .send({username, password})
            .then(response => {
                expect(response.status).toBe(201);
            })
    })

    test("should return a 400 status code if username is missing", () => {
        return request(server)
            .post("/api/auth/register")
            .send({password})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

    test("should return a 400 status code if password is missing", () => {
        return request(server)
            .post("/api/auth/register")
            .send({username})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

})

// testing POST /api/auth/login

describe("POST /api/auth/login", () => {

    let username = Date.now();
    let password = username + "pass";


    test("should return a 200 status code", () => {
        
        // create an account; then try to log in user

        return request(server)
            .post("/api/auth/register")
            .send({username, password})
            .then(response => {
                request(server)
                .post("/api/auth/login")
                    .send({username, password})
                    .then(response => {
                        expect(response.status).toBe(200);
                    })
            })
    })

    test("should return a 400 status code if username is missing", () => {
        return request(server)
            .post("/api/auth/login")
            .send({password})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

    test("should return a 400 status code if password is missing", () => {
        return request(server)
            .post("/api/auth/login")
            .send({username})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

    test("should return a 401 status code if password is incorrect", () => {
        return request(server)
            .post("/api/auth/login")
            .send({username, password: "bad_password"})
            .then(response => {
                expect(response.status).toBe(401);
            })
    })
})

