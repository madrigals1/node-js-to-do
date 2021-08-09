import { Response, Request, NextFunction } from 'express';

import { ToDoModel } from '../models/todo-model';
import { ToDoService } from '../service/todo-service';

export class ToDoController {
  static async getToDo(
    req: Request | any,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const todo = await ToDoService.getToDos();
      return response.json(todo);
    } catch (error) {
      return next(error);
    }
  }

  static async updateUserWithTodos(
    req: Request | any,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const todo = req.body;
      const newToDo = await ToDoModel.create(todo);
      const res: any = await ToDoService.createToDos(req.user.id, newToDo);
      return response.json({
        email: res.email,
        todos: res.todos,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async deleteToDoById(
    req: Request | any,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    const todo = req.body;
    try {
      const res: any = await ToDoService.deleteTodos(todo._id, req.user.id);
      return response.json({
        email: res.email,
        todos: res.todos,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async editToById(
    req: Request | any,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    const { todo, todos } = req.body;
    try {
      const result = await ToDoService.editTodos(req.user.id, todo, todos);
      return response.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
