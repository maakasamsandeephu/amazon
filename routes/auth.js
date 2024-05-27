//all import statements
const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../Middleware/auth");



const authRouter = express.Router();

const PORT = 3000;

// authRouter.get('/user',(req,res)=>{
//     res.json({
//         name:"sandeep"
//     });
// });

    //Sign Up Route
    authRouter.post('/api/signup',async (req,res)=>{

        try{
        //get the data form the client
        const {name,email,password}=req.body;
    
        const existingUser = await User.findOne({
            email
        })
        if(existingUser){
            return res.status(400).json({
                msg:"User with same email already exist!"
            });
        }
        else{
           const hashedPassword = await bcryptjs.hash(password,8);
           //const hash = bcryptjs.genSalt(password,8)

            let user = new User({
                email,
                //hashedPassword,
                password : hashedPassword,
                name
            });
            user = await user.save();
            res.json(user);
        }
        //post the data into database
    
        //return the data to the user

    }catch(e){
        res.status(500).json({ error: e.message });
    }
    });

    //Sign In Route

    //Exercie

    authRouter.post("/api/signin", async (req, res) => {
        try {
          const { email, password } = req.body;
      
          const user = await User.findOne({ email });
          if (!user) {
            return res
              .status(400)
              .json({ msg: "User with this email does not exist!" });
          }
      
          const isMatch = await bcryptjs.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
          }
      
          const token = jwt.sign({ id: user._id }, "passwordKey");
          res.json({ token, ...user._doc });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      });

    authRouter.post('/tokenIsValid',async(req,res)=>{
      try{

        const token = req.header('x-auth-token');
        if(!token){
          return res.json(false);
        }
        const jwtVerify = jwt.verify(token,"passwordKey");

        if(!jwtVerify){
          return res.json(false);
        }

        const user = await User.findById(jwtVerify.id);
        if(!user) return res.json(false);

        res.json(true);


      }catch(e){
        res.status(500).json({error: e.message});
      }
    });


authRouter.get("/", auth,async (req,res)=>{
  const user = await User.findById(req.user);
  res.json({...user._doc,token:req.token});
});

//we can't use it directly so this method help to use it (you can say it's public keyword or somthing)
module.exports = authRouter;
