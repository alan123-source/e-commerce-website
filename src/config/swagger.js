import swaggerJSDoc from "swagger-jsdoc";

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
        ]
    },
    apis:["./src/routes/*.js"]
};

const swaggerSpec=swaggerJSDoc(options);
export default swaggerSpec;