import express, {Router} from "express"
import { login, me, register } from "../controllers/auth";
import {authMiddleware} from "../middlewares/auth";

const router: Router = express.Router();

router.post("/register", register );

router.post("/login", login);

router.get("/me",authMiddleware, me);


export default router;