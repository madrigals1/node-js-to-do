import { Router } from 'express';
import { userController } from '../controllers/user-controller';
import {body} from 'express-validator';
import { authMiddleWare } from '../middlewares/auth-middleware';
import { toDotController } from '../controllers/todo-controller';

export const router = Router();

router.post('/registration',
body('email').isEmail(),
body('password').isLength({min: 3, max: 32}),
userController.registration);

//user
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

//toDoList
router.post('/create-todo', authMiddleWare, toDotController.updateUserWithTodos);
router.get('/to-do-list', authMiddleWare, toDotController.getToDo);
router.post('/delete-todo',authMiddleWare,toDotController.deleteToDoById);
router.post('/edit-todo' ,authMiddleWare, toDotController.editToById);