const express = require("express")
const router = express.Router()
const {
  login,
  signup,
} = require("../controllers/Auth")

const { auth } = require("../middleware/auth")

router.post("/login", login)
router.post("/signup", signup)
router.post("/getprops", auth, changePassword)

module.exports = router