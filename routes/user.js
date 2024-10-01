const { Router } = require("express");
const userModel = require("../db");
const bcrypt = require("bcrypt");

const generateToken =require("../functions/generate_tokens");
const restricted=require("../middleware/restricted");

const cookie = require("cookie");
const UserRouter=Router();


UserRouter.post("/Signup",async(req,res)=>{
    const{ name ,email,password }=req.body;
    // why below line is givu=ing error on postman while signup??
    // if(!req.name || !req.email || !req.password){
    //     return res.status(400).json({message:"Please fill all the fields"});
    // }
    await userModel.create({
        name:name,
        email:email,
        password:password,
    }).then(
        (data)=>{
            console.log("data putted in database ");
        }
    )

    res.json({
        message:"Signed Up successfully"
    })

})

UserRouter.post('/Signin',async(req,res)=>{
    const{email,password}=req.body;
    const user=await userModel.findOne({email:email});
    if(user.password===password){

        const token=generateToken(user.email);     
        res.json({
            message: "Signed In successfully",
            token: token
        })
    }
    else{
        res.json({
            message:"Invalid Credentials"
        })
    }
})

UserRouter.get('/Protected',restricted,(req,res)=>{
    res.send(`Hello , ${req.user.name}!`);
})




module.exports=UserRouter;