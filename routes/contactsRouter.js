import express from "express";
import { ctrl } from "../controllers/contactsControllers.js";
import {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} from "../models/contact.js";
import { isValidId, authenticate, validateBody } from "../middlewars/index.js";

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getOneContact);

router.post("/", authenticate, validateBody(createContactSchema), ctrl.createContact);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put("/:id",authenticate, isValidId, validateBody(updateContactSchema), ctrl.updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

export default router;
