// 1. Import express
import './env.js'
import express from 'express';
import swagger from "swagger-ui-express";


//import logMiddleware from './src/middlewares/logger.middleware.js';

import productRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import apiDocs from './swagger.json' assert{type:'json'};
import logMiddleware from './src/middlewares/logger.middleware.js';
import { Logger } from 'winston';
import { ApplicationError } from './src/error-handeller/ApplicationError.js';
import { connectTOMongoDB } from './src/config/mongodb.js';
// 2. Create Server
const server = express();

server.use(bodyParser.json())
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
var corOptions= {
    origin:'http://localhost:5500'
}
server.use(cors());
server.use('/api-docs',swagger.serve ,swagger.setup(apiDocs))
server.use(logMiddleware);//will be used in server level
server.use("/api/products",jwtAuth, productRouter);
server.use("/api/users",userRouter);
server.use('/api/cart',jwtAuth,cartRouter);

//error handeller at application level
server.use((err, req, res, next) => {
    logMiddleware.error(err.message);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    //server error
    res
    .status(500)//503 for err0r handelling for server Errors.....
    .send(
        "Oops! Something went wrong... Please try again later!"
    );
    });
    
//404 n0t found
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
    });
// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});
// 3.1. CORS
// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin',
//     'http://localhost:5500' //on the server);
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     // return ok for preflight request.
//     if(req.method=="OPTIONS"){
//     return res.sendStatus(200);
//     }
//     next();
//     })

// 4. Specify port.
server.listen(4200,()=>{
    console.log("Server is running at 4200");
    connectTOMongoDB();
});
