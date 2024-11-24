const User =require("../Models/User");
const jwt= require('jsonwebtoken');
const speakeasy=require('speakeasy');
const qrcode=require('qrcode');
require('dotenv').config();
const secretKey=process.env.JWT_SECRET;


async function registerUser(req,res){
    let {firstName, lastName, username,email,password, role} = req.body;
    try{
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length>0){
            return res.status(400).send({message:"User already registered with this username!"});
        } 

        const twoFactorSecret=speakeasy.generateSecret({length:20});

        // create new user
        let user = new User({firstName, lastName, username,email, password,role, twoFactorSecret:twoFactorSecret.base32});
        const result = await user.save();
        console.log(result);

        const qrCodeUrl=await qrcode.toDataURL(twoFactorSecret.otpauth_url);

        res.status(201).send({message:'User registered successfully!', qrCodeUrl});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

async function loginUser(req,res){
    try{
        const {username,password, twoFactorCode}=req.body;

        // find the user by their username
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).send({message:"Authentication Failed!"});
        }
        // this checks whther the password is valid or not
        const isPasswordValid =await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).send({message:"Incorrect Password!"});
        }

        const isTwoFactorValid=speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: twoFactorCode
        });

        if(!isTwoFactorValid){
            return res.status(400).send({message:"Invalid 2FA code!"});
        }

        // this generates JWT token including user route
        let token = jwt.sign(
            {
                userId:user?._id,
                username:user?.username,
                role:user?.role
            },
            secretKey,
            {expiresIn: '1h'}
        );

        // this sends user data along with token 
        let finalData={
            userId:user?._id,
            username:user?.username,
            firstName:user?.firstName,
            lastName:user?.lastName,
            // email:user?.email,
            role:user?.role,
            token
        };

        res.send(finalData);
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }

}

const AuthController={
    registerUser,
    loginUser
}

module.exports = AuthController;