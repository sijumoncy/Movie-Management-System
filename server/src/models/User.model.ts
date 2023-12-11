import bcrypt from 'bcryptjs';
import { Document, Model, Schema, model, models } from 'mongoose';
import { IUser } from '../interfaces/User';

// export interface IUserDocument extends Model<IUser, Document> {
//   isEmailExist(email:string, excludeUserId?:Schema.Types.ObjectId):Promise<boolean>
// }

// const UserSchema = new Schema<IUser, IUserDocument, Document>(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isAdmin:{
//       type: Boolean,
//       default:false
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// // shcema fucntion to check the email exist or not
// UserSchema.static('isEmailExist', async function isEmailExist(email:string, excludeUserId:string){
//     const user:IUserDocument | null = await this.findOne({ email, _id: { $ne: excludeUserId }});
//     return !!user
// })

// UserSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     const salt = await bcrypt.genSalt(12);
//     user.password = await bcrypt.hash(user.password, salt);
//   }
//   next();
// });

// const UserModel = model<IUser, IUserDocument>('User', UserSchema);
// export default UserModel;


interface IUserModel extends Model<IUser> {
  isEmailExist(email: string, excludeUserId?:string): Promise<IUser | null>;
  matchPassword(
    candidatePassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

const userSchema = new Schema(
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailExist = function (
  email: string,
  excludeUserId?: string
): Promise<IUser | null> {
  return this.findOne({ email, _id: { $ne: excludeUserId } }).exec();
};

userSchema.statics.matchPassword = async function (
  candidatePassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.pre<IUser>('save', async function (next) {
  // Hash the password before saving to the database
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const UserModel: IUserModel = model<IUser, IUserModel>(
  'User',
  userSchema
);

export default UserModel
