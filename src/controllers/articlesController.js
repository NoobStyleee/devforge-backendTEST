import { getArticlesByAuthorId } from '../services/articlesService.js';


export const getArticlesByAuthorController = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    const articles = await getArticlesByAuthorId(authorId);

    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved articles by author',
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};
