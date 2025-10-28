import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
export const signIn = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({message:'Email or Password missing'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'User not Exists. SignUp!'})
        }
        console.log(email) 
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials 1'})
        }
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const signUp = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        console.log(name);
        console.log(email);
        console.log(password);
        if(!email||!password||!name){
            return res.status(400).json({message:'Fields missing'})
        }
        if(password.length<6){
            return res.status(400).json({message:'Password must have alteast 6 characters'})
        }
        console.log(name);
        console.log(email);
        console.log(password);
        const existingUser  = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }
        console.log(name);
        console.log(email);
        console.log(password);    
        const user = new User({name,email,password})
        await user.save();
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )
        console.log(name);
        console.log(email);
        console.log(password);
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const me = async (req, res) => {
  try { 
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
