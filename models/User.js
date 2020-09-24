const mongoose = require( 'mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email provided")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.length<8){
               throw new Error("Password length must be atleast 8 character long");
            }
        }
    },
    avatar:{
        type:Buffer
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
        
    ]
},
{
    timestamps:true
}
);

//before saving this is runned as a middleware
UserSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password'))
    {
        const salt = await bcrypt.genSalt(10);
        user.password =await bcrypt.hash(user.password,salt);
    }
    next();

});



module.exports = mongoose.model('User',UserSchema);
