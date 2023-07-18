const errorHandler = (error, req, res, next) => {
  if (error) {
    console.log("Error: ", error?.message);
    res.status(500).send("internal server error");
  } else {
    next();
  }
};

module.exports = errorHandler;

