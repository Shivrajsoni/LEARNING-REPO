const { Router } = require("express");
const userModel = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY="HULULU";

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
       

        const token = jwt.sign({
            email: user.email,
        },JWT_SECRET_KEY);

     
        res.cookie('authatoken',token,{
            httpOnly:true,
            maxAge: 60*60
        })
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

UserRouter.get('/Signin/protected-resource', (req, res) => {
    const token = req.cookies.token;

    // If the token doesn't exist, deny access
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token,JWT_SECRET_KEY);

        res.json({ message: 'Access granted', user: decoded.username });
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
});


module.exports=UserRouter;