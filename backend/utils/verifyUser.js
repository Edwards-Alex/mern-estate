
import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken = (req,res,next) => {

    console.log(req.cookies);

    const token = req.cookies.access_token;
    
    if(!token) return next(errorHandler(401,' Unanthorized')); /* res.state(401).json({success:false,error:' Unanthorized'}) */

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if (err) return  next(errorHandler(403, 'Forbidden')); /* res.state(403).json({success:false,error:'Forbidden'}) */

        req.user = user;
        next();
    });
}