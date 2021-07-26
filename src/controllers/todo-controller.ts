import { Response, Request, NextFunction } from "express";
import { ToDoModel } from "../models/todo-model";
import { toDoSerivce } from "../service/todo-service";
import { tokenService } from "../service/token-service";

class ToDoController {
    async createToDo(req: Request | any, response: Response, next: NextFunction) {
        try {
            const {name,isDone} = req.body;
            const toDoList = await toDoSerivce.createToDo(req.user.id, name, isDone);
            return response.json(toDoList);
        } catch (error) {
            next(error);
        }
    };

    //TODO FIND TODO BY USER ID
    async getToDo(req: Request | any, response: Response, next: NextFunction) {
        try {
            const toDoList: any = await ToDoModel.find({userId: req.user.id});
           return response.json(toDoList);
        } catch (error) {
            next(error)
        }
    };
};

export const toDotController = new ToDoController();