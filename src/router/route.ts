import { Router } from 'express';
import { body } from 'express-validator';

import { UserController } from '../controllers/user-controller';
import { authMiddleWare } from '../middlewares/auth-middleware';
import { ToDoController } from '../controllers/todo-controller';

export const router = Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration);

// user
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);

// toDoList
router.post('/create-todo', authMiddleWare, ToDoController.updateUserWithTodos);
router.get('/to-do-list', authMiddleWare, ToDoController.getToDo);
router.post('/delete-todo', authMiddleWare, ToDoController.deleteToDoById);
router.post('/edit-todo', authMiddleWare, ToDoController.editToById);
