import { Response, Request, NextFunction } from "express";
import { runInNewContext } from "vm";
import { ToDoModel } from "../models/todo-model";
import userModel from "../models/user-model";
import { toDoSerivce } from "../service/todo-service";
import { tokenService } from "../service/token-service";

class ToDoController {
  
    async getToDo(req: Request | any, response: Response, next: NextFunction) {
        try {
            const toDoList: any = await ToDoModel.find();
           return response.json(toDoList);
        } catch (error) {
            next(error)
        }
    };

   async updateUserWithTodos(req: Request | any, response: Response, next: NextFunction) {
       try {
        const todo = req.body; 
        const newTodo = await ToDoModel.create(todo);
        const user = await userModel.findByIdAndUpdate(
             req.user.id,
             {
                 $push: {
                     todos: newTodo
                 }
             },
             {
                 new: true,
                 useFindAndModify: false
             }
         )
        return response.json(user);
       } catch(err) {
         next(err);
       }
    
    }


};

export const toDotController = new ToDoController();