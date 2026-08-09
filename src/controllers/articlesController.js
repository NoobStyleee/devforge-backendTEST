import { Article } from '../models/article.js';

export const getArticlesByAuthorController = async (req, res) => {
  const { ownerId } = req.params;

  const articles = await Article.find({ ownerId });

  res.status(200).json(articles);
};

export const getArticleByIdController = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);

  if (!article) {
    return res.status(404).json({
      message: 'Article not found',
    });
  }

  res.status(200).json(article);
};
