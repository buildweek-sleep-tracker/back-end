/* istanbul ignore file */

const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

xdescribe("Auth router", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
})

// testing POST /api/auth/register
xdescribe("POST /api/auth/register", () => {

    let email = Date.now();
    let password = email + "pass";

    test("should return a 201 status code upon successful registration", () => {
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {
                expect(response.status).toBe(201);
            })
    })

    test("should return a 400 status code if email is missing", () => {
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
            .send({email})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

})

// testing POST /api/auth/login

xdescribe("POST /api/auth/login", () => {

    let email = Date.now();
    let password = email + "pass";

    test("should return a 200 status code", () => {
        
        // create an account; then try to log in user

        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {
                request(server)
                .post("/api/auth/login")
                    .send({email, password})
                    .then(response => {
                        expect(response.status).toBe(200);
                    })
            })
    })

    test("should return a 400 status code if email is missing", () => {
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
            .send({email})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })

    test("should return a 401 status code if password is incorrect", () => {
        return request(server)
            .post("/api/auth/login")
            .send({email, password: "bad_password"})
            .then(response => {
                expect(response.status).toBe(401);
            })
    })
})

