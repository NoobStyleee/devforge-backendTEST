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