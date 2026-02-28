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

 test("should login successfully",async()=>{
    //first register user
    await request(app)
    .post("/api/users/register")
    .send({
        name:"Alan",
        email:"alan2@example.com",
        password:"123456"
    });
    //login now//
    const res=await request(app)
    .post("/api/users/login").send({
        email:"alan2@example.com",
        password:"123456"

    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
 });
 test("should fail login with wrong password",async()=>{
    await request(app)
    .post("/api/users/register")
    .send({
        name:"Alan",
        email:"alan3@example.com",
        password:"123456"
    });

    const res=await request(app).post("/api/users/login"
     ).send({
            email:"alan3@example.com",
            password:"wrongpass"
        });
        expect(res.statusCode).toBe(401);
    
 });

 test("should deny acces to protected route without token",async()=>{
    const res=await request(app).get("/api/protected");
    expect(res.statusCode).toBe(401);
 });
 test("should allow access to protected routes with valid token",async()=>{
    const registerRes=await request(app)
    .post("/api/users/register")
    .send({
        name:"Proteccted User",
        email:"protected@example.com",
        password:"123456"
    });
    const token=registerRes.body.token;
    const res=await request(app)
    .get("/api/protected").set("Authorization",`Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message","you are authorized");
 });
});

