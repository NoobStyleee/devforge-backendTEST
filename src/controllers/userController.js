import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.js';
// import { Article } from '../models/article.js';

export const addArticleToSavedArticles = async (req, res) => {
  const userId = req.user._id ?? req.user.id;
  const { articleId } = req.params;

  if (!isValidObjectId(articleId)) {
    throw createHttpError(400, 'Invalid article id');
  }

  // ##   Зняти коментування коли буде створена модель Article
  // const article = await Article.findById(articleId);
  // if (!article) {
  //   throw createHttpError(404, 'Article not found');
  // }

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
  // ##   Зняти коментування коли буде створена модель Article
  // const article = await Article.findById(articleId);
  // if (!article) {
  //   throw createHttpError(404, 'Article not found');
  // }

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
