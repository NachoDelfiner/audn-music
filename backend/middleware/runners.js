const { validationResult } = require("express-validator");

exports.runValidateName = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()[0].msg,
    });
  } else {
    next();
  }
};

exports.runValidateId = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()[0].msg,
    });
  } else {
    next();
  }
};

/********************************************** */

exports.runValidateNameArtist = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array()[0].msg,
      });
    } else {
      next();
    }
  };


  exports.runValidateIdArtist = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array()[0].msg,
      });
    } else {
      next();
    }
  };


  /*************************************** */

  exports.runValidateIdArtistFilter = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array()[0].msg,
      });
    } else {
      next();
    }
  };


  exports.runValidateIdPLaylistFilter = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array()[0].msg,
      });
    } else {
      next();
    }
  };