const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const path=require("path");
require('dotenv').config();
const winston=require("winston");

const routes=require("./routes/routes");

const logger = winston.createLogger({
    level: 'info', // Set the minimum logging level
    format: winston.format.simple(), // Use a simple log format
    transports: [
      new winston.transports.Console(), // Log to the console
      new winston.transports.File({ filename: 'mainservice.log' }), // Log to a file
    ],
});

const PORT = process.env.PORT ;

const app=express();

app.set("view engine","ejs");
app.set("views", "views");


// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");//any website * wildcard is used
//     res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, PATCH, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");//any website * wildcard is used
//     next();
// });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));

app.use(routes);


mongoose.connect("mongodb://127.0.0.1:27017/controller")
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});