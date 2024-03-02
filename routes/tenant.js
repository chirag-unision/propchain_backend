const express = require("express")
const router = express.Router()
const {
  login,
  signup,
} = require("../controllers/userController")
const { sendrequest, getpropinfo, getprops } = require("../controllers/tenantController")

// const { auth } = require("../middleware/auth")

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendrequest", sendrequest)
router.post("/getpropinfo", getpropinfo)
router.post("/getprops", getprops)

module.exports = router