const { Router } = require("express");
const router = Router()
const userCtr = require("../controllers/user.controller")

//update user
router.put("/:id", userCtr.update)
//delete user
router.delete("/:id", userCtr.remove)
//get user
router.get("/", userCtr.user)
//folow user
router.put("/:id/follow", userCtr.follow)
//unfollow user
router.put("/:id/unfollow", userCtr.unfollow)
//get all friends
router.get("/friends/:userId", userCtr.getFriends)


module.exports = router
