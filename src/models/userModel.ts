
import { Document, Model, model, Schema } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
  createdAt: { type: Date, required: true},
  updatedAt: { type: Date, required: true},

});

const UserModel: Model<IUser> = model<IUser>('User', userSchema);

export default UserModel;