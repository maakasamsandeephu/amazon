//console.log("Hello sndp");


//importing the package
const express = require('express');
const mongoose = require('mongoose');


//Importing from other files
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
//const admin = require('./Middleware/admin');
// const admin = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//INIT files

//saving or transfering the express functions into variable 
const app = express();

//conneting string
//const DB = "mongodb+srv://sandeep:sandeep123@amazonuser.pxel25n.mongodb.net/?retryWrites=true&w=majority";
const DB = "mongodb+srv://sandeep:sandeep123@zero.9uo6h3d.mongodb.net/?retryWrites=true&w=majority"
//deafult port you can write to your own
//const PORT = 3000;
const PORT = process.env.PORT || 3000;


//Middle ware
//Client ->middleware-> server -> Client
app.use(express.json());
app.use(authRouter);

app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
//app.use(admin);

//connections
mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
});


//differnt way to write function
// function(){
// }
// ()=>{
// }

// adding dependecy 
// npm i nodemon
// if you want to install particular version then 
// npm i nodemon@latestversion(1.2.3)
// but if you want to add for developer only then you have to Write 
// npm i nodemon --save-dev

//nodemon added for refreshing 
//just type npm run dev then it will activate the script
//creating an API
//get put post delete,update => CRUD

//how request work
//http://<address>/page eg.

// app.get('/hello-world',(req,res)=>{
//     //res.send  ==> it send on text format
//     //res.json ==> it send on json format
//     //res.send("hello sndp");
//     // res.json(
//     //     {
//     //         name:"Sandeep",
//     //         surname:"Rajbhar"
//     //     }
//     // );
// });

app.listen(PORT,()=>{
    console.log(`Connected at port ${PORT} Hello`);
});


