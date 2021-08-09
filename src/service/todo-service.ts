import { ApiError } from '../exceptions/api-error';
import { ITodo, ToDoModel } from '../models/todo-model';
import userModel, { UserModel } from '../models/user-model';

export class ToDoService {
  // create todo in todos field in userShema
  static async createToDos(
    userId: any,
    newToDo: ITodo,
  ): Promise<UserModel | null> {
    try {
      const user = await userModel.findByIdAndUpdate(
        userId,
        {
          $push: {
            todos: newToDo,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        },
      );

      return user;
    } catch (error) {
      throw ApiError.BadRequest('Cannot create todos');
    }
  }

  static async deleteTodos(
    todoId: any,
    userId: any,
  ): Promise<UserModel | null> {
    try {
      await userModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            todos: { _id: todoId },
          },
        },
      );
      const user = await userModel.findById(userId);
      return user;
    } catch (error) {
      throw ApiError.BadRequest('Error when deleted todo');
    }
  }

  static async editTodos(userId: any, todo: any, todos: any): Promise<any> {
    const todoList = todos.filter((item: any) => item._id !== todo._id);
    const newTodo = [todo, ...todoList];
    // eslint-disable-next-line no-console
    console.log(newTodo);
    try {
      const user = await userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            todos: newTodo,
          },
        },
        {
          new: true,
        },
      );

      return user;
    } catch (error) {
      throw ApiError.BadRequest('Error when edit todo');
    }
  }

  // get todo from database
  static async getToDos(): Promise<any> {
    try {
      const toDoList: any = await ToDoModel.find();
      return toDoList;
    } catch (error) {
      throw ApiError.BadRequest('erro when get todo list');
    }
  }
}

export const toDoSerivce = new ToDoService();
