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

    async deleteTodos(todoId: any, userId: any): Promise<UserModel | null> {
        try {
            await userModel.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        todos: { _id: todoId }
                    }
                }
            );
            const user = await userModel.findById(userId);
            return user;
        } catch (error) {
            throw ApiError.BadRequest('Error when deleted todo')
        }


    };

    async editTodos(todo: any): Promise<any> {
        try {
            const editedTodo = await ToDoModel.findByIdAndUpdate(todo._id, todo);
            return editedTodo;
        } catch (error) {
            throw ApiError.BadRequest('Error when edit todo');
        }
    }

    // get todo from database
    async getToDos(): Promise<any> {
        try {
            const toDoList: any = await ToDoModel.find();
            return toDoList;
        } catch (error) {
            throw ApiError.BadRequest('erro when get todo list');
        }

    }

};

export const toDoSerivce = new ToDoService();