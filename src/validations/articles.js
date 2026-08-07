import { Joi, Segments } from 'celebrate';

export const updateArticleSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(48),
    description: Joi.string().min(100).max(4000),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  }).min(1),
};
