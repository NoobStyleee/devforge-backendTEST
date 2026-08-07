import { Joi, Segments } from 'celebrate';

export const getArticleByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
};