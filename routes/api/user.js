const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator')
const gravatar=require("gravatar")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require('../../moels/user')

const config=require("config");
const jwtsecret=config.get("jwtsecret")
router.post("/",[
    check('name','Name is required').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min:6})
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({errors:[{msg:"User already exist"}]})
        }

        const avatar=gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        })

        user = new User({
            name,
            email,
            avatar,
            password

        })

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt)

        await user.save()
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