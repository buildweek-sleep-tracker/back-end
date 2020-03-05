const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

describe("Profile router", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
})


// test GET /api/profile

xdescribe("GET /api/api/profile", () => {

    let email = Date.now();
    let password = email + "pass";

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
xdescribe("PUT /api/api/profile", () => {

    test("should return a 200 status code when no changes are made to the profile", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to edit user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                let newProfile = {
                    currentPassword: password
                }
        
                return request(server)
                .put("/api/profile")
                .set({Authorization: token})
                .send(newProfile)
                    .then(response => {

                        expect(response.status).toBe(200);
                    })
            })
    })

    test("should return a 200 status code on a successful update", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to edit user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let firstName = "new first name"

                let newProfile = {
                    currentPassword: password,
                    newFirstName: firstName
                }
        
                return request(server)
                .put("/api/profile")
                .set({Authorization: token})
                .send(newProfile)
                    .then(response => {

                        expect(response.status).toBe(200);
                    })
            })
    })

    test("should return a 400 status code if password is missing", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to edit user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let firstName = "new first name"

                let newProfile = {
                    newFirstName: firstName
                }
        
                return request(server)
                .put("/api/profile")
                .set({Authorization: token})
                .send(newProfile)
                    .then(response => {

                        expect(response.status).toBe(400);
                    })
            })
    })

    test("should return a 401 status code if password is incorrect", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to edit user profile using token
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let firstName = "new first name"

                let newProfile = {
                    newFirstName: firstName,
                    currentPassword: "incorrect password"
                }
        
                return request(server)
                .put("/api/profile")
                .set({Authorization: token})
                .send(newProfile)
                    .then(response => {

                        expect(response.status).toBe(401);
                    })
            })
    })

    test("should return a 403 status code if email address is already in use", () => {
        
        let email = Date.now();
        let password = email + "pass";
        
        // create an account to reserve an email address
        return request(server)
            .post("/api/auth/register")
            .send({email: email + "reserved", password})
            .then(response => {

                // create a second account; then try to change email to the reserved email
                return request(server)
                    .post("/api/auth/register")
                    .send({email, password})
                    .then(response => {

                        let token = response.body.token;

                        let newProfile = {
                            currentPassword: password,
                            newEmail: email + "reserved"
                        }
                
                        return request(server)
                        .put("/api/profile")
                        .set({Authorization: token})
                        .send(newProfile)
                            .then(response => {
                                expect(response.status).toBe(403);
                            })
                    })
            })
    })
})

// test DELETE /api/profile
xdescribe("DELETE /api/api/profile", () => {

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
