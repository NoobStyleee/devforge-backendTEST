import { Article } from '../models/article.js';

export const getArticlesByAuthorController = async (req, res) => {
  const { authorId } = req.params;

  const articles = await Article.find({ authorId });

  res.status(200).json(articles);
};
