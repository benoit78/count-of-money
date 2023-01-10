
/* DEBUG MIDDLEWARE */
/* eslint-disable */
exports.consoleLogMessage = (message) => (_req, _res, next) => {
  console.log(message);
  next();
};
exports.consoleLogReqField = (field) => (req, _res, next) => {
  console.log(req[field]);
  next();
};

/* UTILS */
exports.emptyReturn = (status) => (_req, res, _next) =>
  res.status(status).json({});

exports.returnReqField =
  (field, status = 200) =>
  (req, res, _next) =>
    res.status(status).json({ status: "success", [field]: req[field] });




