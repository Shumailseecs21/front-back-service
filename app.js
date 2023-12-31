const express=require("express");
const mongoose=-require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT ;

const app=express();
app.set("engine","ejs");
app.set("views", "views");

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");//any website * wildcard is used
//     res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, PATCH, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");//any website * wildcard is used
//     next();
// });

app.use(express.json());

app.get("/register",async function(req,res,next){
    const response=await fetch("http://localhost:5001/register",{
        method:GET,
    });
    console.log(response);
    console.log("ok");

    if(response.status===200){
        res.render("/login/register");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});