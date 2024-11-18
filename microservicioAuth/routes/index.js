import { Router } from "express";
import { Register } from "../controllers/register.js";
import { SignUp } from "../controllers/signup.js";


const router = Router();
router.post("/register",Register );
router.post("/signup",SignUp );
export default router;