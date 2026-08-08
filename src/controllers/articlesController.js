import { Article } from '../models/article.js';
import createHttpError from 'http-errors';

export const getArticlesByAuthorController = async (req, res) => {
  const { authorId } = req.params;

  const articles = await Article.find({ authorId });


  if (!articles.length) {
    throw createHttpError(404, 'Articles not found');
  }
  res.status(200).json(articles);
};
