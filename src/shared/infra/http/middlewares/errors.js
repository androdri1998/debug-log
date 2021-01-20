const HTTPStatusCode = require('http-status-codes');
const AppError = require('../../../errors/AppError');

// eslint-disable-next-line no-unused-vars
const errorsMiddleware = (err, req, res, _) => {
  if (
    err instanceof AppError &&
    err.statusCode < HTTPStatusCode.StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  const statusCode =
    err.statusCode || HTTPStatusCode.StatusCodes.INTERNAL_SERVER_ERROR;

  return res
    .status(statusCode)
    .json({ status: 'error', error: 'Internal server error' });
};

module.exports = errorsMiddleware;
