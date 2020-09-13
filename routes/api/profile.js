const express = require('express');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



const router = express.Router();

//@route GET API/profile/me
// @DESC TEST ROUTE 
// @ ACCESS PUBLIC

router.get('/me',auth,async(req,res)=>{
    try{

        const profile = await Profile.findOne({user:req.user.id}).populate('user',
        ['name','avatar','email']);
        if(!profile){
            return res.status(400).json({msg:"there is no profile for these user"});

        }
        res.status(201).send(profile);

    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.post('/',auth,async (req,res) =>{

    try{
        const profile = new Profile({...req.body,user:req.user.id});
       
        await profile.save();
        res.send(profile)
    }catch(err){
        res.status(500).send({error:err})
    }

});

//getting all the profiles of the user
router.get('/', async (req,res) =>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (error) {
        console.log(error.message);
        res.send(500).send('server error');
    }
})

router.get('/:query',async (req,res) => {
    if(req.params.query==='education')
    {
        const profiles =await Profile.find().populate('user',['name','email','avatar']);
        const education_profiles=profiles.map((profile) =>{
            return {...profile.education,user:profile.user};
        });
       return  res.send(education_profiles);
    }

    res.send("invalid token")
})


//delete api/profile
//delete profile,user& posts
// Private


router.delete('/',auth,async (req,res) =>{
    try {
        //remove Profile
        await Profile.findOneAndRemove({user:req.user.id});
        //remove user
        await User.findByIdAndRemove(req.user.id);
        res.status(201).send({message: "user and profile removed"});

    } catch (error) {
        res.status(404).send({error:error});
    }
})

module.exports = router;