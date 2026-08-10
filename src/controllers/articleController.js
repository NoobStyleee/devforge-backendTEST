import { Article } from "../models/Article.js";

export const createArticle = async (req, res) => {

    const { title, content } = req.body;   

    const article = new Article({
      title,
      content,
      image: req.file ? req.file.path : null,
      authorId:  req.user?._id
    });

    await article.save();
    res.status(201).json(article);     
};

export const getArticles = async (req, res) => {
  
    const articles = await Article.find();
    res.status(200).json(articles);
  
    res.status(500).json({ message: 'Server error'});
  
};

export const getArticleById = async (req, res) => {
  
    const article = await Article.findById(req.params.id);   
    res.status(200).json(article);
 
    res.status(500).json({ message: 'Server error'});
  
};

export const updateArticle = async (req, res) => {

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );   
    res.status(200).json(article);
 
    res.status(500).json({ message: 'Server error'});
  
};

export const deleteArticle = async (req, res) => {
  
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article deleted successfully' });
  
    res.status(500).json({ message: 'Server error'});
  
};
