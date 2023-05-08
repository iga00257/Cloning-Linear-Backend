import { Router } from 'express';
import UserController from '../controllers/userController';
import checkPermissions from '../middlewares/checkPermissions';
import { PermissionTypes } from '../models/permissionsModel';

const router = Router();

router.get('/users', checkPermissions('user',PermissionTypes.read), UserController.getUsers);
router.get('/user', UserController.getUserById);
router.put('/user', UserController.updateUser);

router.post('/user',checkPermissions('user',PermissionTypes.write), UserController.createUser);
router.delete('/user', UserController.deleteUser);

export default router;