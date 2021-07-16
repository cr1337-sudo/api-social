const { Router } = require("express");
const router = Router()
const authCtr = require("../controllers/auth.controller")

router.post("/register", authCtr.register)
router.post("/login", authCtr.login)

module.exports = router;

