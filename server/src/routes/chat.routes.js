import { Router } from "express";
import { addMembers, createChat, deleteChat } from "../controllers/chat.controllers";
import { authenticator } from "../middleware/authenticator.js";

const router = Router();



router.route("/createChat").post(authenticator,createChat)
router.route('/add-members').post(authenticator,addMembers)
router.route('/delete-chat').post(authenticator,deleteChat)

