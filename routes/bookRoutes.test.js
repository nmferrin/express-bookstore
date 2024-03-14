const request = require("supertest");
const app = require("../app"); // Adjust the path to your Express app
const db = require("../db"); // Adjust the path to your database connection module

// Set the environment to "test"
process.env.NODE_ENV = "test";

describe("Book Routes Test", () => {
    beforeAll(async () => {
        // Run any setup here if necessary, such as seeding test data
    });

    afterAll(async () => {
        // Clean up test data and close the database connection
        await db.end();
    });

    // Test for GET /books route
    test("GET /books", async () => {
        const response = await request(app).get("/books");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("books");
        expect(Array.isArray(response.body.books)).toBe(true);
    });

    // Test for invalid book creation
    test("POST /books with invalid data", async () => {
        const response = await request(app).post("/books").send({
            isbn: "12345",
            amazon_url: "http://example.com",
            // Missing required fields like author and title
        });
        expect(response.statusCode).toBe(400); // Assuming your app returns 400 for validation errors
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toContain("Validation failed");
    });

});
