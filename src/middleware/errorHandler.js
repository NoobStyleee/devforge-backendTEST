export const errorHandler = (error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message || error.name,
    });
  }

  res.status(500).json({
    message: error.message,
  });
};
