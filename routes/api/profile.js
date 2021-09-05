const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const config=require('config')
const auth=require('../../middleware/auth')
const Profile=require('../../moels/profileuser')
const {check,validationResult}=require('express-validator')
router.get("/me",auth,async(req,res)=>{

    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
           return  res.status(400).json({msg:"no profile for the user"})
        }

    }catch(err){
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
})


router.post("/",[auth,[
    check('status',"status empty").not().isEmpty(),
    check('skills',"skills required").not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg:"check your input fields"})
    }

    const {
        company,website,location,bio,status,githubusername,skills
    }=req.body;

    const profileuser={}
    profileuser.user=req.user.id;
    if(company)
    profileuser.company=company
    if(website) 
    profileuser.company=website
    if(status)
    profileuser.company=status
    if(bio) 
    profileuser.company=bio
    if(location) 
    profileuser.company=location
    if(githubusername){
        profile.user.githubusername=githubusername
    }
    if(skills) 
    profileuser.skills=skills.split(",").map(skill=>skill.trim())

    console.log(profileuser.skills)

    try{
        let profile=await Profile.findOne({user:req.user.id})
        if(profile){
            profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileuser},{new:true})
            return res.json(profile)
        }

        //create profile

        profile=new Profile(profileuser)
        await profile.save()
        res.json(profile)

    }catch(err){
        console.log(err.message)
        return res.status(500).send("Server error")
    }
})

router.get("/",async(req,res)=>{
    try{
        const profiles=await Profile.find().populate('user',['name','avatar'])
       return res.json(profiles)
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
})
router.get("/user/:user_id",async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).send("no profile for the user")
        }

      
        return res.json(profile)
    }catch(err){
        console.log(err.message);
        if(err.kind=="ObjectId"){
            return res.status(400).send("no profile for the user")
        }
        res.status(500).send("server error")
    }
})

router.delete("/",auth,async(req,res)=>{
    try{
        await Profile.findOneAndRemove({user:req.user.id})
        await User.findOneAndRemove({_id:req.user.id})

       return res.json({msg:"User deleted Successfully"})
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
})

router.put("/experience",[auth,[
    check('title',"title required").not().isEmpty(),
    check('company',"Company required").not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {
        title,company,location,description
    }=req.body;

    const newexp={
        title,
        company,
        location,
        description
    }

    try{
        const profile=await Profile.findOne({user:req.user.id})

        profile.experience.unshift(newexp);
        await profile.save();

        res.json({profile})


    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }

})

router.delete("/experience/:exp_id",auth,async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id})

        const removeindex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
       profile.experience.splice(removeindex,1);
       await profile.save()
       return res.json(profile)

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
})

module.exports = router;