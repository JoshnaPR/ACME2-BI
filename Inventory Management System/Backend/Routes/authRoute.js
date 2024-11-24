const express = require ("express");
const AuthController = require("../Controllers/authController");
const checkRole=require('../middleware/roleMiddleware');

const router = express.Router(); 
//this router object will allow me to create some routes
//like router.post, router.get, etc

router.post('/register',AuthController.registerUser);
router.post('/login', AuthController.loginUser);

router.post('/admin-endpoint', checkRole('Admin'),(req,res)=>{
    res.json({message:'Admin endpoint accessed'});
});

router.post('/volunteer-endpoint', checkRole('Volunteer'),(req,res)=>{
    res.json({message:'Volunteer endpoint accessed'});
});

module.exports = router;