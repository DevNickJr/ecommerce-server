import request from "supertest"
import app from "../../src/app"


describe.skip("Controller", () => {
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

})