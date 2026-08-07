import { isValidObjectId } from 'mongoose';
import { getArticleById } from '../services/articles.js';

export const getArticleByIdController = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid article id',
    });
  }

  const article = await getArticleById(id);

  if (!article) {
    return res.status(404).json({
      message: 'Article not found',
    });
  }

  res.status(200).json(article);
};