const express=require('express');
const auth=require('../../middleware/auth')
const {check,validationResult}=require('express-validator')
const Post=require("../../moels/post")
const User=require('../../moels/user')
const Profile=require('../../moels/profileuser')

const router=express.Router();

router.post("/",[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

   try{
    const user = await User.findById(req.user.id).select('-password');

    const newpost={
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    }
    const post=new Post(newpost)
    await post.save();
    return res.json(post)

   }catch(err){
       console.log(err.message)
       res.status(500).send("Server Error")
   }

    
})

router.get("/",auth,async(req,res)=>{
    try{
        const posts=await Post.find().sort({date:-1})
        return res.json(posts)
    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
})


router.get("/:user_id",auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.user_id)
        if(!post){
            return res.json({msg:"No post found"})
        }

        return res.json(post);
    }catch(err){
        console.log(err.message)
        if(err.kind=='ObjectId'){
            return res.json({msg:"No post found"})
        }
        res.status(500).send("server error")
    }
})
router.delete("/:user_id",auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.user_id)
        if(post.user.toString() !==req.user.id){
            res.status(401).json({msg:"user not authorized"})
        }
        if(!post){
            return res.json({msg:"No post found"})
        }

        await post.remove();

        return res.json({msg:"post removed successfully"});
    }catch(err){
        console.log(err.message)
        if(err.kind=='ObjectId'){
            return res.json({msg:"No post found"})
        }
        res.status(500).send("server error")
    }
})


router.put("/like/:id",auth,async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)

        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.json(400).json({msg:"post already liked"})
        }

        post.likes.unshift({user:req.user.id})
        await post.save();
        res.json(post.likes)

    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
})

router.put("/unlike/:id",auth,async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)

        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:"post not yet liked"})
        }

        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes)

    }catch(err){
        console.log(err.message)
        res.status(500).send("server error")
    }
})


router.post("/comment/:id",[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

   try{
    const user = await User.findById(req.user.id).select('-password');
    const post=await Post.findById(req.params.id)
    const newcomment={
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    }
    post.comments.unshift(newcomment);
    await post.save();
    return res.json(post.comments)

   }catch(err){
       console.log(err.message)
       res.status(500).send("Server Error")
   }

    
})

router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        const comment=post.comments.find(comment=>comment.id===req.params.comment_id)

        if(!comment){
            return res.status(404).json({msg:"no comment found"})
        }


        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({msg:"authorization denied"})
        }

        const removeIndex=post.comments.map(like=>like.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments)

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error")
    }
})

module.exports = router;