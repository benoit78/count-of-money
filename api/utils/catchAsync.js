// 1 catchAsync return a function that is assigned to a method
// 2 when we hit the endpoint that calls the method,
//    express will call it and pass req, res and next
// 3 then catchAsync will call the async function that the
//    method has passed to it
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};

/**
 * (fn) => {
 *      return (req, res, next) => {
 *          return fn(req, res, next)
 *                  .catch((err) => next(err));
 *      }
 * }
 *
 *
 * */
