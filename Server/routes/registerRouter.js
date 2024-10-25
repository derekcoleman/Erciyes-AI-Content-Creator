const express = require('express');
const registerRouter = express.Router();
const {create_newUser}  = require('..//controllers/register');


registerRouter.post('/', async (req, res) => {
    const result = await create_newUser(req);
    res.status(result.code).json(result);
})
module.exports = registerRouter;
