
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');

//auth middleware
const authmid = require('../../middleware/auth');
 //importing User model
 const User = require('../../models/User');

//@route GET API/USERS
// @DESC TEST ROUTE 
// @ ACCESS PUBLIC



router.get('/',authmid,async(req,res)=>{
    console.log("get called from auth")
    try{
        const user = await User.findById(req.user.id).select('-password'); //eliminate password from response
        res.status(201).send(user);
    }catch(error){
        res.status(404).send({error})
    }
});







router.post('/',async (req,res)=>{
    try{
        
        const {email,password} = req.body;
        let user = await User.findOne({email:email});
        if(!user)
        return res.status(404).send({errors:{
            message:"Email is not registered"
        }})
        
       

        const isAuthenticated = bcrypt.compare(password,user.password);
        
        if(!isAuthenticated)
        {
          return   res.status(404).send({error:{
                message:"Wrong email or password"
            }})
        }
       
        const payload = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(payload,config.get('jwtSecret'),
        {expiresIn: 360000});

        user.tokens = user.tokens.concat({token});
        await user.save();
        res.status(201).send({token}) ;

         
         
       // res.status(201).json(doc);
    }
    catch(error){
        res.status(400).send({error:error});
    }
});





module.exports = router;