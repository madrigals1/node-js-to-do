import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface InputUser {
    id?: ObjectId;
    email: UserModel['email'];
    password: UserModel['password'];
};

export interface UserModel extends Document {
    email: string;
    password: string;
};

const UserSchema: Schema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});

// Export the model and return your User interface
export default mongoose.model<UserModel>('User', UserSchema);