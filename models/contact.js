import { Schema, model } from "mongoose";
import Joi from "joi";

export const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	number: {
		type: String,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	}
}, {versionKey: false, timestamps: true});

const createContactSchema = Joi.object({
	name: Joi.string().required(),
	number: Joi.string().required(),
});

const updateContactSchema = Joi.object({
	name: Joi.string(),
	number: Joi.string(),
	email: Joi.string()
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema);

export {Contact, createContactSchema, updateContactSchema, updateFavoriteSchema}