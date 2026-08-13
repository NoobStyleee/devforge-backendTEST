import { Article } from '../models/Article.js';

export const findArticleById = (id) => Article.findById(id);

export const updateArticleById = (id, data) =>
  Article.findByIdAndUpdate(id, data, { new: true });

export const deleteArticleById = (id) => Article.findByIdAndDelete(id);
