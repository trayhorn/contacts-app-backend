import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { password, email } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPwd });
  res.status(201).json({
    user: {
      email,
      subscription: user.subscription
    }
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const pwdCheck = await bcrypt.compare(password, user.password);
  if (!pwdCheck) throw HttpError(401, "Email or password is wrong");

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });
  
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email, 
      subscription: user.subscription
    }
  })
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).end();
}

const current = async (req, res) => {
  const { _id } = req.user;
  const { email, subscription } = await User.findById(_id);
  res.status(200).json({ email, subscription });
}

const changeSubs = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(_id, { subscription }, { returnDocument: "after" });
  res.status(200).json(user);
}

export const ctrl = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	current: ctrlWrapper(current),
	changeSubs: ctrlWrapper(changeSubs),
};

