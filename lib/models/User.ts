import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'vendor' | 'seller';
  fssaiCode?: string;
  isVerified: boolean;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'vendor', 'seller'],
    required: true,
  },
  fssaiCode: {
    type: String,
    required: function(this: IUser) { return this.role === 'seller'; },
    validate: {
      validator: function(this: IUser, v: string) {
        return this.role !== 'seller' || (v && v.length === 14);
      },
      message: 'FSSAI Code must be 14 digits for sellers'
    }
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);