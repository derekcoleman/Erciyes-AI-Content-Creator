const express = require('express');
const loginRouter = express.Router();
const {login}  = require('..//controllers/login');
const {instagram}= require('../controllers/instagramscraper.js');

loginRouter.post('/', async (req, res) => {
    await instagram();
    const result = await login(req);
     res.status(result.code).json(result);
})
module.exports = loginRouter;
