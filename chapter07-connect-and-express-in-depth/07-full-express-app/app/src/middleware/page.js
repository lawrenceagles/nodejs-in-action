"use strict";


module.exports = (cb, perPage) => {
  perPage = perPage || 10;
  return (req, res, next) => {
    const page = Math.max(parseInt(req.params.page || "1", 10), 1) - 1;
    cb((err, total) => {
      if (err) {
        return next(err);
      }
      req.page = res.locals.page = {
        number: page,
        perPage: perPage,
        from: page * perPage,
        to: page * perPage + perPage - 1,
        total: total,
        count: Math.ceil(total / perPage)
      };
      next();
    });
  };
};