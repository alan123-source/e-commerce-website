import request from "supertest";
import app from "../src/app.js";
import {describe,test,expect} from "@jest/globals";

describe("User API",()=>{
 test("should fail id email is invalid",async()=>{
    const res=await request(app)
    .post("/api/users/register").send({
        name:"Alan",
        email:"invalid",
        password:"123456"
    });
    
    expect(res.statusCode).toBe(400);
 });

 test("should register a user successfully",async()=>{
    const res=await request(app)
    .post("/api/users/register")
    .send({
        name:"Alan",
        email:"alan@example.com",
        password:"123456"
    });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("email","alan@example.com");
 });
});

