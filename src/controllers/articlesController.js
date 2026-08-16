import createHttpError from 'http-errors';
import { Article } from '../models/article.js';

export const getArticlesController = async (req, res) => {
  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const [articles, total] = await Promise.all([
    Article.find().skip(skip).limit(limit).populate('ownerId', 'name'),
    Article.countDocuments(),
  ]);

  res.status(200).json({
    articles,
    total,
    page,
    limit,
  });
};

export const getArticlesByAuthorController = async (req, res) => {
  const { ownerId } = req.params;

  const articles = await Article.find({ ownerId });

  res.status(200).json(articles);
};

export const getArticleByIdController = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id).populate('ownerId', 'name');

  if (!article) {
    return res.status(404).json({
      message: 'Article not found',
    });
  }

  res.status(200).json(article);
};

export const createArticle = async (req, res) => {
  const { title, desc, img, date, author } = req.body;
  const ownerId = req.user._id;

  const newArticle = await Article.create({
    title,
    desc,
    img,
    ownerId,
    date,
    author,
  });

  if (!newArticle) {
    throw createHttpError();
  }
  res.status(201).json(newArticle);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const article = await Article.findById(id);

  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  if (article.ownerId.toString() !== userId.toString()) {
    throw createHttpError(403, 'You can delete only your own articles');
  }

  await Article.findByIdAndDelete(id);

  res.status(200).json({ message: 'Article deleted successfully' });
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const article = await Article.findById(id);

  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  if (article.ownerId.toString() !== userId.toString()) {
    throw createHttpError(403, 'You can edit only your own articles');
  }

  const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedArticle);
};
