const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

describe("Sleepdata router", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
})

// test GET /api/sleepdata
describe("GET /api/sleepdata", () => {

    test("should return a 401 status code if not logged in", () => {
            
        return request(server)
            .get("/api/sleepdata")
                .then(response => {
                    expect(response.status).toBe(401);
                })
    })

    test("should return a 200 status code if logged in", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to view sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                return request(server)
                .get("/api/sleepdata")
                .set({Authorization: token})
                    .then(response => {
                        expect(response.status).toBe(200);
                    })
            })
    })

    test("should return an array of results", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to view sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;

                return request(server)
                .get("/api/sleepdata")
                .set({Authorization: token})
                    .then(response => {
                        expect(Array.isArray(response.body)).toBe(true);
                    })
            })
    })
})

// test GET /api/sleepdata/:id
describe("GET /api/sleepdata/:id", () => {

    test("should return a 401 status code if not logged in", () => {
            
        let id = 1;
        
        return request(server)
            .get(`/api/sleepdata/${id}`)
                .then(response => {
                    expect(response.status).toBe(401);
                })
    })
    
    test("should return a 404 status code if attempting to view a sleepdata entry that belongs to someone else", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to view sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let id = 1;

                return request(server)
                .get(`/api/sleepdata/${id}`)
                .set({Authorization: token})
                    .then(response => {
                        expect(response.status).toBe(404);
                    })
            })
    })
    
    test("should return a 404 status code if attempting to view a sleepdata entry that does not exist", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to view sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let id = "abc";

                return request(server)
                .get(`/api/sleepdata/${id}`)
                .set({Authorization: token})
                    .then(response => {
                        expect(response.status).toBe(404);
                    })
            })
    })
})

// test POST /api/sleepdata
describe("POST /api/sleepdata", () => {

    test("should return a 401 status code if not logged in", () => {
            
        return request(server)
            .post("/api/sleepdata")
                .then(response => {
                    expect(response.status).toBe(401);
                })
    })

    test("should return a 201 status code upon sleep entry creation", () => {
            
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let log_date = Date.now();

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date})
                        .then(response => {
                            expect(response.status).toBe(201);
                        })
            })
    })

    
    test("should return a truthy value upon sleep entry creation", () => {
            
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let log_date = Date.now();

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date})
                        .then(response => {
                            expect(response.body).toBeTruthy();
                        })
            })
    })


    test("should return a 400 status code if missing request body", () => {
            
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let log_date = Date.now();

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                        .then(response => {
                            expect(response.status).toBe(400);
                        })
            })
    })

    test("should return a 400 status code if missing log_date", () => {
            
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let log_date = Date.now();

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({data: "mising log_date"})
                        .then(response => {
                            expect(response.status).toBe(400);
                        })
            })
    })

})

