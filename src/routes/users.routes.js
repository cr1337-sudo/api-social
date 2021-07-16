const { Router } = require("express");
const router = Router()
const userCtr = require("../controllers/user.controller")

//update user
router.put("/:id", userCtr.update)
module.exports = router