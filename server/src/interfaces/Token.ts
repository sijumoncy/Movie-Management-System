import { Schema } from "mongoose";

export enum tokenTypes {
    ACCESS = 'access',
    REFRESH = 'refresh',
}

export interface TokenI {
    token: string;
    user: Schema.Types.ObjectId;
    type: tokenTypes;
    expires:Date;
    blacklisted:boolean;
}