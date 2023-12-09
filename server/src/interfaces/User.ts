import { Request } from "express";
import { Document } from "mongoose"

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    isAdmin:Boolean;
}

export interface IRequestUser extends Request {
    user: IUser;
}
  
export interface IAuthRequest extends Request {
    headers: { authorization?: string; Authorization?: string };
    cookies: { authToken?: string; accessToken?: string; refreshToken?: string };
    user?: IUser;
}