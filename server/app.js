// env configuration
require("dotenv").config();

const express = require("express");
const app = express();

// CORS setup
const cors = require("cors");
app.use(cors());

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// routes
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const taskRouter = require("./routes/task");

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);

// global error handler
const errorHandler = require("./utils/errorHandler");

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening to the port ${port}`);
});
