const request = require("supertest");

const server = require("../../server");
const database = require("../db-config");

// test GET /api/sleepdata
// test GET /api/sleepdata/:id
// test POST /api/sleepdata
// test PUT /api/sleepdata/:id
// test DELETE /api/sleepdata/:id


describe("Sleepdata router", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
})
