import { Router } from "express";
import { getRandomFlag, checkFlag } from "../controllers/flagController.js";

const router = Router();

router.get("/", getRandomFlag);
router.post("/", checkFlag);

export default router;
