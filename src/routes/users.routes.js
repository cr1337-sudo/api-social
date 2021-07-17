const { Router } = require("express");
const router = Router()
const userCtr = require("../controllers/user.controller")

//update user
router.put("/:id", userCtr.update)
//delete user
router.delete("/:id", userCtr.remove)
//get user
router.get("/:id", userCtr.user)
//folow user
router.put(":/id", userCtr.follow)
//unfollow user
router.put(":/id", userCtr.unfollow)


module.exports = router