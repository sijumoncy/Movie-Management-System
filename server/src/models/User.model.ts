import bcrypt from 'bcryptjs';
import { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

export interface IuserDocument extends Document, IUser {
  matchPasswords(password: string): Promise<boolean>;
  isEmailExist(
    email: string,
    excludeUserId?: Schema.Types.ObjectId
  ): Promise<boolean>;
}

const UserSchema: Schema<IuserDocument> = new Schema(
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
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// shcema fucntion to check the email exist or not
UserSchema.static('isEmailExist', async function isEmailExist(email:string, excludeUserId:string){
    const user:IuserDocument = await this.findOne({ email, _id: { $ne: excludeUserId }});
    return !!user
})

UserSchema.pre('save', async function (next) {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    console.log('Middleware called before saving the user is', this);
  }
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
