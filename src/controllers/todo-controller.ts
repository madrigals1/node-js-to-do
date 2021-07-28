import { Response, Request, NextFunction } from "express";
import { ToDoModel } from "../models/todo-model";
import { toDoSerivce } from "../service/todo-service";

class ToDoController {
  
    async getToDo(req: Request | any, response: Response, next: NextFunction): Promise<any> {
        const todo = await toDoSerivce.getToDos();
        try {
            const todo = await toDoSerivce.getToDos();
            return response.json(todo);
        } catch (error) {
            next(error)
        }
    };
    

   async updateUserWithTodos(req: Request | any, response: Response, next: NextFunction): Promise<any> {
       try {
            const todo = req.body; 
            const newToDo = await ToDoModel.create(todo);
            const res: any = await toDoSerivce.createToDos(req.user.id, newToDo);
            return response.json({
                email: res.email,
                todos: res.todos
            });
       } catch(err) {
         next(err);
       }
    
    }


};

export const toDotController = new ToDoController();