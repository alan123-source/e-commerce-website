import request from "supertest";
import app from "../src/app.js";
import {describe,test,expect} from "@jest/globals";

describe("admin authorization",()=>{
    
    test("should not allow normal user to create product",async()=>{
        const userRes=await request(app)
        .post("/api/users/register")
        .send({
            name:"Normal User",
            email:"normal@example.com",
            password:"123456"
        });
        const token=userRes.body.token;
        const res=await request(app)
        .post("/api/products")
        .set("Authorization",`Bearer ${token}`)
        .send({
            name:"Test Product",
            price:100,
            stock:10
        });
        expect(res.statusCode).toBe(403);
    })
});