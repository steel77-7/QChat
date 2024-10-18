import { Router } from "express";
import { authenticator } from "../middleware/authenticator.js";
import { fetchMessage, saveMessage } from "../controllers/message.controllers.js";

const router = Router();

router.route("/save-message").post(authenticator,saveMessage)
router.route('/delete-message').post()
router.route('/edit-message').post()
router.route('/fetch_messages/:chatid').get(authenticator,fetchMessage)

export default router;