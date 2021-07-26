import { ToDoModel } from "../models/todo-model";

class ToDoService {
   async createToDo(userId: any, name: string, isDone: boolean) {
        const toDoData: any = await ToDoModel.findOne({userId});
        if (toDoData) {
            toDoData.name = name;
            return toDoData.save();
        };

        return await ToDoModel.create({user: userId, name, isDone});
    };
};

export const toDoSerivce = new ToDoService();