import { Article } from '../models/Article.js';

export const getArticleById = async (articleId) => {
  return await Article.findById(articleId);
};