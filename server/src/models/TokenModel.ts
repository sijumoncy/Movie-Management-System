import {Schema, model} from 'mongoose';
import { TokenI, tokenTypes } from '../interfaces/Token';

const tokenSchema = new Schema<TokenI>({
    token: {
        type: String,
        required: true,
        index: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: [tokenTypes.REFRESH],
        required: true,
      },
      expires: {
        type: Date,
        required: true,
      },
      blacklisted: {
        type: Boolean,
        default: false,
      },
    
}, {timestamps:true})

const TokenModel = model<TokenI>("Token", tokenSchema)
export default TokenModel;