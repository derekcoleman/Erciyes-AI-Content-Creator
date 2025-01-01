const express = require('express');
const topixRouter = express.Router();
const {addPost}  = require('..//topix/addPost');
const {auth} = require('../middlewares/authMiddlewares');


topixRouter.post('/', auth , async (req, res) => {
    const result = await addPost(req);
    res.status(result.code).json(result);
})
module.exports = topixRouter;