// test PUT /api/sleepdata/:id
describe("PUT /api/sleepdata/:id", () => {

    test("should return a 401 status code if not logged in", () => {
            
        let id = 1;

        return request(server)
            .put(`/api/sleepdata/${id}`)
                .then(response => {
                    expect(response.status).toBe(401);
                })
    })

    test("should return a 200 status code upon successful edit", () => {

        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to view sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let post_log_date = Date.now();
                let token = response.body.token;
                
                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date: post_log_date})
                        .then(response => {

                            let log_date = "placeholder";
                            let id = response.body;
                            let rating_day = 2;

                            // attempt to edit the sleep entry
                            return request(server)
                                .put(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                .send({log_date, rating_day})
                                    .then(response => {

                                        expect(response.status).toBe(200);
                                    })
                        })

            })
    })

    test("should return a 400 status code if missing request body", () => {

        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to view sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let post_log_date = Date.now();
                let token = response.body.token;
                let id = 1;

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date: post_log_date})
                        .then(response => {

                            let id = response.body;

                            // attempt to edit the sleep entry
                            return request(server)
                                .put(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                    .then(response => {
                                        expect(response.status).toBe(400);
                                    })
                        })

            })
    })
    
    test("should return a 400 status code if missing log_date", () => {

        let email = Date.now();
        let password = email + "pass";

            // create an account; then try to view sleep data
            return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let post_log_date = Date.now();
                let token = response.body.token;
                let id = 1;

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date: post_log_date})
                        .then(response => {

                            let id = response.body;

                            // attempt to edit the sleep entry
                            return request(server)
                                .put(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                .send({data: "missing log_date"})
                                    .then(response => {
                                        expect(response.status).toBe(400);
                                    })
                        })

            })
    })
    
    
    test("should return a 403 status code if attempting to view a sleepdata entry that belongs to someone else", () => {
        
        let email = Date.now();
        let password = email + "pass";

            // create an account; then try to view sleep data
            return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let post_log_date = Date.now();
                let id = 1;

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date: post_log_date})
                        .then(response => {

                            let id = 1;
                            let log_date = "placeholder";

                            // attempt to edit the sleep entry
                            return request(server)
                                .put(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                .send({log_date})
                                    .then(response => {
                                        expect(response.status).toBe(403);
                                    })
                        })
            })
    })
    
    test("should return a 403 status code if attempting to view a sleepdata entry that does not exist", () => {
        
        let email = Date.now();
        let password = email + "pass";

            // create an account; then try to view sleep data
            return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let post_log_date = Date.now();
                let id = 1;

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date: post_log_date})
                        .then(response => {

                            let id = 'abc';
                            let log_date = "placeholder";

                            // attempt to edit the sleep entry
                            return request(server)
                                .put(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                .send({log_date})
                                    .then(response => {
                                        expect(response.status).toBe(403);
                                    })
                        })

            })
    })
})

// test DELETE /api/sleepdata/:id
describe("DELETE /api/sleepdata/:id", () => {

    test("should return a 401 status code if not logged in", () => {
        
        let id = "asdfadsfas";
        
        return request(server)
            .delete(`/api/sleepdata/${id}`)
                .then(response => {
                    expect(response.status).toBe(401);
                })
    })

    test("should return a 403 status code if attempting to delete a sleepdata entry that belongs to someone else", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create and subsequently edit sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let log_date = Date.now();

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date})
                        .then(response => {

                            let id = 1;

                            // delete the sleep entry
                            return request(server)
                                .delete(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                    .then(response => {

                                        expect(response.status).toBe(403);
                                    })
                        })
            })
    })
    
    test("should return a 403 status code if attempting to delete a sleepdata entry that does not exist", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create and subsequently edit sleep data
        return request(server)
        .post("/api/auth/register")
        .send({email, password})
        .then(response => {

            let token = response.body.token;
            let log_date = Date.now();

            // create a sleep entry
            return request(server)
                .post(`/api/sleepdata/`)
                .set({Authorization: token})
                .send({log_date})
                    .then(response => {

                        console.log("this is the creation response", response.body)

                        let id = "does not exist";

                        // delete the sleep entry
                        return request(server)
                            .delete(`/api/sleepdata/${id}`)
                            .set({Authorization: token})
                                .then(response => {
                                    expect(response.status).toBe(403);
                                })
                    })
            })
    })

    test("should return a 401 status code when attempting to view a deleted sleep entry", () => {
        
        let email = Date.now();
        let password = email + "pass";

        // create an account; then try to create and subsequently delete sleep data
        return request(server)
            .post("/api/auth/register")
            .send({email, password})
            .then(response => {

                let token = response.body.token;
                let log_date = Date.now();

                // create a sleep entry
                return request(server)
                    .post(`/api/sleepdata/`)
                    .set({Authorization: token})
                    .send({log_date})
                        .then(response => {

                            let id = response.body;

                            // delete the sleep entry
                            return request(server)
                                .delete(`/api/sleepdata/${id}`)
                                .set({Authorization: token})
                                    .then(response => {

                                        // try to view the sleep entry
                                        return request(server)
                                            .get(`/api/sleepdata/${id}`)
                                            .send({email, password})
                                            .then(response => {
                                                expect(response.status).toBe(401);
                                            })
                                    })
                        })
            })
    })
})
