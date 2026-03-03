import request from "supertest";
import app from "../src/app.js";
import {describe,test,expect} from "@jest/globals";

describe("order Api",()=>{
    test("should not create order without items",async()=>{
        const userRes=await request(app)
        .post("/api/users/register/")
        .send({
            name:"Order user",
            email:"Orderuser@example.com",
            password:"123456"
        });
        const token=userRes.body.token;
        const res=await request(app)
        .post("/api/orders")
        .set("Authorization",`Bearer ${token}`)
        .send({
            orderItems:[],
            totalPrice:100
        });

       expect(res.statusCode).toBe(400);
    });

    test("should create order success fully",async()=>{
        //register user//
        const userRes=await request(app)
        .post("/api/users/register")
        .send({
            name:"order success user",
            email:"ordersucess@example.com",
            password:"123456"
        });
        const token=userRes.body.token;
       const res=await request(app)
       .post("/api/orders")
       .set("Authorization",`Bearer ${token}`)
       .send({
        orderItems:[
            {
                product:"507f1f77bcf86cd799439011",
                qty:1,
                price:100
            }
        ]
        ,totalPrice:100
       }); 
     expect(res.statusCode).toBe(201);
     expect(res.body).toHaveProperty("_id");
     expect(res.body).toHaveProperty("totalPrice",100);
    });

    test("should get loggesd in users orders",async()=>{
        //register//
        const userRes=await request(app)
        .post("/api/users/register")
        .send({
            name:"order fetch user",
            email:"fetchorder@example.com",
            password:"123456"
        });
        console.log(userRes.body)
        const token=userRes.body.token;
        //create an order//
        await request(app)
        .post("/api/orders")
        .set("Authorization",`Bearer ${token}`)
        .send({
            orderItems:[
                {
                    product:"507f1f77bcf86cd799439011",
                    qty:2,
                    price:50
                }
            ],
            totalPrice:100
        });
        //fetch users orders//
        const res=await request(app)
        .get("/api/orders/myorders")
        .set("Authorization",`Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1)

    });

    test("should not allow normal user to get all ",async()=>{
       const userRes=await request(app)
       .post("/api/users/register")
       .send({
        name:"Normal user",
        email:"noramlorder@example.com",
        password:"123456"
       });
       const token=userRes.body.token;
       const res=await request(app)
       .get("/api/orders")
       .set("Authorization",`Bearer ${token}`);
       expect(res.statusCode).toBe(403);

    });
});