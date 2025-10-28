import { User } from '../models/user.js';
import jwt from 'jsonwebtoken'
export const auth =async (req,res,next)=>{
    try{ 
        const token = req.header('Authorization')?.replace('Bearer ','');
        // console.log("Auth Header:", token);
        if(!token){
            return res.status(400).json({message:'Authorization deined'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(400).json({message:'Token not valid'})
    }
}