const express = require('express');
const loginRouter = express.Router();
const {login}  = require('..//controllers/login');

loginRouter.post('/', async (req, res) => {
    const result = await login(req);
     res.status(result.code).json(result);
})
module.exports = loginRouter;
