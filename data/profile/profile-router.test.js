const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

describe("Profile router", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
})


// test GET /api/profile

let email = Date.now();
let password = email + "pass";

describe("GET /api/api/profile", () => {

    test("should return a 200 status code", () => {
            
        // create an account; then try to view user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                request(server)
                .get("/api/profile")
                .set({Authorization: token})
                    .then(response => {
                        expect(response.status).toBe(200);
                    })
            })
    })

    test("should return an object", () => {
            
        // log in; then try to view user profile using token
        return request(server)
            .post("/api/auth/login")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                request(server)
                .get("/api/profile")
                .set({Authorization: token})
                    .then(response => {
                        expect(response.body).toBeTruthy();
                    })
            })
    })
})

// test PUT /api/profile
describe("PUT /api/api/profile", () => {

    test("should return a 200 status code on successful update", () => {
        
        let newProfile = {
            oldPassword: password
        }

        // log in; then try to edit user profile using token
        return request(server)
            .post("/api/auth/login")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                return  request(server)
                .put("/api/profile")
                .set({Authorization: token})
                .send(newProfile)
                    .then(response => {

                        console.log(response.body, "was the update", response.status);

                        expect(response.status).toBe(200);
                    })
                    // .catch(error => Error(error))
            })
            // .catch(error => Error(error))
    })
})

// test DELETE /api/profile
describe("DELETE /api/api/profile", () => {

    test("should return a 200 status code on successful delete", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // register; then try to edit user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                // delete profile
                return request(server)
                    .delete("/api/profile")
                    .set({Authorization: token})
                        .then(response => {
                            expect(response.status).toBe(200);
                        })
            })
    })

    test("should return a 401 status code when attempting to log in to a deleted account", () => {
        
        let email = Date.now();
        let password = email + "pass";
                
        // register; then try to edit user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                // delete profile
                return request(server)
                    .delete("/api/profile")
                    .set({Authorization: token})
                        .then(response => {

                            // try to log in again. Account should no longer exist (401 - invalid credentials)
                            return request(server)
                                .post("/api/auth/login")
                                .send({email, password})
                                .then(response => {
                                    expect(response.status).toBe(401);
                                })
                        })
            })
    })
})
