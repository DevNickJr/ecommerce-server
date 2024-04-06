import app from "../../src/app";
import request from "supertest"

require("dotenv").config();

const reqaddProduct = {
    name:"Product create", 
    description:"This is product test for create", 
    price:100
}

const requpdateProduct = {
    name:"Product update", 
    description:"This is product test for update", 
    price:200
 }

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJvbmVAZ21haWwuY29tIiwidXNlcklkIjoiNTIzNDNjMzctMjExMS00ZDFmLWEwNmEtYjMyMTcwOTEwN2M2IiwiaWF0IjoxNjgzNzAxODQ0LCJleHAiOjE2ODM3MDU0NDR9.wP92Jsu1_fnxURLXsUzFoFWW0PP4zupKy_v5sHAinb0"


let productId = ''

describe("Test Product Endpoints", () => {
    describe("POST /api/v1/products", () => {
        test("should create a product", async () => {
            const response = await request(app)
                .post("/api/v1/products")
                .set('Authorization',  `Bearer ${token}`)
                .send(reqaddProduct)
              
            expect(response.status).toEqual(201)

        });
    });


    describe("GET /api/v1/products", () => {
        test("should return all products", async () => {
            const response = await request(app)
                .get("/api/products")
                .expect('Content-Type', /json/)

            expect(response.status).toEqual(200)
            expect(response).toEqual(200)
        });
    });

    describe("GET /api/v1/products/:id", () => {
        test('should return one product with the passed Id', async () => {
            const response = await request(app)
                .get(`/api/v1/products/${productId}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        });
    })

    describe("PUT /api/v1/products/:id", () => {
        test("should update a product", async () => {
            const response = await request(app)
                .put(`/api/v1/products/${productId}`)
                .set('Authorization',  `Bearer ${token}`)
                .send(requpdateProduct)
                .expect(201)
        });
    });

    describe("Checking authorization middleware", () => {
        test("should throw auth error", async () => {
            const response = await request(app)
                .post("/api/v1/products/create")
                .send(reqaddProduct)
                .expect(401)
        });
    });

    describe("DELETE /api/v1/products/delete/:id", () => {
        test("should delete a product", async () => {
            const response = await request(app)
                .delete(`/api/v1/products/delete/${productId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(410)
        });
    });
}) 
