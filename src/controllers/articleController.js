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
