const express = require ("express");
const AuthController = require("../Controllers/authController");

const router = express.Router(); 
//this router object will allow me to create some routes
//like router.post, router.get, etc

router.post('/register',AuthController.registerUser)
router.post('/login', AuthController.loginUser)

module.exports = router;