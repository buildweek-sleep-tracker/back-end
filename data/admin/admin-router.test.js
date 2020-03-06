const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

describe("Admin router", () => {
    test("tests run", () => {
        expect(true).toBeTruthy();
    })
})

// test GET /api/admin/users
describe("GET /api/admin/users", () => {

    test(`should return a 200 status code`, () => {
        return request(server)
            .get(`/api/admin/users`)
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test(`should return an array`, () => {
        return request(server)
            .get(`/api/admin/users`)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
            })
    })
})

// test GET /api/admin/users/:id
describe("GET /api/admin/users/:id", () => {

    let id = 1;

    test(`should return a 200 status code with id=${id}`, () => {
        return request(server)
            .get(`/api/admin/users/${id}`)
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test(`should return a 404 status code with id=abc`, () => {

        id = "abc";
    
        return request(server)
            .get(`/api/admin/users/${id}`)
            .then(response => {
                expect(response.status).toBe(404);
            })
    })
})

// test GET /api/admin/users/:id/sleepdata
describe("GET /api/admin/users/:id/sleepdata", () => {

    let id = 1;

    test(`should return a 200 status code with id=${id}`, () => {
        return request(server)
            .get(`/api/admin/users/${id}/sleepdata`)
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test(`should return an array`, () => {
        return request(server)
            .get(`/api/admin/users/${id}/sleepdata`)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
            })
    })
    
    test(`should return a 404 status code with id=abc`, () => {

        id = "abc";
    
        return request(server)
            .get(`/api/admin/users/${id}/sleepdata`)
            .then(response => {
                expect(response.status).toBe(404);
            })
    })

})

// test GET /api/admin/sleepdata
describe("GET /api/admin/sleepdata", () => {

    test(`should return a 200 status code`, () => {
        return request(server)
            .get(`/api/admin/sleepdata`)
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test(`should return an array`, () => {
        return request(server)
            .get(`/api/admin/sleepdata`)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
            })
    })
})

// test GET /api/admin/sleepdata/:id
describe("GET /api/admin/sleepdata/:id", () => {

    let id = 1;

    test(`should return a 200 status code with id=${id}`, () => {
        return request(server)
            .get(`/api/admin/sleepdata/${id}`)
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test(`should return a 404 status code with id=abc`, () => {
        
        id = "abc";

        return request(server)
            .get(`/api/admin/sleepdata/${id}`)
            .then(response => {
                expect(response.status).toBe(404);
            })
    })
})

// test GET /api/admin/sleepdata/generate?entries=x&user_id=y
describe("GET /api/admin/sleepdata/generate?entries=x&user_id=y", () => {

    let entries = 1;
    let user_id = 1;

    test(`should return a 200 status code with entries=${entries}, user_id=${user_id}`, () => {
        return request(server)
            .get(`/api/admin/sleepdata/generate?entries=${entries}&user_id=${user_id}`)
            .then(response => {
                expect(response.status).toBe(200);
            })
    })

    test(`should return an array with entries=${entries}, user_id=${user_id}`, () => {
        return request(server)
            .get(`/api/admin/sleepdata/generate?entries=${entries}&user_id=${user_id}`)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
            })
    })

    test(`should return an array with one element with entries=${entries}, user_id=${user_id}`, () => {
        return request(server)
            .get(`/api/admin/sleepdata/generate?entries=${entries}&user_id=${user_id}`)
            .then(response => {
                expect(response.body.length).toBe(1);
            })
    })

    test(`should return an array with 10 elements with entries=10, user_id=8`, () => {
            
        entries = 10;
        user_id = 8;

        return request(server)
            .get(`/api/admin/sleepdata/generate?entries=${entries}&user_id=${user_id}`)
            .then(response => {
                expect(response.body.length).toBe(10);
            })
    })

    test(`should return an error message when user_id is omitted`, () => {
        return request(server)
            .get(`/api/admin/sleepdata/generate?entries=${entries}`)
            .then(response => {
                expect(response.body.message).toBeTruthy();
            })
    })

    test(`should return an error message when requesting 100000000 entries`, () => {

        entries = 100000000;

        return request(server)
            .get(`/api/admin/sleepdata/generate?entries=${entries}&user_id=${user_id}`)
            .then(response => {

                expect(response.body.message).toBeTruthy();
            })
    })

})
