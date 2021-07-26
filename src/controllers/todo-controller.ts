import { Response, Request, NextFunction } from "express";
import { ToDoModel } from "../models/todo-model";
import { toDoSerivce } from "../service/todo-service";
import { tokenService } from "../service/token-service";

class ToDoController {
    async createToDo(req: Request | any, response: Response, next: NextFunction) {
        try {
            const {name,isDone} = req.body;
            console.log(req, name, isDone)
            return await toDoSerivce.createToDo(req.user.id, name, isDone)
        } catch (error) {
            next(error);
        }
    };

    async getToDo(req: Request | any, response: Response, next: NextFunction) {
        try {
            const toDoList: any = await ToDoModel.find();
           return response.json(toDoList);
        } catch (error) {
            next(error)
        }
    };
};

export const toDotController = new ToDoController();