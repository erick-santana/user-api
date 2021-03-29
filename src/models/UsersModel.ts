import { model, Schema, Document } from 'mongoose';
import { User } from '../interfaces/IUsers';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<Document & User>('User', userSchema);

export default userModel;
