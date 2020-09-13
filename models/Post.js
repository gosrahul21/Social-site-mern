const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema =new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            data:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
});

PostSchema.pre('save',async function(next) {
    console.log("save called");
    next();
})
module.exports = mongoose.model('post',PostSchema)