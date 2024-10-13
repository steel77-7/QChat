import { Router } from "express";
import {
  acceptRequest,
  allContacts,
  fetchContacts,
  fetchRequests,
  sendRequest,
} from "../controllers/utilities.controller.js";
import { authenticator } from "../middleware/authenticator.js";

const router = Router();

router.route("/all_contacts").get(authenticator, allContacts);

router.route("/send_request").post(authenticator, sendRequest);

router.route("/handle_request").post(authenticator, acceptRequest);

router.route("/fetch_requests").get(authenticator, fetchRequests);

router.route("/fetch_contacts").get(authenticator, fetchContacts);

export default router;