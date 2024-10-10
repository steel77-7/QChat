import { Router } from "express";
import { getUser, login, logout, refreshToken, registerUser } from "../controllers/user.controllers.js";
import { authenticator } from "../middleware/authenticator.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/refreshToken').get(refreshToken);
router.route('/getUser').get(authenticator,getUser)
//router.route('/changePassword')
//router.route('/forgotPassword')
export default router; 