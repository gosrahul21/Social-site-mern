const { Router } = require('express');
const express = require('express');
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const multer =require('multer')



const router = express.Router();

//@route GET API/profile/me
// @DESC TEST ROUTE 
// @ ACCESS PUBLIC

router.get('/me',auth,async(req,res)=>{
    try{
        console.log("/api/profile/me")
        const profile = await Profile.findOne({user:req.user.id}).populate('user',
        ['name','avatar','email']);
        if(!profile){
            
            return res.status(404).json({error:{msg:"there is no profile for these user"}});

        }
        console.log(profile)
        res.status(201).send(profile);

    }catch(error){
        console.log({error:error});
        console.error(error.message);
        res.status(500).send(error);
    }
});

router.get('/:id',async (req,res) => {
    try{console.log(req.params.id)
        const profile = await Profile.findOne({user:req.params.id}).populate('user',["id","avatar","name"]);
        
        res.send(profile);
    } catch(err){
        res.status(404).send(err);
    }
})

router.post('/',auth,async (req,res) =>{

    console.log(req.body);
    const {status,
        company,
        location,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram} =req.body;
        
        
        const data ={
            status,
            company,
            location,
            skills,
            githubusername,
            bio,
            social: {
                youtube,
                twitter,
                facebook,
                linkedin,
                instagram
              },
              handle:null,
              experience:[],
              education:[]
        }


        try{
        const profile = new Profile({...data,user:req.user.id});
        console.log(profile);
        await profile.save();
        console.log({profile})
        res.send(profile);
    }catch(err){
        console.log(err)
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
        res.send(500).send(error);
    }
})

// router.get('/:query',async (req,res) => {
//     if(req.params.query==='education')
//     {
//         const profiles =await Profile.find().populate('user',['name','email','avatar']);
//         const education_profiles=profiles.map((profile) =>{
//             return {...profile.education,user:profile.user};
//         });
//        return  res.send(education_profiles);
//     }

//     res.send("invalid token")
// })


//delete api/profile
//delete profile,user& posts
// Private

router.put('/experience',auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({user:req.user.id});
        console.log(req.body);
        const data = req.body;
        profile.experience.push(data);
        await profile.save();
        res.send(profile);

    } catch(err){
        res.status(500).send({error:err});
    }
});


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





// user,
//   handle,
//   company,
//   website,
//   location,
//   status,
//   skills,
//   bio,
//   githubusername,
  
 
//   social: {
//     youtube,
//     twitter,
//     facebook,
//     linkedin,
//     instagram 
//   },

//finding profile by userId


router.put('/education',auth, async (req,res) => {
    try{
        const profile = await  Profile.findOne({user:req.user.id});
        const data = req.body;
        console.log("education*********************************************")
        profile.education.push(data);
        
        await profile.save();
        res.send(profile);

    } catch(err){
        res.status(500).send({error:err});
    }
})




router.delete('/experience/delete/:id',auth,async (req,res) => {
     try{
         console.log("??????????????????",req.params.id)
        const profile =await Profile.findOne({user:req.user.id});
       const experience= profile.experience.filter((exp)=>{
            return exp.id!==req.params.id;
        });
        console.log(experience)
        profile.experience=experience;
        await profile.save()
        res.send(profile);
        
     } catch(err) {
        res.status(500).send({error:err})
     }
})


router.delete('/education/delete/:id',auth,async (req,res) => {
    try{
        const profile =await Profile.findOne({user:req.user.id});
        //res.send({id:profile.id,_id:profile._id,boolean:(profile.id===profile._id.toString())})
        const doc = profile.education.filter((educ)=> {
            return educ.id!==(req.params.id);
        })
        profile.education=doc;
        await profile.save();
        res.send(profile);
    }
    catch(err){
        res.status(500).send({error:err})
    }
});

//@route GET api/profile/github/username
//@desc Set user repos form Github
//@access Public

router.get('/github/:username',(req,res) => {
    try{
        const options ={ 
            url:`https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${
                config.get('githubSecret')
            }`,
            method:'GET',
            headers:{'user-agent': 'node.js'}

        };

        request(options, (error,response,body) => {
            if(error) console.log(error);
            if(response.statusCode !==200)
            {
                res.status(404).json({msg:"No Github profile found"});
            }

            res.json(JSON.parse(body));

        });
    } catch(err) {
        res.status(500).send(err);
    }
});

const upload = multer({
    limits:{
        fileSize:1000000
    }
})
router.put('/avatar',auth,upload.single('avatar'),async (req,res)=>{
try {
    
    if(req.file)
    {
        const user = req.user;
        user.avatar= req.file.buffer;
        await user.save();
        return res.send(user);
    }

    res.status(404).send({error:"image not found"});
} catch (error) {
    res.status(500).send({error});
}},(error,req,res,next)=>{
    res.status(500).send({error});
})


router.get('/image/:id',async (req,res)=>{
    try {
        const user  = await User.findById(req.params.id);
        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch (error) {
        
    }
})


module.exports = router;