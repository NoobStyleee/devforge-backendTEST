import createHttpError from 'http-errors';
import { Article } from '../models/Article.js';
import { User } from '../models/User.js';

export const addArticleToSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;

    // find the article by its ID
    const article = await Article.findById(articleId);
    if (!article) {
      throw createHttpError(404, 'Article not found');
    }

    // 2. $addToSet додасть articleId тільки якщо його ще немає в масиві
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedArticles: articleId } },
      { new: true },
    );

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    return res.status(200).json({
      message: 'Article added to saved articles',
      isSaved: true,
    });
  } catch (error) {
    next(error); // Передаємо помилку в глобальний errorHandler Express
  }
};
export const deleteArticleFromSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedArticles: articleId } },
      { new: true },
    );

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    return res.status(200).json({
      message: 'Article removed from saved articles',
      isSaved: false,
    });
  } catch (error) {
    next(error);
  }
};
