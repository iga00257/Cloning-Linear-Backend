import { Router } from 'express';
import projectController from '../controllers/issueController';

const router = Router();

router.get('/projects', projectController.getProjects);

router.post('/project', projectController.createProject);
router.get('/project', projectController.getProjectById);
router.put('/project', projectController.updateProject);
router.delete('/project', projectController.deleteProject);


export default router;