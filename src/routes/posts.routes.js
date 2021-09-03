const { Router } = require("express");
const router = Router()
const postCtr = require("../controllers/posts.controller")

//Create post
router.post("/", postCtr.post);
//Delete post
router.delete("/:id", postCtr.remove);
//like/dislike
router.put("/:id/like", postCtr.like)
//get post
router.get("/:id", postCtr.getPost)
//my posts and friends posts
router.get("/timeline/:userId", postCtr.timeline)
//get all user posts
router.get("/profile/:username", postCtr.userPosts)


module.exports = router;
