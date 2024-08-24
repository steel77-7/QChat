
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";

export const authenticator =asyncHanlder(async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken
        if(!token){
            throw new ApiError(401,"Invalid Token")
        }
    
        const decodedToken = jwt.decode(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = User.findById(decodedToken._id)
    
        if(!user)
            throw new ApiError(401,"Invalid Token")
    
        req.user = user._id
        next()
    } catch (error) {
        throw new ApiError(401,"Invalid token")
    }
})