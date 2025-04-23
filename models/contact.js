import { Schema, model } from "mongoose";
import Joi from "joi";

export const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	}
}, {versionKey: false, timestamps: true});

const createContactSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.string().required(),
	email: Joi.string().required(),
	favorite: Joi.boolean().default(false)
});

const updateContactSchema = Joi.object({
	name: Joi.string(),
	phone: Joi.string(),
	email: Joi.string()
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema);

export {Contact, createContactSchema, updateContactSchema, updateFavoriteSchema}