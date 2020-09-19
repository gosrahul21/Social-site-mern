
const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route GET API/USERS
// @DESC TEST ROUTE 
// @ ACCESS PUBLIC
router.get('/me',auth,async (req,res) => {
  try {
    const posts = await Post.find({user:req.user.id}).sort({date:-1});
    res.status(201).send(posts);
  } catch (error) {
    res.status(500).send({error:"Server error"});
  }
});
router.post('/',auth,async (req,res) => {
  console.log("post runned");
  const user = await User.findById(req.user.id).selected('-password');
  
  try {
    const {
        text,name,avatar,user=req.user.id
    }= req.body;
  
    const post = await new Post({text,name,user,avatar});
    await post.save();
    res.status(201).send(post);
  } catch (error) {
      res.status(404).send({error});
  }

});

//route GET api/routers
//@desc Get alt posts
router.get('/',auth,async (req,res) =>{
  try {
    const posts =await Post.find().sort({date:-1}) //most recent 
    res.status(201).send(posts);
  } catch (error) {
    res.status(404).send({error:"there is no post for this user"});
  }
});


router.get('/:id',auth,async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if(!post)
    return res.status(404).send({error:"post not found"});
    res.status(201).send(post);
  } catch (error) {
    if(error.kind==='ObjectId')
    return  res.status(404).send(error);
    res.status(500).send("server error");
  }
});

//delete post
//require id

router.delete('/:id',auth, async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    console.log(post.user===req.user.id)
    if(post.user.toString() !== req.user.id)
    {
     
      return res.status(401).json({error:"user not Authorized"});

    }

    //await Post.findByIdAndRemove(req.params.id);
    await post.remove();
    res.send({message:"post deleted"});

  }catch(err){
    res.status(500).send("server error" )
  }
})

//routes for likes
//PUT api/posts/like/:id

router.put('/like/:id',auth,async (req,res) =>{
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked
    const likes = post.likes.filter((like) => {
      return like.user.toString()!==req.user.id;
    });
    if(likes.length!==post.likes.length)
    {
      post.likes=likes;
      await post.save();
      return res.status(201).send({message:"post unliked"});
    }
    
    
    //post.likes.push({user:req.user.id});
    post.likes.unshift({user:req.user.id});
    await post.save();
    return res.send(post);
  } catch (error) {
    res.send(error);
  }
})


router.post('/update/:id',auth,async (req,res) =>{
  try{
    const post = await Post.findById(req.params.id);
    await Post.findOneAndUpdate({id:req.params.id},post);
  res.send("all set");
  }
  catch(e){
    res.send(e);
  }
});

//comment post

router.post('/comment/:id',auth,async (req,res) => {

  try {
    const post = await Post.findById(req.params.id);
    post.comments.unshift({...req.body,user:req.user.id});
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.delete('/comment/:id/:comment_id',auth,async (req,res) => {
  try {
    //pull out the comment
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    if(!comment)
    {
      return res.status(404).json({message:"comment doesnot exist"});
    }

    if(comment.user.toString()!==req.user.id)
    {
      return res.status(401).json({message:"User not authorized"});
    }

    const comments = post.comments.filter((comment) => {
      return comment.id!==req.params.comment_id
    });
    console.log(comments);
    post.comments= comments;
    await post.save();
    res.send(post);

    


  } catch (error) {
    res.status(500).send({error})
  }
})

module.exports = router;