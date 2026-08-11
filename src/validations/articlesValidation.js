import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid id format.')
    : value;
};

export const getArticlesByAuthorValidation = {
  [Segments.PARAMS]: Joi.object({
    ownerId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getArticleByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getArticlesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(6),
  }),
};

export const createArticlesSchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(3).max(48).required(),
    desc: Joi.string().min(100).max(4000).required(),     
    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
    author: Joi.string().min(4).max(50).required(),
    img: Joi.string().uri().required(),    
  }),
};

