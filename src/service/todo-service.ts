import { ApiError } from "../exceptions/api-error";
import { ITodo, ToDoModel } from "../models/todo-model";
import userModel, { InputUser, UserModel } from "../models/user-model";

class ToDoService {
    // create todo in todos field in userShema
    async createToDos(userId: any, newToDo: ITodo): Promise<UserModel | null> {
        try {
            const user = await userModel.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        todos: newToDo
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            );

            return user;
        } catch (error) {
            throw ApiError.BadRequest('Cannot create todos');
        }
    }

    // get todo from database
    async getToDos(): Promise<any> {
        try {
            const toDoList: any = await ToDoModel.find();
            return toDoList;
        } catch (error) {
            throw ApiError.BadRequest('erro when fet todo list');
        }
    
    }

};

export const toDoSerivce = new ToDoService();