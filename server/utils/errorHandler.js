const errorHandler = (error, req, res, next) => {
  if (error) {
    switch (res?.statusCode) {
      case 400:
        res.status(400).json(error);
        break;
      default:
        console.log(error);
        res.status(500).send("internal server error");
        break;
    }
    console.log("Error: ", error?.message);
  } else {
    next();
  }
};

module.exports = errorHandler;
