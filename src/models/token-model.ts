import mongoose, { Schema, Document } from 'mongoose';

export interface IToken {
  refreshToken: string;
}

export interface ITokenDoc extends Document, IToken {}

const TokenSchema = new Schema({
  refreshToken: { type: String, ref: 'User' },
});

// Export the model and return your User interface
export const TokenModel = mongoose.model<ITokenDoc>('Token', TokenSchema);
