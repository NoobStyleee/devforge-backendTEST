import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.statusCode).json({
      message: error.message || error.name,
    });
  }

  res.status(500).json({
    message: `${error.message}`,
  });
};
