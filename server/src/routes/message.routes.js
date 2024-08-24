import { Router } from "express";

const router = Router();

router.route("/save-message").post()
router.route('/delete-message').post()
router.route('/edit-message').post()

