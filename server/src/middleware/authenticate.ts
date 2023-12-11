import jwt, { VerifyErrors } from 'jsonwebtoken'
import ApiError from "../utils/apiError"
import httpStatus from "http-status"
import { NextFunction, Response } from "express"
import { IAuthRequest } from '../interfaces/User'
import { config } from '../config/config'
import UserModel from '../models/User.model'


const checkTokenInRequest = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    try {
        const authHeader = (req && req.headers.authorization) || (req && req.headers.Authorization);
        const token = (authHeader && authHeader.split(' ')[1]) || req?.cookies?.authToken || req?.cookies?.accessToken || '';

        if (!token) {
            // throw new ApiError(httpStatus.UNAUTHORIZED,'Unauthorized');
            res.send(httpStatus.UNAUTHORIZED).json({message: "authentication failed", statusCode:401})
        }

        jwt.verify(token, config.jwt.secret as jwt.Secret, async (error:VerifyErrors|null, decodedUser:any) => {
            
            if(error) {
                const errorMsg = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
                res.send(httpStatus.FORBIDDEN).json({message: "errorMsg", statusCode: 403})
                // throw new ApiError(httpStatus.FORBIDDEN,'errorMsg'); 
            }
            
            try {

                const user = await UserModel.findById(decodedUser.sub).select('-password')
                if(!user) {
                    throw new ApiError(httpStatus.FORBIDDEN, 'unable to authorize');
                }
                req.user = user as any
                next()
            }catch(err) {        
                res.send(httpStatus.UNAUTHORIZED).json({message: "authentication failed", statusCode:401})
                // throw new ApiError(httpStatus.UNAUTHORIZED, 'authentication failed');
            }
        });
        
    } catch(err) {
        // throw new ApiError(httpStatus.UNAUTHORIZED, 'authentication failed')
        res.send(httpStatus.UNAUTHORIZED).json({message: "authentication failed", statusCode:401})
    }
}

const authenticate = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    try{
        await checkTokenInRequest(req, res, next)
        // const authenticated = await checkTokenInRequest(req, res)
        // if(!authenticated) return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized")
        // next()
    }catch(err) {
        res.send(httpStatus.UNAUTHORIZED).json({message: "authentication failed", statusCode:401})
    //    throw new ApiError(httpStatus.UNAUTHORIZED, 'authentication failed')
    }
}

const checkPermissionAdminOrSameUserReq = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    if(!req?.user || !req.user?.isAdmin || !req.user._id.equals(req.params.userId))  {
        
        // throw new ApiError(httpStatus.FORBIDDEN, 'Access Denied')
        res.send(httpStatus.FORBIDDEN).json({message: "Access Denied", statusCode: 403})
    }
    next()
}

const AdminOnlyAccess = async (req:IAuthRequest, res:Response, next:NextFunction) => {
    if(!req?.user || !req.user?.isAdmin){
        // throw new ApiError(httpStatus.FORBIDDEN, 'Access Denied')
        res.send(httpStatus.FORBIDDEN).json({message: "Access Denied", statusCode: 403})
    }
    next()
}


export {
    authenticate,
    checkPermissionAdminOrSameUserReq,
    AdminOnlyAccess
}