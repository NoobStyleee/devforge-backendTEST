import { CreateArticle } from '../models/createArticle.js';

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const article = new CreateArticle({
      title,
      content,
      image: req.file ? req.file.path : null,
      authorId: req.user._id
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
