const express = require("express");
const app = express();
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require("./issue.router");
const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

app.use("/", (req, res) => {
  res.send("Hello from server");
});

module.exports = mainRouter;
