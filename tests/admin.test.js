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
    });

    test("admin should get all orders",async()=>{
        const adminRes=await request(app)
        .post("/api/users/register")
        .send({
            name:"Admin user",
            email:"adminorder@example.com",
            password:"123456"
        });
        const User=(await import("../src/models/usermodel.js")).default;
        await User.findOneAndUpdate({
            email:"adminorder@example.com"
        },{
            role:"admin"
        });
        const adminLogin=await request(app)
        .post("/api/users/login")
        .send({
            email:"adminorder@example.com",
            password:"123456"
        });
        const adminToken=adminLogin.body.token;
        const res=await request(app)
        .get("/api/orders")
        .set("Authorization",`Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);
    });
});