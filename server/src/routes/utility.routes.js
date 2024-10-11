import { Router } from "express";
import { allContacts } from "../controllers/utilities.controller.js";
import { authenticator } from "../middleware/authenticator.js";

const router = Router();

router.route("/all_contacts").get(authenticator,allContacts);


export default router