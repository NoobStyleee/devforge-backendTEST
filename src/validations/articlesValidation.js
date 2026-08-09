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
