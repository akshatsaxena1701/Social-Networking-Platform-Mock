const mongoose=require('mongoose')

const profileschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String,
        require:true
    },
    bio:{
        type:String
    },
    skills:{
        type:[String]
    },
    githubusername:{
        type:String
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String
            },
            description:{
                type:String
            }
        }
    ],

    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Profile = mongoose.model('Profile',profileschema)