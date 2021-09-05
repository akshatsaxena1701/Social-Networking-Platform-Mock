const express=require('express');
const router=express.Router();
const auth=require("../../middleware/auth")
const User = require("../../moels/user")
const {check,validationResult}=require('express-validator')
const gravatar=require("gravatar")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("config");
const jwtsecret=config.get("jwtsecret")

router.get("/",auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password')
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json({msg:"No user found"})
    }

})

router.post("/",[
    check('email').isEmail().exists(),
    check('password','Password is required').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
        }

        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
        }
        
        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,jwtsecret,{expiresIn:360000},(err,token)=>{
            if(err)
            throw err;
            res.json({token})
        })


    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error")
    }
    
})

module.exports = router;