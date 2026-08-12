import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const getUsers = async (req, res) => {
  const { page, perPage } = req.query;

  const skip = (page - 1) * perPage;

  const [users, totalCount] = await Promise.all([
    User.find().sort({ articlesAmount: -1, _id: 1 }).skip(skip).limit(perPage),
    User.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  res.status(200).json({
    authors: users,
    page,
    perPage,
    totalCount,
    totalPages,
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
