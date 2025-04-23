import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;

  const queryObj = {
    owner
  }

  if (favorite) queryObj.favorite = favorite;

  const result = await Contact.find(queryObj, "-owner -createdAt -updatedAt", {
		skip,
		limit,
	});
  res.status(200).json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) throw HttpError(404);
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({...req.body, owner});
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) throw HttpError(404);

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) throw HttpError(404);
  res.status(200).json(result);
}

export const ctrl = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact)
}
