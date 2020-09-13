const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');



module.exports=  async function(req,res,next){
    //get token from header
   
    const token = req.header('x-auth-token');

    //check if token is present or not
    if(!token){
        return res.status(404).send({msg:'No token ,authorization declined'});

    }

    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        const user = await User.findById(decoded.user.id);
        req.user = user;
        console.log(req.user);

        
        next();
    }catch(err){
        res.status(500).json({msg:'Token is not valid'})
    }


}
