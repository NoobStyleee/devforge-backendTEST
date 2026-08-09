import { Article } from '../models/article.js';

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
