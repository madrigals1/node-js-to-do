import { Router } from 'express';
import { userController } from '../controllers/user-controller';

export const router = Router();

router.post('/registration',userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);