import { Router } from "express";
import { authenticator } from "../middleware/authenticator.js";
import { fetchMessage } from "../controllers/message.controllers.js";

const router = Router();

router.route("/save-message").post()
router.route('/delete-message').post()
router.route('/edit-message').post()
router.route('/fetch_messages/:chatid').get(authenticator,fetchMessage)

export default router;