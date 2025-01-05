const express = require("express");
const postRouter = express.Router();
const { editpost } = require("..//controllers/post");

postRouter.post("/", async (req, res) => {
  const result = await editpost(req);
  res.status(result.code).json(result);
});
module.exports = postRouter;
