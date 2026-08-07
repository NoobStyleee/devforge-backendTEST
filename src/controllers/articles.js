import createHttpError from 'http-errors';
import { findArticleById, updateArticleById } from '../services/articles.js';
import {
  uploadPhotoToCloudinary,
  deletePhotoFromCloudinary,
} from '../utils/cloudinary.js';

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const article = await findArticleById(id);

    if (!article) {
      const error = createHttpError(404, 'Article not found');
      return res.status(error.status).json({ message: error.message });
    }

    if (article.author.toString() !== userId.toString()) {
      const error = createHttpError(403, 'You can edit only your own articles');
      return res.status(error.status).json({ message: error.message });
    }

    const updateData = { ...req.body };

    if (req.file) {
      const newPhotoUrl = await uploadPhotoToCloudinary(req.file.path);
      await deletePhotoFromCloudinary(article.photo);
      updateData.photo = newPhotoUrl;
    }

    const updatedArticle = await updateArticleById(id, updateData);

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};
