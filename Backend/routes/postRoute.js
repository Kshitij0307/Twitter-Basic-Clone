const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

//middleware to check if user is Logged in or not
const isLoggedIn = (req, res, next) => {
  if (req.cookies.token === "")
    return res.status(401).json({ error: "You need to be Logged in" });
  else {
    let data = jwt.verify(req.cookies.token, process.env.key);
    req.user = data;
  }
  next();
};

router.post("/createPost", isLoggedIn, async (req, res) => {
  const { content } = req.body;
  const userid = req.user.userid;
  const user = await userModel.findOne({ _id: userid });
  const newPost = await postModel.create({
    user: userid,
    content: content,
    userEmail: user.email,
  });

  user.posts.push(newPost._id);
  await user.save();

  res.status(201).json({ success: "Post created successfully" });
});

router.get("/getAllPosts", async (req, res) => {
  const posts = await postModel.find({});
  res.status(200).json(posts);
});


router.get("/like/:postid", isLoggedIn, async (req, res) => {
  const userid = req.user.userid;
  const postid = req.params.postid;

  const post = await postModel.findOne({ _id: postid });

  const userIndex = post.likes.indexOf(userid);

  if (userIndex === -1) {
    post.likes.push(userid);
    await post.save();
    const length = post.likes.length;
    return res.status(200).json({ msg: "Unlike", length });
  } else {
    post.likes.splice(userIndex, 1);
    await post.save();
    const length = post.likes.length;
    return res.status(200).json({ msg: "Like", length });
  }
});
router.get("/getLikes/:postid", isLoggedIn, async (req, res) => {
      const postid = req.params.postid;
      const userid = req.user.userid; 
  
      const post = await postModel.findOne({ _id: postid });
  
      const likeCount = post.likes.length;
      const userLiked = post.likes.includes(userid);
  
      return res.status(200).json({ like: likeCount, userLiked });
  });
  

router.delete("/delete/:postid", isLoggedIn, async (req, res) => {
  const userid = req.user.userid;
  const postid = req.params.postid;

  await postModel.findOneAndDelete({ _id: postid });
  const user = await userModel.findOne({ _id: userid });
  const postIndex = user.posts.indexOf(postid);

    if (postIndex > -1) {
      user.posts.splice(postIndex, 1);
      await user.save();
    } else {
      return res.status(404).json({ msg: 'Post not associated with user' });
    }

  return res.status(204).json({ msg: "Post Deleted successfully" });
});

module.exports = router;
