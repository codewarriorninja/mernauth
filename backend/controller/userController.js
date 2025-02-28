import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
//auth user

const authUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

//register user
//POST/api/users
//@access public
const registerUser = asyncHandler(async(req,res) => {

    const {name, email, password} = req.body;

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//logout user
//route   POST/api/users/logout
//@access public
const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(201).json({message:'User Logged out'})
});

//get user profile
//route  GET/api/users/profile
//@access private
const getuserProfile = asyncHandler(async(req,res) => {

    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(201).json(user)
});

//update user profile
//route PUT/api/users/profile
//@access private
const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
       user.name = req.body.name || user.name;
       user.email = req.body.email || user.email;

       if(req.body.password){
          user.password= req.body.password
       }
       
       const updatedUser = await user.save()
       res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email
       }) 
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.status(201).json({message:'Update user profile'})
});

export {
    authUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    getuserProfile
}