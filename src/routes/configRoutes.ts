import { Router } from "express";
import configController from "../controllers/configController";

const router = Router();
router.post("/config", configController.createConfig);
router.put("/config", configController.updateConfig);
router.get("/config", configController.getConfig);

export default router;