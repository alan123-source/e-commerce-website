import { Schema } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import Product from "../models/productModel.js ";

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"e-commerce api",
            version:"1.0.0",
            description:"api documentation of e commerce backend"
        },
        servers:[
            {
                url:"http://localhost:5000"
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                }
            },
        schemas:{
            User:{
                type:"object",
                properties:{
                    _id:{
                        type:"string",
                        example:"65a123456789abcdef123456"
                    },
                    name:{
                      type:"string",
                      example:"Alan"
                    },
                    email:{
                        type:"string",
                        example:"alan@example.com"

                    }
                }
            },
            Product:{
                type:"object",
                properties:{
                    _id:{
                        type:"string",
                        example:"65a123456789abcdef123456"
                    },
                    name:{
                        type:"string",
                        example:"Laptop"
                    },
                    price:{
                        type:"number",
                        example:45000
                    },
                    description:{
                        type:"string",
                        example:"high performance laptop"
                    },
                    stock:{
                        type:"number",
                        example:10
                    }

                }
            },

            Order:{
                type:"object",
                properties:{
                    _id:{
                        type:"string",
                        example:"65a123456789abcdef123456"
                    },
                    totalPrice:{
                        type:"number",
                        example:90000
                    },
                    status:{
                        type:"string",
                        example:"PLACED"
                    }
                }
            }
        } 
        },
       security:[
           {
            bearerAuth:[]
          } 
        ]
    },
    apis:["./src/routes/*.js"]
};

const swaggerSpec=swaggerJSDoc(options);
export default swaggerSpec;