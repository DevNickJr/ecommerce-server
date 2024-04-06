import request from "supertest"
import app from "../../src/app"


describe("AUTH ROUTES", () => {
    describe("LOGIN", () => {
        it("return a successful response", async () => {
            const response = await request(app).post("/api/v1/auth/login").send({ 
                "email": "admin@gmail.com", 
                "password": "12345678",
            })
    
            expect(response.status).toEqual(200)
            expect(response.body.token).not.toBeNull()
            expect(response.body.user.email).toBe("admin@gmail.com")
            expect(response.body.user.role).toBe("ADMIN")
        })

    })
    
    // describe("SIGNUP", () => {
    //     it("should register successfully", async () => {
    //         const response = await request(app).post("/api/v1/auth/register").send({ 
    //             "firstName": "newUserss", 
    //             "lastName": "newUserss", 
    //             "email": "nickj@gmailas.com", 
    //             "password": "@Nick1583" 
    //         })
    
    //         expect(response.status).toEqual(201)
    //         expect(response.body.token).not.toBeNull()
    //         expect(response.body.user.email).toBe("admin@gmail.com")
    //         expect(response.body.user.role).toBe("ADMIN")
    //     })
    // })

})