import express, {Router} from "express"
import { register } from "../controllers/auth";

const router: Router = express.Router();

router.post("/register", register );

export default router;