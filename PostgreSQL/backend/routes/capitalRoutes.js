import { Router } from "express";
import {
  getRandomCapital,
  checkCapital,
} from "../controllers/capitalController.js";

const router = Router();

router.get("/", getRandomCapital);
router.post("/", checkCapital);

export default router;
