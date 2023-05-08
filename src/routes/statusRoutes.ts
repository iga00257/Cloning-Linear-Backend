import { Router } from "express";
import StatusController from "../controllers/statusController";

const router = Router();
router.get("/statuses", StatusController.getAllStatus);

router.post("/status", StatusController.createStatus);
router.get("/status", StatusController.getStatusById);
router.put("/status", StatusController.updateStatus);
router.delete("/status", StatusController.deleteStatus);



export default router;