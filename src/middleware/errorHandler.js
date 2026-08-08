import HttpError from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (HttpError.isHttpError(error)) {
    return res.status(error.status).json({
      message: error.message || error.name });
  }

  res.status(500).json({
    message: `${error.message}`,
  });
};
