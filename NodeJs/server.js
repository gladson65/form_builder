import express from 'express';
import mongoose from 'mongoose';
import { routes } from './Routes/category.route.js';
import cors from 'cors';

// create a server
const server = new express();

// json parse middleware
server.use(express.json());

// cors middleware
server.use(cors());

server.listen(7000, () => {
    console.log("server is running on port: 7000");
})

// connect server to the database
mongoose.connect("mongodb://localhost:27017/");

// check database connection
const db = mongoose.connection;
db.on("open", ()=> {
    console.log("Database connection successfull!");
})

// if any error
db.on("error", ()=> {
    console.log("Databse connection failed")
})

// passing server to the routes
routes(server)