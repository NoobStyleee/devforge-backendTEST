import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.js';
import { Article } from '../models/Article.js';

export const addArticleToSavedArticles = async (req, res) => {
  const userId = req.user._id ?? req.user.id;
  const { articleId } = req.params;

  if (!isValidObjectId(articleId)) {
    throw createHttpError(400, 'Invalid article id');
  }


  const article = await Article.findById(articleId);
  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedArticles: articleId } },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return res.status(200).json(updatedUser);
};

export const deleteArticleFromSavedArticles = async (req, res) => {
  const userId = req.user._id ?? req.user.id;
  const { articleId } = req.params;

  if (!isValidObjectId(articleId)) {
    throw createHttpError(400, 'Invalid article id');
  }

  const article = await Article.findById(articleId);
  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedArticles: articleId } },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return res.status(200).json(updatedUser);
};

export const getUsers = async (req, res) => {
  const { page, perPage } = req.query;

  const skip = (page - 1) * perPage;

  const [users, totalCount] = await Promise.all([
    User.find().skip(skip).limit(perPage),
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
