import app from "../../src/app";
import request from "supertest"

require("dotenv").config();

const reqAddProduct = {
    "title": "Good Bed dsk",
    "price": 1100,
    "description": "A new very sweet bread",
    "categories": ["Food"]
}

const requpdateProduct = {
    "title": "Okay n",
    "price": 1100,
    "description": "A new very sweet bread",
    "categories": ["Food"]
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzEyNzU0NTk5LCJleHAiOjE3MTI4NDA5OTl9.QphG6nWypWRCzTsxn_-V1T7hDTpibjPG0OyBb_bMy9o"


let productId = ''

describe("Test Product Endpoints", () => {
    describe("POST /api/v1/products", () => {
        test("should create a product", async () => {
            const response = await request(app)
                .post("/api/v1/products")
                .set('Authorization',  `Bearer ${token}`)
                .send(reqAddProduct)

                // console.log({response})
              
            expect(response.status).toEqual(201)

        });
    });


    describe("GET /api/v1/products", () => {
        test("should return all products", async () => {
            const response = await request(app)
                .get("/api/v1/products")
                .expect('Content-Type', /json/)

            expect(response.status).toEqual(200)
        });
    });

    // describe("GET /api/v1/products/:id", () => {
    //     test('should return one product with the passed Id', async () => {
    //         const response = await request(app)
    //             .get(`/api/v1/products/${productId}`)
    //             .expect(200)
    //             .expect('Content-Type', /application\/json/)
    //     });
    // })

    // describe("PUT /api/v1/products/:id", () => {
    //     test("should update a product", async () => {
    //         const response = await request(app)
    //             .put(`/api/v1/products/${productId}`)
    //             .set('Authorization',  `Bearer ${token}`)
    //             .send(requpdateProduct)
    //             .expect(201)
    //     });
    // });

    // describe("Checking authorization middleware", () => {
    //     test("should throw auth error", async () => {
    //         const response = await request(app)
    //             .post("/api/v1/products/create")
    //             .send(reqAddProduct)
    //             .expect(401)
    //     });
    // });

    // describe("DELETE /api/v1/products/delete/:id", () => {
    //     test("should delete a product", async () => {
    //         const response = await request(app)
    //             .delete(`/api/v1/products/delete/${productId}`)
    //             .set('Authorization', `Bearer ${token}`)
    //             .expect(410)
    //     });
    // });
}) 
