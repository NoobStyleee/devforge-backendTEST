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
      authorId: req.user.sub
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await CreateArticle.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await CreateArticle.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await CreateArticle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await CreateArticle.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
