const express = require("express");
const postRouter = express.Router();
const { editpost, deletePost } = require("..//controllers/post");

postRouter.post("/", async (req, res) => {
  const result = await editpost(req);
  res.status(result.code).json(result);
});
postRouter.delete("/", async (req, res) => {
  const result = await deletePost(req);
  res.status(result.code).json(result);
});
module.exports = postRouter;
