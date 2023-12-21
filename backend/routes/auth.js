const express =require("express");
const router =express.Router();
const bcrypt = require('bcryptjs');
const User=require('../models/User');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET="Samratisagoodb$oy";
var fetchuser=require('../middleware/fetchuser')



//ROUTE 1:create a user using :POST "/api/auth/".Doesn't require authentication 
router.post('/createuser',[
  //these are just some valid syntax for our information to be written 
    body('name','Enter a valid name ').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),//is email means that it has to be an email 
    body('password','Password minimum length is 5').isLength({ min: 5 })
],async(req,res)=>{
  //checking if there are any error if yes then return it in array form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //finding if the user already exists 
    try{
    let user=await User.findOne({email:req.body.email})
    if(user){
      return res.status(400).json({error:"sorry the user already exists"})
    }
    //here if the user is unique or first time entry them we will use our defined schema and put values according to that as 
    //req.body is the one which we actully send to the server so we will take specific values from it like name,email,password and stick it to our schema
    const salt=await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    console.log(user)
    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email

      })
    console.log(user)

      //for authentication with the help of the id of the user 
      const data={
        user:{
          id:user.id
        }
      }
     const authtoken= jwt.sign(data,JWT_SECRET);
     console.log(authtoken);
    res.json({authtoken});

    // res.send(user)
    }catch(error){
      console.error(error.message);
      res.status(500).send("some error occured ")
    };
})
//ROUTE 2: for LOgin 
router.post('/login',[
    body('email','Enter a valid email').isEmail(),//is email means that it has to be an email 
    body('password','password cannot be blank').exists()
],async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
    
  const {email,password}=req.body;
  try{
    let user= await User.findOne({email})
    console.log(user)
    if(!user){
      return res.status(400).json({error:"please try to log with correct credientials "})
    }
    const passwordCompare= await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({error:"please try to log with correct credientials "})
    }
    const data={
      user:{
        id:user.id
      }

    }
    console.log(data)
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken})

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error ")                                    
  }
})

// ROUTE 3: for getting the data of the user who logged in 
router.post('/getuser',fetchuser,async(req,res)=>{
  try{
    userId=req.user.id;
    console.log('userId')
    console.log(userId)
   const  user=await User.findById(userId).select("-password")
   res.send(user)

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error ")                                    
  }
})




module.exports=router


// npm i bcryptjs 
// npm i jsonwebtoken


 // const user=User(req.body)
    // user.save()
    // console.log(req.body)