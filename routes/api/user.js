
const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth')
//@route GET API/USERS
// @DESC TEST ROUTE 
// @ ACCESS PUBLIC
//bodyparser is included with express
router.get('/',(req,res)=>{
    res.send('user route');
})

router.post('/',async (req,res)=>{
    try{
        
        
        const {name,email,password} = req.body;
        let user = await User.findOne({email:email});
        if(user)
        return res.status(404).send({errors:{
            message:"user already exists"
        }})
        
        //
        //
        //
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg', //rating
            d:'mm',
        })
        

        
        const doc = new User({...req.body,avatar});

        // const salt = await bcrypt.genSalt(10); //no of rounds
        // doc.password= await bcrypt.hash(password,salt);
        
        

         await doc.save()

         const payload ={
             user:{
                 id: doc.id
             }
         }
         jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.json({user:doc,token});
            }
            );

       // res.status(201).json(doc);
    }
    catch(error){
        res.status(400).send({error:error});
    }
})

router.get('/all',(req,res)=>{
    User.find().then((docs)=>{
        res.send(docs);
    }).catch((error)=>{
        res.status(404).send({error:'some error occured'})
    })
});



router.get('/:id',async (req,res)=>{
    
    try {
        const doc = await User.findById(req.params.id);
        res.send(doc);
    } catch (error) {
        res.status(500).send(error);
    }

})
//delete experience by id

//find corret experience using  map 
module.exports = router;