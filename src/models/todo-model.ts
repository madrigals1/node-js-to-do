import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo {
    refreshToken: string;
};

export interface ITodoDoc extends Document, ITodo {}

const ToDoSchema = new Schema({
    name: {type: String},
    isDone: {type: Boolean}
},{ timestamps: { createdAt: 'created_at' } });

// Export the model and return your User interface
export const ToDoModel = mongoose.model<ITodo>('Todo', ToDoSchema);