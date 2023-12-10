import bcrypt from 'bcryptjs';
import { Document, Model, Schema, model, models } from 'mongoose';
import { IUser } from '../interfaces/User';

export interface IUserDocument extends Model<IUser> {
  isEmailExist(email:string, excludeUserId?:Schema.Types.ObjectId):Promise<boolean>
}

const UserSchema = new Schema<IUser, IUserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

// shcema fucntion to check the email exist or not
UserSchema.static('isEmailExist', async function isEmailExist(email:string, excludeUserId:string){
    const user:IUserDocument | null = await this.findOne({ email, _id: { $ne: excludeUserId }});
    return !!user
})

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const UserModel = model<IUser, IUserDocument>('User', UserSchema);
export default UserModel;
