import { celebrate, Joi, Segments } from 'celebrate';

export const getArticlesByAuthorValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    authorId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'authorId must be a valid hex string',
      'string.length': 'authorId must be exactly 24 characters long',
      'any.required': 'authorId is required',
    }),
  }),
});
