const express = require("express")
const router = express.Router()
const {
  login,
  signup,
} = require("../controllers/userController")

// const { auth } = require("../middleware/auth")

router.post("/login", login)
router.post("/signup", signup)
// router.post("/signup", auth, addprops)
// router.post("/signup", auth, getprops)
// router.post("/signup", auth, getpropinfo)
// router.post("/signup", auth, getrequests)
// router.post("/signup", auth, handlerequest)
// router.post("/signup", auth, getpropstatus)
// router.post("/signup", auth, getprophistory)
// router.post("/getprops", auth, changePassword)

module.exports = router