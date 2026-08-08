import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getArticlesByAuthorValidation = {
  [Segments.PARAMS]: Joi.object({
    authorId: Joi.string().custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid id');
      }
      return value;
    }).required(),
  }),
};
