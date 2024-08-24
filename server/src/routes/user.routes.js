import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user.controllers.js";
import { authenticator } from "../middleware/authenticator.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').get(authenticator,logout)
//router.route('/changePassword')
//router.route('/forgotPassword')
export default router; 