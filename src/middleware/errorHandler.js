// import {HttpError} from 'http-errors.';

// export const errorHandler = (err, req, res, next) => {
//     if(err instanceof HttpError) {
//         return res.status(err.status).json({
//             message: err.message,
//         });
//     }

//     res.status(500).json({
//         message: err.message,
//     })
// }

import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err);
  console.error('MESSAGE:', err.message);
  console.error('STACK:', err.stack);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message,
    error: err,
  });
};