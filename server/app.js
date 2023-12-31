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
const issueRouter = require("./routes/issue");
const roleRouter = require("./routes/role");
const userProfileRouter = require("./routes/userProfile");

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/issue", issueRouter);
app.use("/role", roleRouter);
app.use("/user-profile", userProfileRouter);

// app.get("/oauth2callback", async (req, res, next) => {
//   try {
//     const clientId = process.env.CLIENT_ID;
//     const clientSecret = process.env.CLIENT_SECRET;

//     const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
//     const authorizationCode = req.query.code;
//     const token = await oAuth2Client.getToken(authorizationCode);

//     res.json(token);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// global error handler
const errorHandler = require("./utils/errorHandler");

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening to the port ${port}`);
});
